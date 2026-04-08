import type { Meta, StoryObj } from '@storybook/react';
import { RichTextEditor } from './RichTextEditor';

const sampleHtml = `
<h1>Welcome to the Rich Text Editor</h1>
<p>This editor supports <strong>bold</strong>, <em>italic</em>, and <u>underlined</u> text.</p>
<h2>Features</h2>
<ul>
  <li>Rich text formatting</li>
  <li>Code blocks with syntax highlighting</li>
  <li>Image insertion</li>
  <li>Links</li>
</ul>
<h2>Code Example</h2>
<pre><code class="language-javascript">const greeting = (name) => \`Hello, \${name}!\`;
console.log(greeting('world'));</code></pre>
<blockquote>This is a blockquote — great for callouts and important notes.</blockquote>
`.trim();

const meta: Meta<typeof RichTextEditor> = {
  title: 'Editor/RichTextEditor',
  component: RichTextEditor,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof RichTextEditor>;

export const Editable: Story = {
  args: {
    initialContent: sampleHtml,
    editable: true,
    onChange: (html: string) => console.log('Content changed:', html.slice(0, 100)),
  },
};

export const ReadOnly: Story = {
  args: {
    initialContent: sampleHtml,
    editable: false,
  },
};

export const Empty: Story = {
  args: {
    editable: true,
  },
};

export const WithImages: Story = {
  args: {
    initialContent: '<p>Click the image button in the toolbar to insert an image.</p>',
    editable: true,
    images: [
      {
        name: 'sample-photo.jpg',
        title: 'Sample Photo',
        description: 'A sample photo for the image browser',
        creator: 'Demo',
        created_at: '2024-01-01T00:00:00Z',
        versions: {
          raw: { src: 'https://andrewslai.com/static/images/nav-bar/favicon.svg' },
          thumbnail: { src: 'https://andrewslai.com/static/images/nav-bar/favicon.svg' },
        },
      },
    ],
  },
};
