import styled from 'styled-components';

const Input = styled.input`
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  padding: 0 10px;
  width: 100%;

  &::placeholder {
    color: var(--clr-light-gray);
    transition: opacity 200ms ease-in-out;
  }

  &:focus::placeholder {
    opacity: 0;
  }
`;

const MainInput = styled(Input)`
  border: 1px solid var(--clr-lighter-gray);
  font-size: 1rem;
  height: 40px;
`;

const MessageInput = styled(Input)`
  border: none;
  border-top: 1px solid var(--clr-lighter-gray);
  font-size: 1.2rem;
  height: 50px;
`;

export { Input, MainInput, MessageInput };
