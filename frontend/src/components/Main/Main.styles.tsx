import { keyframes } from '@emotion/css';
import styled from '@emotion/styled';

export const MainContainer = styled.div`
  margin: 0 auto;
  width: 90%;
  max-width: 50rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

export const StartArrowContainer = styled.div<{
  isDarkMode: boolean;
  isSearching: boolean;
}>`
  margin-top: ${({ isSearching }) => (isSearching ? '5rem' : '12rem')};
  animation: ${bounce} 3s infinite;
  > svg {
    display: ${({ isSearching }) => (isSearching ? 'none' : '')};
  }
  transition: all 0.25s linear;
`;

export const SearchButton = styled.button<{
  isDarkMode: boolean;
  isSearching: boolean;
}>`
  border-radius: 0.8rem 0.8rem 0 0;
  padding: 0.6rem 0;
  width: 6.2rem;
  background-color: ${({ isDarkMode, isSearching }) =>
    !isSearching ? 'transparent' : !isDarkMode ? '#7E8D6D' : '#ADCE8A'};
  font-size: 1.2rem;
  color: ${({ isDarkMode, isSearching }) =>
    !isSearching
      ? !isDarkMode
        ? '#7E8D6D'
        : '#ADCE8A'
      : !isDarkMode
      ? '#FFFFFF'
      : '#3D3D3D'};
  transition: all 0.25s linear;
  :hover {
    border-radius: ${({ isSearching }) => (!isSearching ? '0.8rem' : '')};
    background-color: ${({ isDarkMode, isSearching }) =>
      !isSearching ? (!isDarkMode ? '#7E8D6D' : '#ADCE8A') : ''};
    color: ${({ isDarkMode, isSearching }) =>
      !isSearching ? (!isDarkMode ? '#FFFFFF' : '#3D3D3D') : ''};
  }
`;
