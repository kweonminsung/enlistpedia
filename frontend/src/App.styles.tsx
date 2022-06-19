import styled from "@emotion/styled";

export const AppContainer = styled.div<{
  isDarkMode: boolean | undefined;
}>`
  background-color: ${({ isDarkMode }) =>
    isDarkMode === false ? "#FFFFFF" : "#3D3D3D"}};
`;
