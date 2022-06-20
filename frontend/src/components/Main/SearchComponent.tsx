import { useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import {
  SearchComponentContainer,
  SearchStageText,
  BottomButtons,
  NextStageButton,
  PrevStageButton,
} from "./SearchComponent.styles";

export default function SearchComponent() {
  const TOTALSTAGES = 4;

  const { isDarkMode } = useContext(ThemeContext);
  const [searchStage, setSearchStage] = useState<number>(1);

  const goToNextStage = () => {
    setSearchStage(searchStage + 1);
  };

  const goToPrevStage = () => {
    setSearchStage(searchStage - 1);
  };

  return (
    <SearchComponentContainer isDarkMode={isDarkMode}>
      <SearchStageText isDarkMode={isDarkMode}>
        {searchStage < TOTALSTAGES ? `${searchStage}단계` : "결과"}
      </SearchStageText>

      <BottomButtons>
        {searchStage > 1 ? (
          <PrevStageButton isDarkMode={isDarkMode} onClick={goToPrevStage}>
            {searchStage == TOTALSTAGES ? "뒤로가기" : "이전 단계"}
          </PrevStageButton>
        ) : null}
        {searchStage < TOTALSTAGES ? (
          <NextStageButton isDarkMode={isDarkMode} onClick={goToNextStage}>
            {searchStage + 1 === TOTALSTAGES ? "결과 보기" : "다음 단계"}
          </NextStageButton>
        ) : null}
      </BottomButtons>
    </SearchComponentContainer>
  );
}
