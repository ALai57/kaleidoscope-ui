import React from 'react';
import { Box, Divider, IconButton, Tooltip } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CodeIcon from '@mui/icons-material/Code';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';
import FormatIndentDecreaseIcon from '@mui/icons-material/FormatIndentDecrease';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import ImageIcon from '@mui/icons-material/Image';
import type { Editor } from '@tiptap/react';

export interface EditorToolbarProps {
  editor: Editor | null;
  onInsertImage?: () => void;
}

const activeColor = 'primary.main';
const inactiveColor = 'text.secondary';

interface ToolbarButtonProps {
  title: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  'data-testid'?: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  title,
  active = false,
  disabled = false,
  onClick,
  children,
  'data-testid': testId,
}) => {
  const sx: SxProps<Theme> = {
    color: active ? activeColor : inactiveColor,
    borderRadius: 1,
    p: 0.5,
    '&:hover': { backgroundColor: 'action.hover' },
  };

  return (
    <Tooltip title={title}>
      <span>
        <IconButton
          size="small"
          onClick={onClick}
          disabled={disabled}
          sx={sx}
          aria-label={title}
          aria-pressed={active}
          data-testid={testId}
        >
          {children}
        </IconButton>
      </span>
    </Tooltip>
  );
};

const ToolbarDivider: React.FC = () => (
  <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
);

export const EditorToolbar: React.FC<EditorToolbarProps> = ({ editor, onInsertImage }) => {
  if (!editor) return null;

  const handleLink = (): void => {
    const previousUrl = editor.getAttributes('link')['href'] as string | undefined;
    const url = window.prompt('URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 0.25,
        p: 0.5,
        borderBottom: 1,
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
      role="toolbar"
      aria-label="Text formatting"
    >
      {/* Text marks */}
      <ToolbarButton
        title="Bold"
        active={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}
        data-testid="toolbar-bold"
      >
        <FormatBoldIcon fontSize="small" />
      </ToolbarButton>
      <ToolbarButton
        title="Italic"
        active={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        data-testid="toolbar-italic"
      >
        <FormatItalicIcon fontSize="small" />
      </ToolbarButton>
      <ToolbarButton
        title="Underline"
        active={editor.isActive('underline')}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        data-testid="toolbar-underline"
      >
        <FormatUnderlinedIcon fontSize="small" />
      </ToolbarButton>
      <ToolbarButton
        title="Strikethrough"
        active={editor.isActive('strike')}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        data-testid="toolbar-strike"
      >
        <StrikethroughSIcon fontSize="small" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Headings */}
      <ToolbarButton
        title="Heading 1"
        active={editor.isActive('heading', { level: 1 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        data-testid="toolbar-h1"
      >
        <LooksOneIcon fontSize="small" />
      </ToolbarButton>
      <ToolbarButton
        title="Heading 2"
        active={editor.isActive('heading', { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        data-testid="toolbar-h2"
      >
        <LooksTwoIcon fontSize="small" />
      </ToolbarButton>
      <ToolbarButton
        title="Heading 3"
        active={editor.isActive('heading', { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        data-testid="toolbar-h3"
      >
        <Looks3Icon fontSize="small" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Blocks */}
      <ToolbarButton
        title="Blockquote"
        active={editor.isActive('blockquote')}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        data-testid="toolbar-blockquote"
      >
        <FormatQuoteIcon fontSize="small" />
      </ToolbarButton>
      <ToolbarButton
        title="Code block"
        active={editor.isActive('codeBlock')}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        data-testid="toolbar-code-block"
      >
        <CodeIcon fontSize="small" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Lists */}
      <ToolbarButton
        title="Ordered list"
        active={editor.isActive('orderedList')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        data-testid="toolbar-ordered-list"
      >
        <FormatListNumberedIcon fontSize="small" />
      </ToolbarButton>
      <ToolbarButton
        title="Unordered list"
        active={editor.isActive('bulletList')}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        data-testid="toolbar-bullet-list"
      >
        <FormatListBulletedIcon fontSize="small" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Alignment */}
      <ToolbarButton
        title="Align left"
        active={editor.isActive({ textAlign: 'left' })}
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        data-testid="toolbar-align-left"
      >
        <FormatAlignLeftIcon fontSize="small" />
      </ToolbarButton>
      <ToolbarButton
        title="Align center"
        active={editor.isActive({ textAlign: 'center' })}
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        data-testid="toolbar-align-center"
      >
        <FormatAlignCenterIcon fontSize="small" />
      </ToolbarButton>
      <ToolbarButton
        title="Align right"
        active={editor.isActive({ textAlign: 'right' })}
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        data-testid="toolbar-align-right"
      >
        <FormatAlignRightIcon fontSize="small" />
      </ToolbarButton>
      <ToolbarButton
        title="Justify"
        active={editor.isActive({ textAlign: 'justify' })}
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        data-testid="toolbar-align-justify"
      >
        <FormatAlignJustifyIcon fontSize="small" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Indent — these buttons are rendered but indent/outdent are no-ops without
          an indent extension; casting via unknown to avoid TS errors on missing commands */}
      <ToolbarButton
        title="Increase indent"
        onClick={() =>
          (editor.chain().focus() as unknown as Record<string, () => { run: () => void }>)[
            'indent'
          ]?.().run()
        }
        data-testid="toolbar-indent"
      >
        <FormatIndentIncreaseIcon fontSize="small" />
      </ToolbarButton>
      <ToolbarButton
        title="Decrease indent"
        onClick={() =>
          (editor.chain().focus() as unknown as Record<string, () => { run: () => void }>)[
            'outdent'
          ]?.().run()
        }
        data-testid="toolbar-outdent"
      >
        <FormatIndentDecreaseIcon fontSize="small" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Link & Image */}
      <ToolbarButton
        title="Insert link"
        active={editor.isActive('link')}
        onClick={handleLink}
        data-testid="toolbar-link"
      >
        <InsertLinkIcon fontSize="small" />
      </ToolbarButton>
      {onInsertImage !== undefined && (
        <ToolbarButton
          title="Insert image"
          onClick={onInsertImage}
          data-testid="toolbar-image"
        >
          <ImageIcon fontSize="small" />
        </ToolbarButton>
      )}
    </Box>
  );
};
