import styled from '@emotion/styled';
import { SearchStepInput } from '../SearchStepOne/SearchStepOne.styles';

export const EtcInput = styled(SearchStepInput)<{
  isDarkMode: boolean;
}>`
  display: grid;
  grid-template-columns: 9rem 10rem;
  gap: 1.8rem 2rem;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.2rem;
  line-height: 1.5rem;
  @media (max-width: 420px) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    > div:not(:first-child) {
      margin-top: 1rem;
    }
  }
  > input {
    margin: 0 auto;
    border: 0;
    border-bottom: 1px solid
      ${({ isDarkMode }) => (!isDarkMode ? '#7E8D6D' : '#ADCE8A')};
    width: 4.5rem;
    padding: 0.3rem 0;
    background-color: transparent;
    color: ${({ isDarkMode }) => (!isDarkMode ? '#000000' : '#FFFFFF')};
    text-align: center;
    font-size: 1.2rem;
  }
  > div {
    > div {
      font-size: 0.9rem;
    }
  }
  > select {
    padding: 0.5rem;
    background-color: ${({ isDarkMode }) =>
      !isDarkMode ? '#FFFFFF' : '#3D3D3D'};
    color: ${({ isDarkMode }) => (!isDarkMode ? '#3D3D3D' : '#FFFFFF')};
    text-align: center;
    font-size: 1rem;
  }
`;

export const EtcInputMore = styled(SearchStepInput)<{
  isDarkMode: boolean;
}>`
  > p {
    width: 80%;
    margin: 0 auto;
    margin-bottom: 0.5rem;
  }
  > p:not(:first-child) {
    margin-top: 1.5rem;
  }
  > select {
    padding: 0.5rem;
    background-color: ${({ isDarkMode }) =>
      !isDarkMode ? '#FFFFFF' : '#3D3D3D'};
    color: ${({ isDarkMode }) => (!isDarkMode ? '#3D3D3D' : '#FFFFFF')};
    text-align: center;
    font-size: 1rem;
  }
`;
