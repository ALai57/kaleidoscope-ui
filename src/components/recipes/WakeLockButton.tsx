import React from 'react';
import Button from '@mui/material/Button';
import CoffeeIcon from '@mui/icons-material/Coffee';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import { useWakeLock } from '../../hooks/useWakeLock';

/**
 * Toggles a screen wake lock so a cook can follow a recipe hands-free without
 * the screen sleeping. Renders nothing on browsers without the Wake Lock API.
 */
export const WakeLockButton: React.FC = () => {
  const { isSupported, isActive, toggle } = useWakeLock();

  if (!isSupported) return null;

  return (
    <Button
      size="small"
      variant={isActive ? 'contained' : 'text'}
      startIcon={isActive ? <BedtimeIcon /> : <CoffeeIcon />}
      onClick={toggle}
    >
      {isActive ? 'Screen stays on' : 'Keep screen on'}
    </Button>
  );
};

export default WakeLockButton;
