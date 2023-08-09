import styled from 'styled-components';

import { devices } from '../../utils';

const Main = styled.main`
  align-items: center;
  background: var(--gradient-b);
  display: flex;
  justify-content: space-evenly;
  min-height: 100vh;

  @media ${devices.laptopS} {
    flex-direction: column;
    justify-content: flex-start;
  }

  @media ${devices.mobileL} {
    padding: 0 10px 20px;
  }
`;

export { Main };
