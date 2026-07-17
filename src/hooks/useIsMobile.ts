import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

/**
 * True below the `md` breakpoint (900px) — the app's single mobile/desktop
 * switch. Wrap `useMediaQuery` so components read `useIsMobile()` instead of
 * re-deriving the query, and so the breakpoint lives in one place.
 */
export function useIsMobile(): boolean {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('md'));
}
