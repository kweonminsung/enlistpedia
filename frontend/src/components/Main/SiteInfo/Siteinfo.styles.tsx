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

export const IntoText = styled.div<{
  isDarkMode: boolean;
}>`
  margin-top: 8rem;
  text-align: center;
  color: ${({ isDarkMode }) => (!isDarkMode ? '#000000' : '#FFFFFF')};
  > h2 {
    > span {
      color: ${({ isDarkMode }) => (!isDarkMode ? '#7E8D6D' : '#ADCE8A')};
    }
  }
`;

export const CarouselContainer = styled.div`
  margin-top: 4rem;
  border-radius: 1rem;
  width: 80%;
  aspect-ratio: 5 / 3;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  overflow: hidden;
  @media (max-width: 600px) {
    width: 90%;
  }
  > div {
    transition: all 0.5s ease-in-out;
    display: flex;
    height: 100%;
    > div {
      height: 100%;
      aspect-ratio: 5 / 3;
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
`;

export const CounterConatiner = styled.div<{
  isDarkMode: boolean;
}>`
  display: flex;
  gap: 5rem;
  margin: 4rem 0 8rem 0;
  text-align: center;
  font-size: 1.2rem;
  color: ${({ isDarkMode }) => (!isDarkMode ? '#000000' : '#FFFFFF')};
  p {
    margin: 1rem 0;
  }
  p: first-of-type {
    color: ${({ isDarkMode }) => (!isDarkMode ? '#7E8D6D' : '#ADCE8A')};
    font-size: 2.5rem;
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
  font-size: 1rem;
  color: ${({ isDarkMode }) => (!isDarkMode ? '#7E8D6D' : '#ADCE8A')};
`;

export const IconContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 1.5rem;
`;
