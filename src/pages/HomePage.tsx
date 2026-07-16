import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import RefractionHero from '@/components/home/RefractionHero';
import { PortfolioSection } from '@/components/layout/PortfolioSection';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/auth/useAuth';
import { getArticles } from '@/api/articles';

const HomePage: React.FC = () => {
  const { token } = useAuth();
  const { data: articles = [] } = useQuery({
    queryKey: ['articles'],
    queryFn: () => getArticles(token),
  });

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {/* The hero IS the front-page navigation — no top NavBar here. */}
      <RefractionHero />
      <Container maxWidth="lg" sx={{ pb: 6 }}>
        <PortfolioSection recentArticles={articles} />
      </Container>
      <Footer />
    </Box>
  );
};

export default HomePage;
