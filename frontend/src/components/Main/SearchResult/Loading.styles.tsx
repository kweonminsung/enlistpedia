import styled from '@emotion/styled';

export const LoadingContainer = styled.div`
  width: 100%;
  height: 9rem;
  z-index: 10;
`;

export const LoadingSpinner = styled.div<{
  isDarkMode: boolean;
}>`
  margin: 0 auto;
  margin-top: 3rem;
  width: 7rem;
  aspect-ratio: 1 / 1;
  background-image: url(${({ isDarkMode }) =>
    !isDarkMode ? 'images/loading.svg' : 'images/loading-dark.svg'});
  background-size: contain;
  background-repeat: no-repeat;
`;
