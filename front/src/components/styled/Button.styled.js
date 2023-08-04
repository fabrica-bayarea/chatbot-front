import styled, { css } from 'styled-components';

const Button = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  display: flex;
  font-family: inherit;
  font-size: inherit;
  justify-content: center;

  &:disabled {
    cursor: unset;
  }
`;

const IconButton = styled(Button)`
  aspect-ratio: 1 / 1;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
  color: var(--clr-a);
  font-size: 1.5rem;
  height: ${(props) => props.$height || '40px'};
  scale: ${(props) => props.$scale || 1};

  ${(props) =>
    props.$mode === 'color' &&
    css`
      background: var(--gradient-a);
      color: var(--clr-light);
    `}
`;

const MainButton = styled(Button)`
  border: 2px solid var(--clr-b);
  border-radius: 25px;
  color: var(--clr-a);
  font-size: 1.2rem;
  height: 50px;
  padding: 0 10px;
  width: 250px;

  &:disabled {
    opacity: 0.4;
  }
`;

export { Button, IconButton, MainButton };
