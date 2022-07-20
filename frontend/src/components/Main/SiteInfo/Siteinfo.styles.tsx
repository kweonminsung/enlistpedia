import styled from '@emotion/styled';

export const IconImage = styled.div<{
  url: string;
  round: boolean;
}>`
  border-radius: ${({ round }) => (round ? '50%' : 0)};
  width: 40px;
  height: 40px;
  background-image: url('${({ url }) => url}');
  background-repeat: no-repeat;
  background-size: contain;
`;

export const TempContainer = styled.div<{
  isDarkMode: boolean;
}>`
  margin: 4rem 0 15rem 0;
  border-radius: 1rem;
  width: 100%;
  height: 20rem;
  background-color: ${({ isDarkMode }) =>
    !isDarkMode ? '#F0F0F0' : '#7A7A7A'};
`;

export const CounterConatiner = styled.div<{
  isDarkMode: boolean;
}>`
  display: flex;
  gap: 5rem;
  margin: 4rem;
  text-align: center;
  font-size: 1.2rem;
  color: ${({ isDarkMode }) => (!isDarkMode ? '#000000' : '#FFFFFF')};
  p {
    margin: 1rem 0;
  }
  p: first-of-type {
    color: ${({ isDarkMode }) => (!isDarkMode ? '#7E8D6D' : '#ADCE8A')};
    font-size: 2.5rem;
    font-weight: 700;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

export const SiteInfoBottomContainer = styled.div<{
  isDarkMode: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  font-size: 1rem;
  color: ${({ isDarkMode }) => (!isDarkMode ? '#7E8D6D' : '#ADCE8A')};
`;

export const IconContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 1.5rem;
`;
