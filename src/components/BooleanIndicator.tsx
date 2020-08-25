import { styled } from 'linaria/react';

export interface BooleanIndicatorProps {
  value: boolean | undefined;
}

export default styled.div<BooleanIndicatorProps>`
  background-color: ${props => (props.value ? 'var(--green)' : 'var(--red)')};
  border-radius: 50%;
  display: inline-block;
  height: 0.8em;
  margin: 0 4px;
  transform: translateY(1px);
  width: 0.8em;
`;
