import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { StepRun, StepRunStatus } from '../../types/workflow';

interface WorkflowStepperProps {
  steps: StepRun[];
  streamingStepId?: string | null;
  streamingOutput?: string;
}

const StatusIcon: React.FC<{ status: StepRunStatus }> = ({ status }) => {
  switch (status) {
    case 'completed':
      return <CheckCircleIcon color="success" sx={{ fontSize: 20 }} />;
    case 'failed':
      return <ErrorIcon color="error" sx={{ fontSize: 20 }} />;
    case 'skipped':
      return <RemoveCircleOutlineIcon color="disabled" sx={{ fontSize: 20 }} />;
    case 'running':
      return <CircularProgress size={18} />;
    default:
      return <RadioButtonUncheckedIcon color="disabled" sx={{ fontSize: 20 }} />;
  }
};

const WorkflowStepper: React.FC<WorkflowStepperProps> = ({
  steps,
  streamingStepId,
  streamingOutput,
}) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  if (steps.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No steps in this run.
      </Typography>
    );
  }

  return (
    <Box>
      {steps.map((step) => {
        const isStreaming = step.id === streamingStepId;
        const output = isStreaming ? (streamingOutput ?? step.output) : step.output;
        const hasOutput = !!output;
        const isSkipped = step.status === 'skipped';

        return (
          <Accordion
            key={step.id}
            expanded={hasOutput && expanded === step.id}
            onChange={(_, open) => setExpanded(open ? step.id : false)}
            disableGutters
            elevation={0}
            sx={{
              border: 1,
              borderColor: 'divider',
              mb: 0.5,
              borderRadius: 1,
              opacity: isSkipped ? 0.5 : 1,
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary
              expandIcon={hasOutput ? <ExpandMoreIcon /> : null}
              sx={{
                cursor: hasOutput ? 'pointer' : 'default',
                '& .MuiAccordionSummary-expandIconWrapper': {
                  visibility: hasOutput ? 'visible' : 'hidden',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%' }}>
                <StatusIcon status={isStreaming ? 'running' : step.status} />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    flex: 1,
                    textDecoration: isSkipped ? 'line-through' : 'none',
                    color: isSkipped ? 'text.disabled' : 'text.primary',
                  }}
                >
                  {step.name}
                </Typography>
                {step.is_custom && (
                  <Chip label="Custom" size="small" variant="outlined" color="secondary" />
                )}
                {isStreaming && (
                  <Typography variant="caption" color="primary.main">
                    Running…
                  </Typography>
                )}
                {step.status === 'skipped' && (
                  <Typography variant="caption" color="text.disabled">
                    Skipped
                  </Typography>
                )}
              </Box>
            </AccordionSummary>

            {hasOutput && (
              <AccordionDetails sx={{ pt: 0 }}>
                <Box
                  component="pre"
                  sx={{
                    m: 0,
                    p: 1.5,
                    bgcolor: 'grey.50',
                    borderRadius: 1,
                    fontSize: '0.75rem',
                    lineHeight: 1.6,
                    overflowX: 'auto',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    fontFamily: 'inherit',
                    maxHeight: 400,
                    overflowY: 'auto',
                  }}
                >
                  {output}
                </Box>
              </AccordionDetails>
            )}
          </Accordion>
        );
      })}
    </Box>
  );
};

export default WorkflowStepper;
