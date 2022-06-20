import styled from "@emotion/styled";

export const FooterContainer = styled.footer<{
  isDarkMode: boolean | undefined;
}>`
  margin-top: 2rem;
  width: 100%;
  border-radius: 1rem 1rem 0 0;
  padding: 0.5rem;
  background-color: ${({ isDarkMode }) =>
    !isDarkMode ? "#7E8D6D" : "#ADCE8A"};
  text-align: center;
  color: ${({ isDarkMode }) => (!isDarkMode ? "#FFFFFF" : "#3D3D3D")};
`;
