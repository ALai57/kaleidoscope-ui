import React, { useCallback, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';

type RecordingState = 'idle' | 'recording' | 'uploading';

interface VoiceCaptureProps {
  onAudioCaptured: (blob: Blob) => Promise<void>;
  disabled?: boolean;
}

export const VoiceCapture: React.FC<VoiceCaptureProps> = ({ onAudioCaptured, disabled = false }) => {
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [duration, setDuration] = useState(0);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/webm')
          ? 'audio/webm'
          : 'audio/ogg';

      const recorder = new MediaRecorder(stream, { mimeType });
      recorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: mimeType });
        setRecordingState('uploading');
        try {
          await onAudioCaptured(blob);
        } finally {
          setRecordingState('idle');
          setDuration(0);
        }
      };

      recorder.start(250); // collect in 250ms chunks
      setRecordingState('recording');
      setDuration(0);

      timerRef.current = setInterval(() => {
        setDuration((d) => d + 1);
      }, 1000);
    } catch (err) {
      console.error('Microphone access denied:', err);
    }
  }, [onAudioCaptured]);

  const stopRecording = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    recorderRef.current?.stop();
  }, []);

  const isRecording = recordingState === 'recording';
  const isUploading = recordingState === 'uploading';

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Tooltip title={isRecording ? 'Stop recording' : 'Record voice note'}>
        <span>
          <IconButton
            color={isRecording ? 'error' : 'default'}
            onClick={isRecording ? stopRecording : () => void startRecording()}
            disabled={disabled || isUploading}
            sx={{
              animation: isRecording ? 'pulse 1.5s infinite' : 'none',
              '@keyframes pulse': {
                '0%': { boxShadow: '0 0 0 0 rgba(244, 67, 54, 0.4)' },
                '70%': { boxShadow: '0 0 0 8px rgba(244, 67, 54, 0)' },
                '100%': { boxShadow: '0 0 0 0 rgba(244, 67, 54, 0)' },
              },
            }}
          >
            {isUploading ? (
              <CircularProgress size={20} />
            ) : isRecording ? (
              <StopIcon />
            ) : (
              <MicIcon />
            )}
          </IconButton>
        </span>
      </Tooltip>

      {isRecording && (
        <Typography variant="caption" color="error" sx={{ fontWeight: 600 }}>
          {String(Math.floor(duration / 60)).padStart(2, '0')}:
          {String(duration % 60).padStart(2, '0')}
        </Typography>
      )}

      {isUploading && (
        <Typography variant="caption" color="text.secondary">
          Transcribing…
        </Typography>
      )}
    </Box>
  );
};
