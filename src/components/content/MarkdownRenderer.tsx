import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Box from '@mui/material/Box';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => (
  <Box
    sx={{
      fontSize: '0.82rem',
      lineHeight: 1.65,
      color: 'text.primary',
      // Headings
      '& h1, & h2, & h3, & h4, & h5, & h6': {
        fontWeight: 600,
        mt: 1.5,
        mb: 0.5,
        lineHeight: 1.3,
        '&:first-child': { mt: 0 },
      },
      '& h1': { fontSize: '1.1rem' },
      '& h2': { fontSize: '1rem' },
      '& h3': { fontSize: '0.9rem' },
      '& h4, & h5, & h6': { fontSize: '0.85rem' },
      // Paragraphs
      '& p': { mt: 0, mb: 1, '&:last-child': { mb: 0 } },
      // Lists
      '& ul, & ol': { mt: 0, mb: 1, pl: 2.5, '&:last-child': { mb: 0 } },
      '& li': { mb: 0.25 },
      // Inline code
      '& code': {
        fontFamily: 'monospace',
        fontSize: '0.78rem',
        bgcolor: 'grey.100',
        borderRadius: '3px',
        px: 0.5,
        py: 0.1,
      },
      // Code blocks
      '& pre': {
        m: 0,
        mb: 1,
        p: 1.5,
        bgcolor: 'grey.100',
        borderRadius: 1,
        overflowX: 'auto',
        '&:last-child': { mb: 0 },
        '& code': { bgcolor: 'transparent', px: 0, py: 0, fontSize: '0.76rem' },
      },
      // Blockquotes
      '& blockquote': {
        m: 0,
        mb: 1,
        pl: 1.5,
        borderLeft: '3px solid',
        borderColor: 'divider',
        color: 'text.secondary',
        '&:last-child': { mb: 0 },
      },
      // Tables (remark-gfm)
      '& table': {
        width: '100%',
        borderCollapse: 'collapse',
        mb: 1,
        fontSize: '0.78rem',
      },
      '& th, & td': {
        border: '1px solid',
        borderColor: 'divider',
        px: 1,
        py: 0.5,
        textAlign: 'left',
      },
      '& th': { bgcolor: 'grey.50', fontWeight: 600 },
      // Horizontal rules
      '& hr': { border: 'none', borderTop: '1px solid', borderColor: 'divider', my: 1.5 },
      // Links
      '& a': { color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } },
      // Strong / em
      '& strong': { fontWeight: 600 },
    }}
  >
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {content}
    </ReactMarkdown>
  </Box>
);

export default MarkdownRenderer;
