import styled from "@emotion/styled";

export const AppContainer = styled.div<{
  isDarkMode: boolean | undefined;
}>`
  background-color: ${({ isDarkMode }) =>
    !isDarkMode ? "#FFFFFF" : "#3D3D3D"};
  transition: all 0.25s linear;
`;
