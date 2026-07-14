import { describe, it, expect } from 'vitest';
import { render } from '../../../test/testUtils';
import { RefractionBanner } from './RefractionBanner';

describe('RefractionBanner', () => {
  it('renders the per-ray technique labels and the raw size, data-driven from props', () => {
    const { getByText } = render(
      <RefractionBanner
        techniques={{ acquire: 'direct', parse: 'json-ld', normalize: 'llm-grouping' }}
        bytes={49408}
      />,
    );
    expect(getByText(/RAW · 48\.3 KB/)).toBeInTheDocument();
    expect(getByText(/:direct → RawScrape/)).toBeInTheDocument();
    expect(getByText(/:json-ld → ExtractedFacts/)).toBeInTheDocument();
    expect(getByText(/:llm-grouping → RecipeContent/)).toBeInTheDocument();
  });
});
