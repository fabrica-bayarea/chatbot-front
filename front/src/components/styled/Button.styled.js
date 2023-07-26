import styled from 'styled-components';

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;

  &:disabled {
    cursor: unset;
    opacity: 0.6;
  }
`;

const MainButton = styled(Button)`
  background-color: #f7797d;
  color: white;
  height: 40px;
  padding: 0 10px;
`;

export { Button, MainButton };
