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
import { SearchStepThree } from './SearchStepThree/SearchStepThree';
import { EXTRAOPTIONBYORG, ExtraPoint } from './SearchStepThree/ExtraOption';
import { SearchStepTwo } from './SearchStepTwo/SearchStepTwo';
import { COMMONOPTIONS } from './SearchStepTwo/CommonOption';

export default function SearchComponent() {
  const TOTALSTAGES = 3;

  const { isDarkMode } = useContext(ThemeContext);
  const [searchStep, setSearchStep] = useState<number>(0);

  // Step One
  const [selectedOrg, setSelectedOrg] = useState<number>(0);
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [selectedAttend, setSelectedAttend] = useState<number>(0);
  const [selectedCert, setSelectedCert] = useState<Certificate[]>([]);

  // Step Two
  const [absentDays, setAbsentDays] = useState<number>(0);
  const [commonPoint, setCommonPoint] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0,
  ]);

  // Step three
  const [extraPoint, setExtraPoint] = useState<ExtraPoint[]>([]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 400,
      behavior: 'smooth',
    });
  };

  const goToNextStep = () => {
    if (searchStep + 1 === TOTALSTAGES) {
      getResult();
    }
    setSearchStep(searchStep + 1);
    scrollToTop();
  };

  const goToPrevStep = () => {
    setSearchStep(searchStep - 1);
    scrollToTop();
  };

  const getResult = async () => {
    const parsedCommonPoint: {
      description: string;
      score: number;
    }[] = [];
    for (let i = 0; i < 7; i++) {
      const tempOption = COMMONOPTIONS[i];
      parsedCommonPoint.push({
        description: tempOption.description,
        score: tempOption.score_list[commonPoint[i]].score,
      });
    }

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
      military_type: selectedOrg,
      major_id: selectedMajor ? selectedMajor.id : null,
      grade: selectedMajor
        ? (selectedGrade - 1) * 2 + 1 + selectedAttend
        : null,
      certificates_id: selectedCert.map(
        (certificate: Certificate) => certificate.id
      ),
      absent_days: absentDays,
      common_points: parsedCommonPoint,
      extra_points: parsedExtraPoint,
    };
    console.log(data);
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
          selectedAttend={selectedAttend}
          setSelectedAttend={setSelectedAttend}
          selectedCert={selectedCert}
          setSelectedCert={setSelectedCert}
          extraPoint={extraPoint}
          setExtraPoint={setExtraPoint}
        />
      ) : searchStep === 1 ? (
        <SearchStepTwo
          absentDays={absentDays}
          setAbsentDays={setAbsentDays}
          commonPoint={commonPoint}
          setCommonPoint={setCommonPoint}
        ></SearchStepTwo>
      ) : searchStep === 2 ? (
        <SearchStepThree
          selectedOrg={selectedOrg}
          extraPoint={extraPoint}
          setExtraPoint={setExtraPoint}
        ></SearchStepThree>
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
