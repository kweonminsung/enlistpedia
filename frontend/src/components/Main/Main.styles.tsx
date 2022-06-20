import styled from "@emotion/styled";

export const MainContainer = styled.div`
  margin: 0 auto;
  margin-top: 3rem;
  width: 90%;
  max-width: 50rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SearchButton = styled.button<{
  isDarkMode: boolean | undefined;
  isSearching: boolean | undefined;
}>`
  border-radius: 0.8rem 0.8rem 0 0;
  padding: 0.6rem 0;
  width: 6.2rem;
  background-color: ${({ isDarkMode, isSearching }) =>
    !isSearching ? "transparent" : !isDarkMode ? "#7E8D6D" : "#ADCE8A"};
  font-size: 1.2rem;
  color: ${({ isDarkMode, isSearching }) =>
    !isSearching
      ? !isDarkMode
        ? "#7E8D6D"
        : "#ADCE8A"
      : !isDarkMode
      ? "#FFFFFF"
      : "#3D3D3D"};
  transition: all 0.25s linear;
`;
