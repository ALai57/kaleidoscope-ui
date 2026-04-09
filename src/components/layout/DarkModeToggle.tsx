import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useColorScheme } from '@mui/material/styles';

export const DarkModeToggle: React.FC = () => {
  const { mode, setMode } = useColorScheme();

  const handleToggle = (): void => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 1500,
      }}
    >
      <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`} placement="left">
        <IconButton
          onClick={handleToggle}
          size="small"
          aria-label="toggle dark mode"
          sx={{
            width: 32,
            height: 32,
            bgcolor: 'rgba(0, 0, 0, 0.18)',
            backdropFilter: 'blur(4px)',
            color: 'white',
            opacity: 0.65,
            transition: 'opacity 0.2s, background-color 0.2s',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.32)',
              opacity: 1,
            },
          }}
        >
          {mode === 'dark' ? (
            <Brightness7Icon sx={{ fontSize: 16 }} />
          ) : (
            <Brightness4Icon sx={{ fontSize: 16 }} />
          )}
        </IconButton>
      </Tooltip>
    </Box>
  );
};
