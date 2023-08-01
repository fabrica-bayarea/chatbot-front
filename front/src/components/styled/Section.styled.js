import styled from 'styled-components';

const Section = styled.section`
  border-radius: 20px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 380px;

  & > header {
    align-items: center;
    background-color: var(--clr-a);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    color: white;
    display: flex;
    font-size: 1.25rem;
    height: 120px;
    justify-content: space-between;
    padding: 0 40px;
  }

  & > div {
    align-items: center;
    background-color: white;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 40px;
  }
`;

export { Section };
