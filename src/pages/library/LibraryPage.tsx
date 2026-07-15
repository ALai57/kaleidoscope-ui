import * as React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { NavBar } from '../../components/layout/NavBar';
import { LoadingScreen } from '../../components/layout/LoadingScreen';
import { PrismThemeProvider, Button } from '../../components/prism';
import { useAuth } from '../../auth/useAuth';
import { useInterests, useInterest } from '../../components/library/hooks';
import { InterestRail } from '../../components/library/InterestRail';
import { ShelfView } from '../../components/library/ShelfView';
import { TasteProfileEditor } from '../../components/library/TasteProfileEditor';
import { AcquisitionsPipeline } from '../../components/library/AcquisitionsPipeline';
import { OnboardingDialog } from '../../components/library/OnboardingDialog';
import { CheckInDialog } from '../../components/library/CheckInDialog';

export type LibraryView = 'shelf' | 'acquisitions' | 'taste';

const LibraryPageInner: React.FC<{ view: LibraryView }> = ({ view }) => {
  const { tokens } = useTheme();
  const { token } = useAuth();
  const navigate = useNavigate();
  const { interestId } = useParams<{ interestId: string }>();
  const interests = useInterests(token);
  const interest = useInterest(interestId ?? '', token);
  const [modal, setModal] = React.useState<'none' | 'new' | 'checkin'>('none');

  const id = interestId ?? '';

  return (
    <Box sx={{ display: 'flex', gap: 3, p: 3, minHeight: '70vh' }}>
      <InterestRail
        interests={interests.data ?? []}
        activeId={interestId}
        onAdd={() => setModal('new')}
      />

      <Box sx={{ flex: 1 }}>
        {id && (
          <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
            <Link to={`/library/${id}`} style={tabStyle(tokens, view === 'shelf')}>Shelves</Link>
            <Link to={`/library/${id}/acquisitions`} style={tabStyle(tokens, view === 'acquisitions')}>Acquisitions</Link>
            <Link to={`/library/${id}/taste`} style={tabStyle(tokens, view === 'taste')}>Taste profile</Link>
            <div style={{ marginLeft: 'auto' }}>
              <Button variant="subtle" onClick={() => setModal('checkin')}>Check-in</Button>
            </div>
          </div>
        )}

        {!id && (
          <p style={{ color: tokens.color.text.secondary }}>
            Select an interest, or add one to start a shelf.
          </p>
        )}

        {id && view === 'shelf' && <ShelfView interestId={id} token={token} />}
        {id && view === 'acquisitions' && <AcquisitionsPipeline interestId={id} token={token} />}
        {id && view === 'taste' && interest.data && (
          <TasteProfileEditor interest={interest.data} token={token} />
        )}
      </Box>

      <OnboardingDialog
        open={modal === 'new'}
        onClose={() => setModal('none')}
        token={token}
        onCreated={(newId) => { setModal('none'); navigate(`/library/${newId}/acquisitions`); }}
      />
      {interest.data && (
        <CheckInDialog
          open={modal === 'checkin'}
          onClose={() => setModal('none')}
          interest={interest.data}
          token={token}
        />
      )}
    </Box>
  );
};

const LibraryPage: React.FC<{ view: LibraryView }> = ({ view }) => {
  const { isAuthenticated, userProfile, isLoading, login, logout } = useAuth();

  const user = userProfile
    ? { firstName: userProfile.firstName ?? undefined, lastName: userProfile.lastName ?? undefined, realm_access: userProfile.realm_access }
    : undefined;

  if (isLoading) return <LoadingScreen />;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />
      <PrismThemeProvider>
        <Box sx={{ flex: 1, bgcolor: 'background.default' }}>
          {isAuthenticated ? (
            <LibraryPageInner view={view} />
          ) : (
            <Box sx={{ p: 4 }}>Sign in as a writer to use your library.</Box>
          )}
        </Box>
      </PrismThemeProvider>
    </Box>
  );
};

function tabStyle(
  tokens: { color: { brand: { primary: string }; text: { secondary: string } }; typography: { mono: string } },
  active: boolean
): React.CSSProperties {
  return {
    fontFamily: tokens.typography.mono, fontSize: 12.5, letterSpacing: '0.05em',
    textDecoration: 'none', paddingBottom: 4,
    color: active ? tokens.color.brand.primary : tokens.color.text.secondary,
    borderBottom: active ? `2px solid ${tokens.color.brand.primary}` : '2px solid transparent',
  };
}

export default LibraryPage;
