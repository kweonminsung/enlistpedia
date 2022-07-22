import axios from 'axios';
import React, {
  HTMLAttributes,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import { Major, Certificate } from '../../../typings/typings';
import { ExtraPoint } from '../SearchStepThree/ExtraOption';
import {
  OrganizationText,
  SearchStepContainer,
  SelectOrganization,
  MajorInput,
  GradeContainer,
  RecommendContainer,
  RemoveAllTextBtn,
  GradeText,
  CertificateInput,
  AttendText,
} from './SearchStepOne.styles';
import { SelectedCertificateContainer } from './SelectedCertificateContainer';

interface Props extends HTMLAttributes<HTMLDivElement> {
  selectedOrg: number;
  setSelectedOrg: React.Dispatch<React.SetStateAction<number>>;
  selectedMajor: Major | null;
  setSelectedMajor: React.Dispatch<React.SetStateAction<Major | null>>;
  selectedGrade: number;
  setSelectedGrade: React.Dispatch<React.SetStateAction<number>>;
  selectedAttend: number;
  setSelectedAttend: React.Dispatch<React.SetStateAction<number>>;
  selectedCert: Certificate[];
  setSelectedCert: React.Dispatch<React.SetStateAction<Certificate[]>>;
  extraPoint: ExtraPoint[];
  setExtraPoint: React.Dispatch<React.SetStateAction<ExtraPoint[]>>;
}

export default function SearchStepOne({
  selectedOrg,
  setSelectedOrg,
  selectedMajor,
  setSelectedMajor,
  selectedGrade,
  setSelectedGrade,
  selectedAttend,
  setSelectedAttend,
  selectedCert,
  setSelectedCert,
  extraPoint,
  setExtraPoint,
}: Props) {
  const { isDarkMode } = useContext(ThemeContext);

  const majorRecommendRef = useRef<HTMLDivElement>(null);
  const certificateRecommendRef = useRef<HTMLDivElement>(null);

  const majorInputRef = useRef<HTMLInputElement>(null);
  const certificateInputRef = useRef<HTMLInputElement>(null);

  // 선택한 자격증을 임시 저장
  const [tempCert, setTempCert] = useState<Certificate | null>(null);

  // 강제 리렌더링
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  // 편제를 변경하는 함수(추가 정보를 입력한 이력이 있으면 삭제 여부를 물어봄)
  const toggleOrg = (orgNumber: number) => {
    if (extraPoint.length !== 0) {
      if (
        !window.confirm(
          '추가 정보 입력 기록이 있습니다. 편제를 바꾸면 입력한 추가 정보가 사라집니다. 계속하시겠습니까?'
        )
      ) {
        return;
      }
      setExtraPoint([]);
    }
    setSelectedOrg(orgNumber);
  };

  // 전공 자동 완성 관련 로직
  const autoCompleteMajor = async (e: React.ChangeEvent) => {
    if (majorRecommendRef.current === null) {
      return;
    }
    const majorRecommendDiv = majorRecommendRef.current;
    const inputElement: HTMLInputElement = e.target as HTMLInputElement;

    if (inputElement.value === '') return;

    const majorList = await (
      await axios.get(`/majors?match=${inputElement.value}`)
    ).data;

    majorRecommendDiv.innerHTML = '';

    majorList.forEach(function (
      recommend: Major,
      index: number,
      array: Major[]
    ) {
      const majorRecommendElement: HTMLParagraphElement =
        document.createElement('p');
      majorRecommendElement.addEventListener('click', () => {
        inputElement.value = array[index].name;
        setSelectedMajor(array[index]);

        majorRecommendDiv.innerHTML = '';
      });
      majorRecommendElement.innerText = `${recommend.name}`;
      majorRecommendDiv.append(majorRecommendElement);
    });
  };

  // 자격증 자동 완성 관련 로직
  const autoCompleteCertificate = async (e: React.ChangeEvent) => {
    if (certificateRecommendRef.current === null) {
      return;
    }
    const certificateRecommendDiv = certificateRecommendRef.current;
    const inputElement: HTMLInputElement = e.target as HTMLInputElement;

    if (inputElement.value === '') return;

    const certificateList = await (
      await axios.get(`/certificates?match=${inputElement.value}`)
    ).data;

    certificateRecommendDiv.innerHTML = '';

    certificateList.forEach(function (
      recommend: Certificate,
      index: number,
      array: Certificate[]
    ) {
      const certificateRecommendElement: HTMLParagraphElement =
        document.createElement('p');
      certificateRecommendElement.addEventListener('click', () => {
        inputElement.value = array[index].name;
        setTempCert(array[index]);
        certificateRecommendDiv.innerHTML = '';
      });
      certificateRecommendElement.innerText = `${recommend.name}`;
      certificateRecommendDiv.append(certificateRecommendElement);
    });
  };

  // 입력한 전공과 입력 추천 목록을 없애는 함수
  const removeAllTextMajor = () => {
    if (majorInputRef.current === null || majorRecommendRef.current === null) {
      return;
    }
    majorInputRef.current.value = '';
    majorRecommendRef.current.innerHTML = '';
    setSelectedMajor(null);
  };

  // 입력한 자격증과 입력 추천 목록을 없애는 함수
  const removeAllTextCertificate = () => {
    if (
      certificateInputRef.current === null ||
      certificateRecommendRef.current === null
    ) {
      return;
    }
    certificateInputRef.current.value = '';
    certificateRecommendRef.current.innerHTML = '';
    setTempCert(null);
  };

  // 입력한 자격증을 배열에 넣는 함수
  const addCertificate = () => {
    if (tempCert) {
      if (
        selectedCert.find((element: Certificate) => element.id === tempCert.id)
      ) {
        alert('같은 자격증을 여러 번 입력할 수 없습니다');
        return;
      }

      selectedCert.push({
        id: tempCert.id,
        name: tempCert.name,
      });
      setSelectedCert(selectedCert);
      removeAllTextCertificate();
      forceUpdate();
    } else {
      alert('자격증을 선택해주세요.');
    }
  };

  return (
    <SearchStepContainer isDarkMode={isDarkMode}>
      <p>편제를 선택해주십시오</p>
      <SelectOrganization isDarkMode={isDarkMode}>
        <OrganizationText
          isDarkMode={isDarkMode}
          onClick={() => {
            toggleOrg(0);
          }}
          orgNumber={0}
          selectedOrg={selectedOrg}
        >
          육군
          <p>Army</p>
        </OrganizationText>
        <OrganizationText
          isDarkMode={isDarkMode}
          onClick={() => {
            toggleOrg(1);
          }}
          orgNumber={1}
          selectedOrg={selectedOrg}
        >
          해군
          <p>Navy</p>
        </OrganizationText>
        <OrganizationText
          isDarkMode={isDarkMode}
          onClick={() => {
            toggleOrg(2);
          }}
          orgNumber={2}
          selectedOrg={selectedOrg}
        >
          공군
          <p>Air Force</p>
        </OrganizationText>
        <OrganizationText
          isDarkMode={isDarkMode}
          onClick={() => {
            toggleOrg(3);
          }}
          orgNumber={3}
          selectedOrg={selectedOrg}
        >
          해병대
          <p>Marine</p>
        </OrganizationText>
      </SelectOrganization>
      <p>대학교 전공과 학년을 입력해주십시오</p>
      <MajorInput isDarkMode={isDarkMode}>
        <input
          type="text"
          placeholder="입력 / 해당 없음"
          defaultValue={selectedMajor?.name}
          onChange={autoCompleteMajor}
          ref={majorInputRef}
        />
        <RemoveAllTextBtn isDarkMode={isDarkMode} onClick={removeAllTextMajor}>
          ×
        </RemoveAllTextBtn>
        <RecommendContainer isDarkMode={isDarkMode} ref={majorRecommendRef} />
        <GradeContainer>
          <GradeText
            isDarkMode={isDarkMode}
            onClick={() => {
              setSelectedGrade(1);
            }}
            grade={1}
            selectedGrade={selectedGrade}
            selectedMajor={selectedMajor}
            disabled={selectedMajor === null}
          >
            1학년
          </GradeText>
          <GradeText
            isDarkMode={isDarkMode}
            onClick={() => {
              setSelectedGrade(2);
            }}
            grade={2}
            selectedGrade={selectedGrade}
            selectedMajor={selectedMajor}
            disabled={selectedMajor === null}
          >
            2학년
          </GradeText>
          <GradeText
            isDarkMode={isDarkMode}
            onClick={() => {
              setSelectedGrade(3);
            }}
            grade={3}
            selectedGrade={selectedGrade}
            selectedMajor={selectedMajor}
            disabled={selectedMajor === null}
          >
            3학년
          </GradeText>
          <GradeText
            isDarkMode={isDarkMode}
            onClick={() => {
              setSelectedGrade(4);
            }}
            grade={4}
            selectedGrade={selectedGrade}
            selectedMajor={selectedMajor}
            disabled={selectedMajor === null}
          >
            4학년
          </GradeText>
        </GradeContainer>
        <GradeContainer>
          <AttendText
            isDarkMode={isDarkMode}
            onClick={() => {
              setSelectedAttend(0);
            }}
            attend={0}
            selectedAttend={selectedAttend}
            selectedMajor={selectedMajor}
            disabled={selectedMajor === null}
          >
            재학
          </AttendText>
          <AttendText
            isDarkMode={isDarkMode}
            onClick={() => {
              setSelectedAttend(1);
            }}
            attend={1}
            selectedAttend={selectedAttend}
            selectedMajor={selectedMajor}
            disabled={selectedMajor === null}
          >
            수료
          </AttendText>
        </GradeContainer>
      </MajorInput>
      <p>자격증 / 면허증을 입력해주십시오</p>

      <SelectedCertificateContainer
        isDarkMode={isDarkMode}
        selectedCert={selectedCert}
        setSelectedCert={setSelectedCert}
      ></SelectedCertificateContainer>

      <CertificateInput isDarkMode={isDarkMode}>
        <input
          type="text"
          placeholder="입력 / 해당 없음"
          onChange={autoCompleteCertificate}
          ref={certificateInputRef}
        />
        <RemoveAllTextBtn
          isDarkMode={isDarkMode}
          onClick={removeAllTextCertificate}
        >
          ×
        </RemoveAllTextBtn>
        <RecommendContainer
          isDarkMode={isDarkMode}
          ref={certificateRecommendRef}
        />
        <button onClick={addCertificate}>추가</button>
      </CertificateInput>
    </SearchStepContainer>
  );
}
