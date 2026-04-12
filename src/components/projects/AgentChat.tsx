import React, { useEffect, useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getConversation, streamMessage } from '../../api/projects';
import { useAuth } from '../../auth/useAuth';
import type { AgentType, ProjectConversationMessage } from '../../types/project';

const AGENT_LABELS: Record<AgentType, string> = {
  coach: 'Coach',
  pm: 'Product Manager',
  engineering_lead: 'Engineering Lead',
};

interface ChatMessageProps {
  message: ProjectConversationMessage | { role: 'assistant'; content: string; id: 'streaming' };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isUser ? 'row-reverse' : 'row',
        gap: 1,
        mb: 2,
        alignItems: 'flex-start',
      }}
    >
      <Avatar
        sx={{
          width: 32,
          height: 32,
          bgcolor: isUser ? 'primary.main' : 'secondary.main',
          flexShrink: 0,
        }}
      >
        {isUser ? <PersonIcon fontSize="small" /> : <SmartToyIcon fontSize="small" />}
      </Avatar>

      <Paper
        variant="outlined"
        sx={{
          p: 1.5,
          maxWidth: '75%',
          bgcolor: isUser ? 'primary.light' : 'background.paper',
          color: isUser ? 'primary.contrastText' : 'text.primary',
          borderRadius: isUser ? '12px 4px 12px 12px' : '4px 12px 12px 12px',
        }}
      >
        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
          {message.content}
        </Typography>
      </Paper>
    </Box>
  );
};

interface AgentChatProps {
  projectId: string;
  agent: AgentType;
}

export const AgentChat: React.FC<AgentChatProps> = ({ projectId, agent }) => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [input, setInput] = useState('');
  const [streamingContent, setStreamingContent] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: history = [], isLoading } = useQuery({
    queryKey: ['projects', projectId, 'conversations', agent],
    queryFn: () => getConversation(projectId, agent, token),
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, streamingContent]);

  const handleSend = async () => {
    const message = input.trim();
    if (!message || isSending) return;

    setInput('');
    setIsSending(true);
    setStreamingContent('');

    try {
      const gen = streamMessage(projectId, agent, message, token);
      let accumulated = '';

      for await (const token of gen) {
        accumulated += token;
        setStreamingContent(accumulated);
      }
    } catch (err) {
      console.error('Stream error:', err);
    } finally {
      setStreamingContent(null);
      setIsSending(false);
      void queryClient.invalidateQueries({
        queryKey: ['projects', projectId, 'conversations', agent],
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 400 }}>
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {AGENT_LABELS[agent]}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {agent === 'coach' && 'Helps you clarify and develop your project idea'}
          {agent === 'pm' && 'Evaluates product intent and user value'}
          {agent === 'engineering_lead' && 'Reviews technical design and architecture'}
        </Typography>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress size={24} />
          </Box>
        )}

        {!isLoading && history.length === 0 && streamingContent === null && (
          <Box sx={{ textAlign: 'center', p: 4 }}>
            <Typography variant="body2" color="text.secondary">
              Start the conversation by describing your project or asking a question.
            </Typography>
          </Box>
        )}

        {history.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {streamingContent !== null && (
          <ChatMessage
            message={{ id: 'streaming', role: 'assistant', content: streamingContent }}
          />
        )}

        <div ref={messagesEndRef} />
      </Box>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            size="small"
            placeholder="Type a message… (Enter to send, Shift+Enter for newline)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSending}
          />
          <IconButton
            color="primary"
            onClick={() => void handleSend()}
            disabled={!input.trim() || isSending}
          >
            {isSending ? <CircularProgress size={20} /> : <SendIcon />}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
