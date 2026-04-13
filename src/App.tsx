import React, { Suspense, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { LoadingScreen } from './components/layout/LoadingScreen';
import { ErrorPage } from './components/layout/ErrorPage';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const ProjectsPage = React.lazy(() => import('./pages/projects/ProjectsPage'));
const ProjectDetailPage = React.lazy(() => import('./pages/projects/ProjectDetailPage'));
const ProjectDevelopPage = React.lazy(() => import('./pages/projects/ProjectDevelopPage'));
const ProjectSkillsPage = React.lazy(() => import('./pages/projects/ProjectSkillsPage'));
const ScoreDefinitionsPage = React.lazy(() => import('./pages/projects/ScoreDefinitionsPage'));
const ArticlePage = React.lazy(() => import('./pages/ArticlePage'));
const ArticleManagerPage = React.lazy(() => import('./pages/ArticleManagerPage'));
const ArticleEditorPage = React.lazy(() => import('./pages/ArticleEditorPage'));
const ImageManagerPage = React.lazy(() => import('./pages/ImageManagerPage'));
const UIManagerPage = React.lazy(() => import('./pages/UIManagerPage'));
const GroupsPage = React.lazy(() => import('./pages/GroupsPage'));
const SignUpPage = React.lazy(() => import('./pages/SignUpPage'));
const AdminPage = React.lazy(() => import('./pages/AdminPage'));
const AboutThisSitePage = React.lazy(() => import('./pages/AboutThisSitePage'));
const ManagerPage = React.lazy(() => import('./pages/ManagerPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ExperiencePage = React.lazy(() => import('./pages/ExperiencePage'));

const WorkflowsPage = React.lazy(() => import('./pages/WorkflowsPage'));
const WorkflowEditorPage = React.lazy(() => import('./pages/WorkflowEditorPage'));
const AgentTeamPage = React.lazy(() => import('./pages/AgentTeamPage'));

const ArchivePage = React.lazy(() =>
  import('./pages/ArticlePage').then((m) => ({ default: m.ArchiveView }))
);

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    element: <Outlet />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/home', element: <HomePage /> },
      { path: '/content/:slug', element: <ArticlePage /> },
      { path: '/archive', element: <ArchivePage /> },
      { path: '/articles', element: <ArticleManagerPage /> },
      { path: '/articles/new', element: <ArticleEditorPage /> },
      { path: '/articles/:slug/edit', element: <ArticleEditorPage /> },
      { path: '/images', element: <ImageManagerPage /> },
      { path: '/ui', element: <UIManagerPage /> },
      { path: '/groups', element: <GroupsPage /> },
      { path: '/sign-up', element: <SignUpPage /> },
      { path: '/admin', element: <AdminPage /> },
      { path: '/about-this-site', element: <AboutThisSitePage /> },
      { path: '/manager', element: <ManagerPage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/experience', element: <ExperiencePage /> },
      { path: '/projects', element: <ProjectsPage /> },
      { path: '/projects/:id', element: <ProjectDetailPage /> },
      { path: '/projects/:id/develop', element: <ProjectDevelopPage /> },
      { path: '/projects/:id/skills', element: <ProjectSkillsPage /> },
      { path: '/score-definitions', element: <ScoreDefinitionsPage /> },
      { path: '/workflows', element: <WorkflowsPage /> },
      { path: '/workflows/new', element: <WorkflowEditorPage /> },
      { path: '/workflows/:id', element: <WorkflowEditorPage /> },
      { path: '/agents', element: <AgentTeamPage /> },
    ],
  },
]);

const HashRedirect: React.FC = () => {
  useEffect(() => {
    if (window.location.hash.startsWith('#/')) {
      window.location.replace(window.location.hash.slice(1));
    }
  }, []);

  return null;
};

const App: React.FC = () => (
  <>
    <HashRedirect />
    <Suspense fallback={<LoadingScreen />}>
      <RouterProvider router={router} />
    </Suspense>
  </>
);

export default App;
