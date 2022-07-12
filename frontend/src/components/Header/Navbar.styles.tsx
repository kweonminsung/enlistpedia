import styled from '@emotion/styled';

export const NavbarContainer = styled.nav`
  padding: 1.5rem;
  display: flex;
  justify-content: end;
  gap: 0.5rem;
`;

export const LoginButton = styled.button<{ isDarkMode: boolean }>`
  width: 4.5rem;
  height: 2rem;
  border-radius: 1rem;
  background-color: ${({ isDarkMode }) =>
    !isDarkMode ? '#7E8D6D' : '#ADCE8A'};
  font-size: 0.9rem;
  color: ${({ isDarkMode }) => (!isDarkMode ? '#FFFFFF' : '#3D3D3D')};
  cursor: pointer;
  transition: all 0.25s linear;
`;

export const ToggleButton = styled.button<{
  isDarkMode: boolean;
}>`
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  background-color: ${({ isDarkMode }) =>
    !isDarkMode ? '#FFFFFF' : '#3D3D3D'};
  cursor: pointer;
  transition: all 0.25s linear;
  transform: ${({ isDarkMode }) =>
    !isDarkMode ? 'rotate(0turn)' : 'rotate(1turn)'};
  &:active {
    transform: rotate(0.5turn);
  }
`;
