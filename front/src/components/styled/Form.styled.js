import styled from 'styled-components';

const Form = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  & > div {
    color: var(--clr-error);
    height: 50px;
    text-align: center;

    svg {
      margin-right: 10px;
    }
  }
`;

export { Form };
