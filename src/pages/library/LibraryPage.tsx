import * as React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { LoadingScreen } from '../../components/layout/LoadingScreen';
import { PrismThemeProvider, Button } from '../../components/prism';
import { useAuth } from '../../auth/useAuth';
import { isWriter } from '../../auth/authHelpers';
import { useInterests, useInterest } from '../../components/library/hooks';
import { InterestRail } from '../../components/library/InterestRail';
import { ShelfView } from '../../components/library/ShelfView';
import { TasteProfileEditor } from '../../components/library/TasteProfileEditor';
import { AcquisitionsPipeline } from '../../components/library/AcquisitionsPipeline';
import { OnboardingDialog } from '../../components/library/OnboardingDialog';
import { CheckInDialog } from '../../components/library/CheckInDialog';

export type LibraryView = 'shelf' | 'acquisitions' | 'taste';

const LibraryPageInner: React.FC<{ view: LibraryView; canEdit: boolean }> = ({ view, canEdit }) => {
  const { tokens } = useTheme();
  const { token } = useAuth();
  const navigate = useNavigate();
  const { interestId } = useParams<{ interestId: string }>();
  const interests = useInterests(token);
  const interest = useInterest(interestId ?? '', token);
  const [modal, setModal] = React.useState<'none' | 'new' | 'checkin'>('none');

  const id = interestId ?? '';
  // Non-writers can never land on a writer-only view.
  const effectiveView: LibraryView = canEdit ? view : 'shelf';

  return (
    <Box sx={{ display: 'flex', gap: 3, p: 3, minHeight: '70vh' }}>
      <InterestRail
        interests={interests.data ?? []}
        activeId={interestId}
        onAdd={canEdit ? () => setModal('new') : undefined}
      />

      <Box sx={{ flex: 1 }}>
        {id && canEdit && (
          <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
            <Link to={`/library/${id}`} style={tabStyle(tokens, effectiveView === 'shelf')}>Shelves</Link>
            <Link to={`/library/${id}/acquisitions`} style={tabStyle(tokens, effectiveView === 'acquisitions')}>Acquisitions</Link>
            <Link to={`/library/${id}/taste`} style={tabStyle(tokens, effectiveView === 'taste')}>Taste profile</Link>
            <div style={{ marginLeft: 'auto' }}>
              <Button variant="subtle" onClick={() => setModal('checkin')}>Check-in</Button>
            </div>
          </div>
        )}

        {!id && (
          <p style={{ color: tokens.color.text.secondary }}>
            {canEdit ? 'Select an interest, or add one to start a shelf.' : 'Select a shelf to browse.'}
          </p>
        )}

        {id && effectiveView === 'shelf' && <ShelfView interestId={id} token={token} canEdit={canEdit} />}
        {id && canEdit && effectiveView === 'acquisitions' && <AcquisitionsPipeline interestId={id} token={token} />}
        {id && canEdit && effectiveView === 'taste' && interest.data && (
          <TasteProfileEditor interest={interest.data} token={token} />
        )}
      </Box>

      {canEdit && (
        <OnboardingDialog
          open={modal === 'new'}
          onClose={() => setModal('none')}
          token={token}
          onCreated={(newId) => { setModal('none'); navigate(`/library/${newId}/acquisitions`); }}
        />
      )}
      {canEdit && interest.data && (
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
  const { userProfile, isLoading } = useAuth();

  if (isLoading) return <LoadingScreen />;

  const canEdit = isWriter(userProfile);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PrismThemeProvider>
        <Box sx={{ flex: 1, bgcolor: 'background.default' }}>
          <LibraryPageInner view={view} canEdit={canEdit} />
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
