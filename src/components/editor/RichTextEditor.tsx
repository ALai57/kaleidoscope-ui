import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { Box, Modal } from '@mui/material';
import { extensions } from './extensions';
import { EditorToolbar } from './EditorToolbar';
import { ImageBrowser } from '@/components/images/ImageBrowser';
import type { Image as ImageType } from '@/types/image';

export interface RichTextEditorProps {
  initialContent?: string;
  onChange?: (html: string) => void;
  editable?: boolean;
  onInsertImage?: () => void;
  images?: ImageType[];
  authToken?: string;
}

const modalBoxStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80vw',
  maxWidth: '900px',
  height: '80vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: 1,
  overflow: 'hidden',
};

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialContent = '',
  onChange,
  editable = true,
  onInsertImage,
  images,
  authToken,
}) => {
  const [imageBrowserOpen, setImageBrowserOpen] = useState(false);

  const editor = useEditor({
    extensions,
    content: initialContent,
    editable,
    onUpdate: ({ editor: e }) => {
      onChange?.(e.getHTML());
    },
  });

  // Determine the image insert handler:
  // 1. If explicit onInsertImage provided, use that.
  // 2. If images array provided, open the internal ImageBrowser modal.
  // 3. Otherwise, no image button shown.
  const resolvedOnInsertImage: (() => void) | undefined =
    onInsertImage ??
    (images !== undefined ? () => setImageBrowserOpen(true) : undefined);

  return (
    <Box
      sx={{
        border: editable ? 1 : 0,
        borderColor: 'divider',
        borderRadius: 1,
        overflow: 'hidden',
      }}
    >
      {editable && (
        <EditorToolbar
          editor={editor}
          {...(resolvedOnInsertImage !== undefined && { onInsertImage: resolvedOnInsertImage })}
        />
      )}
      <Box
        sx={{
          minHeight: editable ? '200px' : undefined,
          p: editable ? 1.5 : 0,
          '& .ProseMirror': {
            outline: 'none',
            minHeight: editable ? '180px' : undefined,
            '& p': { margin: '0.5em 0' },
            '& h1, & h2, & h3': { margin: '0.75em 0 0.25em' },
            '& pre': {
              backgroundColor: 'grey.900',
              color: 'grey.100',
              padding: '1em',
              borderRadius: '4px',
              overflowX: 'auto',
            },
            '& code': {
              backgroundColor: 'grey.100',
              borderRadius: '2px',
              padding: '0.1em 0.3em',
              fontFamily: 'monospace',
            },
            '& pre code': {
              backgroundColor: 'transparent',
              padding: 0,
            },
            '& blockquote': {
              borderLeft: '3px solid',
              borderColor: 'divider',
              paddingLeft: '1em',
              marginLeft: 0,
              color: 'text.secondary',
            },
            '& img': {
              maxWidth: '100%',
              height: 'auto',
            },
          },
        }}
      >
        <EditorContent editor={editor} />
      </Box>

      {/* Internal image browser modal — only rendered when images prop provided */}
      {images !== undefined && (
        <Modal
          open={imageBrowserOpen}
          onClose={() => setImageBrowserOpen(false)}
          slotProps={{
            backdrop: { style: { backgroundColor: 'rgba(0, 0, 40, 0.8)' } },
          }}
        >
          <Box sx={modalBoxStyle}>
            <ImageBrowser
              mode="select"
              images={images}
              authToken={authToken ?? null}
              photoManager={{
                selectPhoto: (src: string) => {
                  editor?.chain().focus().setImage({ src }).run();
                  setImageBrowserOpen(false);
                },
              }}
            />
          </Box>
        </Modal>
      )}
    </Box>
  );
};
