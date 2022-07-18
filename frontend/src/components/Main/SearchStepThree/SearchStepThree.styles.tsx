import styled from '@emotion/styled';
import { SearchStepInput } from '../SearchStepOne/SearchStepOne.styles';

export const ExtraInput = styled(SearchStepInput)<{
  isDarkMode: boolean;
}>`
  width: 90%;
  margin: 0 auto;
  padding: 1rem 0 0 0;
  overflow: hidden;
  > button {
    width: 100%;
    margin: 0.8rem 0 0 0;
    padding: 0.5rem;
    background-color: ${({ isDarkMode }) =>
      !isDarkMode ? '#7E8D6D' : '#ADCE8A'};
    color: ${({ isDarkMode }) => (!isDarkMode ? '#FFFFFF' : '#3D3D3D')};
    font-size: 1rem;
  }
`;

export const ExtraInputMain = styled.div<{
  isDarkMode: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0 auto;
  width: 80%;
  > select {
    padding: 0.5rem;
    text-align: center;
    font-size: 1rem;
    color: ${({ isDarkMode }) => (!isDarkMode ? '#3D3D3D' : '#FFFFFF')};
    option {
      padding: 0.5rem;
    }
  }
  > select:first-of-type {
    border-radius: 0.5rem;
    background-color: ${({ isDarkMode }) =>
      !isDarkMode ? '#F0F0F0' : '#707070'};
  }
  > select:nth-of-type(2) {
    background-color: ${({ isDarkMode }) =>
      !isDarkMode ? '#FFFFFF' : '#3D3D3D'};
  }
`;
