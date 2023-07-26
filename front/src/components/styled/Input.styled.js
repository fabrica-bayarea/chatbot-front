import styled from 'styled-components';

const Input = styled.input`
  border: 1px solid lightgray;
  color: inherit;
  font-family: inherit;
  font-size: 1rem;
  height: 40px;
  padding: 0 10px;
  width: 100%;

  &::placeholder {
    color: lightgray;
    transition: opacity 200ms ease-in-out;
  }

  &:focus::placeholder {
    opacity: 0;
  }
`;

export { Input };
