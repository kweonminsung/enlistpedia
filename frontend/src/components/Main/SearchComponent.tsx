import { useState, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { Certificate, Major } from '../../typings/typings';
import {
  SearchComponentContainer,
  SearchStageText,
  BottomButtons,
  NextStageButton,
  PrevStageButton,
} from './SearchComponent.styles';
import SearchStepOne from './SearchStepOne/SearchStepOne';
import { ExtraPoint } from './SearchStepTwo/ExtraOption';
import { SearchStepTwo } from './SearchStepTwo/SearchStepTwo';

export default function SearchComponent() {
  const TOTALSTAGES = 2;

  const { isDarkMode } = useContext(ThemeContext);
  const [searchStep, setSearchStep] = useState<number>(0);

  // Step One
  const [selectedOrg, setSelectedOrg] = useState<number>(0);
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // Step Two
  const [absentDays, setAbsentDays] = useState<number>(0);
  const [bloodDontation, setBloodDonation] = useState<number>(0);
  const [volunteerTime, setVolunteerTime] = useState<number>(0);
  const [extraPoint, setExtraPoint] = useState<ExtraPoint[]>([]);

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
          extraPoint={extraPoint}
          setExtraPoint={setExtraPoint}
        />
      ) : searchStep === 1 ? (
        <SearchStepTwo
          selectedOrg={selectedOrg}
          absentDays={absentDays}
          setAbsentDays={setAbsentDays}
          bloodDontation={bloodDontation}
          setBloodDonation={setBloodDonation}
          volunteerTime={volunteerTime}
          setVolunteerTime={setVolunteerTime}
          extraPoint={extraPoint}
          setExtraPoint={setExtraPoint}
        ></SearchStepTwo>
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
