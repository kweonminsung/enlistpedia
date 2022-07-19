import styled from '@emotion/styled';

export const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  border-radius: 1rem;
  overflow: hidden;
`;

export const AccordionHeader = styled.div<{
  isDarkMode: boolean;
  isCollapse: boolean;
}>`
  display: grid;
  grid-template-columns: 1fr 5rem 5rem 2rem;
  justify-items: center;
  border-radius: ${({ isCollapse }) => (isCollapse ? '1rem' : '1rem 1rem 0 0')};
  align-items: center;
  gap: 2rem;
  padding: 1rem;
  background-color: ${({ isDarkMode }) =>
    !isDarkMode ? '#7E8D6D' : '#ADCE8A'};
  color: ${({ isDarkMode }) => (!isDarkMode ? '#FFFFFF' : '#000000')};
  font-size: 1rem;
  cursor: pointer;
  @media (max-width: 420px) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const AccordionContentWrapper = styled.div<{
  isDarkMode: boolean;
}>`
  height: 0;
  width: 100%;
  overflow: hidden;
  transition: height 0.35s ease;
  background-color: ${({ isDarkMode }) =>
    !isDarkMode ? '#FFFFFF' : '#3D3D3D'};
`;

export const AccordionContent = styled.div`
  height: 10rem;
`;
