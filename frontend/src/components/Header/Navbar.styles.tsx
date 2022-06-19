import styled from "@emotion/styled";

export const NavbarContainer = styled.nav`
  padding: 1.5rem;
  display: flex;
  justify-content: end;
  gap: 0.2rem;
`;

export const LoginButton = styled.button<{ isDarkMode: boolean | undefined }>`
  width: 4.5rem;
  height: 2rem;
  border-radius: 1rem;
  background-color: ${({ isDarkMode }) =>
    isDarkMode === false ? "#7E8D6D" : "#ADCE8A"};
  font-size: 0.9rem;
  color: ${({ isDarkMode }) => (isDarkMode === false ? "#FFFFFF" : "#3D3D3D")};
  cursor: pointer;
`;

export const ToggleButton = styled.button<{
  isDarkMode: boolean | undefined;
}>`
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  background-color: ${({ isDarkMode }) =>
    isDarkMode === false ? "#FFFFFF" : "#3D3D3D"};
  cursor: pointer;
`;
