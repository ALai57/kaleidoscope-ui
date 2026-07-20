import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { AgentChat } from '../../components/projects/AgentChat';
import { useAuth } from '../../auth/useAuth';
import { getProject } from '../../api/projects';
import type { AgentType } from '../../types/project';

const AGENTS: { type: AgentType; label: string; description: string }[] = [
  {
    type: 'coach',
    label: 'Coach',
    description: 'Get help clarifying and developing your project idea',
  },
  {
    type: 'pm',
    label: 'Product Manager',
    description: 'Evaluate product intent, user value, and feature clarity',
  },
  {
    type: 'engineering_lead',
    label: 'Engineering Lead',
    description: 'Review technical design, architecture, and implementation plan',
  },
];

const ProjectDevelopPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [agentTab, setAgentTab] = useState(0);

  const { data: project } = useQuery({
    queryKey: ['projects', id],
    queryFn: () => getProject(id!, token),
    enabled: !!id,
  });

  const selectedAgent = AGENTS[agentTab];

  return (
    <AdminLayout title="Develop">
      <Box sx={{ maxWidth: 900, mx: 'auto', width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Back + heading */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            size="small"
            onClick={() => navigate(`/projects/${id}`)}
          >
            Back
          </Button>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {project?.title ?? 'Develop Project'}
          </Typography>
        </Box>

        {/* Agent selector */}
        <Tabs
          value={agentTab}
          onChange={(_, v) => setAgentTab(v as number)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 2 }}
        >
          {AGENTS.map((a) => (
            <Tab key={a.type} label={a.label} />
          ))}
        </Tabs>

        {selectedAgent && (
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              mb: 2
            }}>
            {selectedAgent.description}
          </Typography>
        )}

        {/* Chat panel */}
        <Paper
          variant="outlined"
          sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 500 }}
        >
          {id && selectedAgent && (
            <AgentChat
              key={`${id}-${selectedAgent.type}`}
              projectId={id}
              agent={selectedAgent.type}
            />
          )}
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default ProjectDevelopPage;
