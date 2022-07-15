import axios from 'axios';
import { useState, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import {
  Certificate,
  Major,
  Specialty,
  SpecialtyRequest,
} from '../../typings/typings';
import {
  SearchComponentContainer,
  SearchStageText,
  BottomButtons,
  NextStageButton,
  PrevStageButton,
} from './SearchComponent.styles';
import SearchStepOne from './SearchStepOne/SearchStepOne';
import { EXTRAOPTIONBYORG, ExtraPoint } from './SearchStepTwo/ExtraOption';
import { SearchStepTwo } from './SearchStepTwo/SearchStepTwo';

export default function SearchComponent() {
  const TOTALSTAGES = 2;

  const { isDarkMode } = useContext(ThemeContext);
  const [searchStep, setSearchStep] = useState<number>(0);

  // Step One
  const [selectedOrg, setSelectedOrg] = useState<number>(0);
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [selectedCert, setSelectedCert] = useState<Certificate[]>([]);

  // Step Two
  const [absentDays, setAbsentDays] = useState<number>(0);
  const [bloodDontation, setBloodDonation] = useState<number>(0);
  const [volunteerTime, setVolunteerTime] = useState<number>(0);
  const [extraPoint, setExtraPoint] = useState<ExtraPoint[]>([]);

  const goToNextStep = () => {
    if (searchStep + 1 === TOTALSTAGES) {
      getResult();
    }
    setSearchStep(searchStep + 1);
  };

  const goToPrevStep = () => {
    setSearchStep(searchStep - 1);
  };

  const getResult = async () => {
    const parsedExtraPoint: {
      specialty_id: number;
      description: string;
      score: number;
    }[] = [];
    for (let extra of extraPoint) {
      const tempOption = EXTRAOPTIONBYORG[selectedOrg][extra.option_index];
      if (typeof tempOption.specialty_id === 'number') {
        parsedExtraPoint.push({
          specialty_id: tempOption.specialty_id as number,
          description: tempOption.description,
          score: tempOption.score_list[extra.score_index].score,
        });
      } else {
        for (let id of tempOption.specialty_id) {
          parsedExtraPoint.push({
            specialty_id: id,
            description: tempOption.description,
            score: tempOption.score_list[extra.score_index].score,
          });
        }
      }
    }

    const data: SpecialtyRequest = {
      military_type: [selectedOrg],
      major_id: selectedMajor ? selectedMajor.id : null,
      grade: selectedGrade,
      certificates_id: selectedCert.map(
        (certificate: Certificate) => certificate.id
      ),
      absent_days: absentDays,
      blood_donation: bloodDontation,
      volunteer_time: volunteerTime,
      extra_points: parsedExtraPoint,
    };

    const result: Specialty[] = await axios.post('/specialties', data);
    console.log(result);
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
