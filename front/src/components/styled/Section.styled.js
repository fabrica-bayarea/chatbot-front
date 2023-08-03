import styled from 'styled-components';

const Section = styled.section`
  --r: 20px;

  border-radius: var(--r);
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 400px;

  & > header {
    align-items: center;
    background-color: var(--clr-a);
    border-radius: var(--r) var(--r) 0 0;
    color: white;
    display: flex;
    font-size: 1.5rem;
    height: 120px;
    justify-content: space-between;
    padding: 0 40px;
  }

  & > div {
    align-items: center;
    background-color: white;
    border-radius: 0 0 var(--r) var(--r);
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 40px;
  }
`;

export { Section };
