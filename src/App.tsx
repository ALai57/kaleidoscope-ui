import React, { Suspense, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoadingScreen } from './components/layout/LoadingScreen';

const HomePage = React.lazy(() => import('./pages/HomePage'));
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

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/content/:slug', element: <ArticlePage /> },
  { path: '/articles', element: <ArticleManagerPage /> },
  { path: '/articles/:slug/edit', element: <ArticleEditorPage /> },
  { path: '/images', element: <ImageManagerPage /> },
  { path: '/ui', element: <UIManagerPage /> },
  { path: '/groups', element: <GroupsPage /> },
  { path: '/sign-up', element: <SignUpPage /> },
  { path: '/admin', element: <AdminPage /> },
  { path: '/about-this-site', element: <AboutThisSitePage /> },
  { path: '/manager', element: <ManagerPage /> },
  { path: '/about', element: <AboutPage /> },
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
