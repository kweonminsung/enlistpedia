import { useState, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import {
  SearchComponentContainer,
  SearchStageText,
  BottomButtons,
  NextStageButton,
  PrevStageButton,
} from './SearchComponent.styles';
import SearchStepOne from './SearchStepOne/SearchStepOne';

export default function SearchComponent() {
  const TOTALSTAGES = 4;

  const { isDarkMode } = useContext(ThemeContext);
  const [searchStep, setSearchStep] = useState<number>(0);

  // s
  const [selectedOrg, setSelectedOrg] = useState<number>(0);
  const [selectedMajor, setSelectedMajor] = useState<number>(0);
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [selectedCert, setSelectedCert] = useState<number>(0);

  const goToNextStep = () => {
    setSearchStep(searchStep + 1);
  };

  const goToPrevStep = () => {
    setSearchStep(searchStep - 1);
  };

  return (
    <SearchComponentContainer isDarkMode={isDarkMode}>
      <SearchStageText isDarkMode={isDarkMode}>
        {searchStep < TOTALSTAGES ? `${searchStep + 1}단계` : '결과'}
      </SearchStageText>

      {searchStep === 0 ? (
        <SearchStepOne
          selectedOrg={selectedOrg}
          setSelectedOrg={setSelectedOrg}
          selectedMajor={selectedMajor}
          setSelectedMajor={setSelectedMajor}
          selectedGrade={selectedGrade}
          setSelectedGrade={setSelectedGrade}
          selectedCert={selectedCert}
          setSelectedCert={setSelectedCert}
        />
      ) : null}

      <BottomButtons>
        {searchStep > 0 ? (
          <PrevStageButton isDarkMode={isDarkMode} onClick={goToPrevStep}>
            {searchStep == TOTALSTAGES ? '뒤로가기' : '이전 단계'}
          </PrevStageButton>
        ) : null}
        {searchStep < TOTALSTAGES ? (
          <NextStageButton isDarkMode={isDarkMode} onClick={goToNextStep}>
            {searchStep + 1 === TOTALSTAGES ? '결과 보기' : '다음 단계'}
          </NextStageButton>
        ) : null}
      </BottomButtons>
    </SearchComponentContainer>
  );
}
