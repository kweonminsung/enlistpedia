import styled from '@emotion/styled';
import { SearchStepInput } from '../SearchStepOne/SearchStepOne.styles';

export const EtcInput = styled(SearchStepInput)<{
  isDarkMode: boolean | undefined;
}>`
  display: grid;
  grid-template-columns: 8rem 4.5rem;
  gap: 1.8rem 2rem;
  align-items: center;
  justify-content: center;
  text-align: left;
  input {
    border: 0;
    border-bottom: 1px solid
      ${({ isDarkMode }) => (!isDarkMode ? '#7E8D6D' : '#ADCE8A')};
    width: 4.5rem;
    padding: 0.3rem 0;
    background-color: transparent;
    color: ${({ isDarkMode }) => (!isDarkMode ? '#000000' : '#FFFFFF')};
    text-align: center;
    font-size: 1.5rem;
  }
`;

export const ExtraInput = styled(SearchStepInput)<{
  isDarkMode: boolean | undefined;
}>`
  width: 80%;
  margin: 0 auto;
  padding: 0;
  overflow: hidden;
  > button {
    width: 100%;
    margin: 1rem 0 0 0;
    padding: 0.5rem;
    background-color: ${({ isDarkMode }) =>
      !isDarkMode ? '#7E8D6D' : '#ADCE8A'};
    color: ${({ isDarkMode }) => (!isDarkMode ? '#FFFFFF' : '#3D3D3D')};
    font-size: 1rem;
  }
`;

export const ExtraInputMain = styled.div`
  height: 10rem;
`;

export const ExtraInputOption = styled.div``;
