import { describe, it, expect } from 'vitest';
import { render } from '../../../test/testUtils';
import {
  Details,
  Summary,
  Twisty,
  Pre,
  IoBlock,
  IoHead,
  Role,
  StatTile,
  Handoff,
  WarnBox,
  ErrBox,
} from './lineageStyled';

describe('lineageStyled', () => {
  it('renders every shared primitive without throwing', () => {
    const { getByText } = render(
      <StatTile>
        <Details>
          <Summary>
            <Twisty>›</Twisty>
            Summary label
          </Summary>
          <IoBlock>
            <IoHead>
              <Role kind="sys">System</Role>
              <Role kind="user">User</Role>
              <Role kind="asst">Assistant</Role>
            </IoHead>
            <Pre wrap>code</Pre>
          </IoBlock>
        </Details>
        <Handoff>
          <span className="pill">
            <span className="t">Handoff</span>
          </span>
        </Handoff>
        <WarnBox>Warning</WarnBox>
        <ErrBox>Error</ErrBox>
      </StatTile>,
    );
    expect(getByText('code')).toBeInTheDocument();
    expect(getByText('System')).toBeInTheDocument();
    expect(getByText('User')).toBeInTheDocument();
    expect(getByText('Assistant')).toBeInTheDocument();
    expect(getByText('Summary label')).toBeInTheDocument();
    expect(getByText('Handoff')).toBeInTheDocument();
    expect(getByText('Warning')).toBeInTheDocument();
    expect(getByText('Error')).toBeInTheDocument();
  });
});
