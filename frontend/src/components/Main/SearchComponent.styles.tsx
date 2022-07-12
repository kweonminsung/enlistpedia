import styled from '@emotion/styled';

export const SearchComponentContainer = styled.div<{
  isDarkMode: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 4rem;
  width: 100%;
  border-radius: 1rem;
  background-color: ${({ isDarkMode }) =>
    !isDarkMode ? '#FAFAFA' : '#7A7A7A'};
`;

export const SearchStageText = styled.div<{
  isDarkMode: boolean;
}>`
  border-radius: 0 0 0.8rem 0.8rem;
  padding: 0.6rem 0;
  width: 6.2rem;
  background-color: ${({ isDarkMode }) =>
    !isDarkMode ? '#F0F0F0' : '#707070'};
  text-align: center;
  color: ${({ isDarkMode }) => (!isDarkMode ? '#7E8D6D' : '#ADCE8A')};
  font-size: 1.2rem;
`;

export const BottomButtons = styled.div`
  position: absolute;
  bottom: 0;
  border-radius: 0.8rem 0.8rem 0 0;
  overflow: hidden;
`;

export const PrevStageButton = styled.button<{
  isDarkMode: boolean;
}>`
  padding: 0.6rem 0;
  width: 6.2rem;
  background-color: ${({ isDarkMode }) =>
    !isDarkMode ? '#F0F0F0' : '#707070'};
  color: ${({ isDarkMode }) => (!isDarkMode ? '#7E8D6D' : '#ADCE8A')};
  font-size: 1.2rem;
`;

export const NextStageButton = styled.button<{
  isDarkMode: boolean;
}>`
  padding: 0.6rem 0;
  width: 6.2rem;
  background-color: ${({ isDarkMode }) =>
    !isDarkMode ? '#F0F0F0' : '#707070'};
  color: ${({ isDarkMode }) => (!isDarkMode ? '#7E8D6D' : '#ADCE8A')};
  font-size: 1.2rem;
`;
