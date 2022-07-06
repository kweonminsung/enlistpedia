import axios from 'axios';
import React, {
  HTMLAttributes,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import {
  OrganizationText,
  SearchStepContainer,
  SelectOrganization,
  MajorInput,
  GradeContainer,
  RecommendContainer,
  RemoveAllTextBtn,
  GradeText,
  CertificationInput,
} from './SearchStepOne.styles';

interface Major {
  id: number;
  name: string;
}

interface Certification {
  id: number;
  name: string;
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  selectedOrg: number;
  setSelectedOrg: React.Dispatch<React.SetStateAction<number>>;
  selectedMajor: number;
  setSelectedMajor: React.Dispatch<React.SetStateAction<number>>;
  selectedGrade: number;
  setSelectedGrade: React.Dispatch<React.SetStateAction<number>>;
  selectedCert: number;
  setSelectedCert: React.Dispatch<React.SetStateAction<number>>;
}

export default function SearchStepOne({
  selectedOrg,
  setSelectedOrg,
  selectedMajor,
  setSelectedMajor,
  selectedGrade,
  setSelectedGrade,
  selectedCert,
  setSelectedCert,
}: Props) {
  const { isDarkMode } = useContext(ThemeContext);

  const [majorList, setMajorList] = useState<Major[]>([]);
  const [majorName, setMajorName] = useState<string>('');
  const majorRecommendRef = useRef<HTMLDivElement>(null);

  const [certificationList, setCertificationList] = useState<Major[]>([]);
  const [certificationName, setCertificationName] = useState<string>('');
  const certificationRecommendRef = useRef<HTMLDivElement>(null);

  const majorInputRef = useRef<HTMLInputElement>(null);
  const certificationInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function getList() {
      setMajorList(await (await axios.get('/majors')).data);
      setCertificationList(await (await axios.get('/certifications')).data);
    }
    getList();
  }, []);

  const autoCompleteMajor = (e: React.ChangeEvent) => {
    if (majorRecommendRef.current) {
      const majorRecommendDiv = majorRecommendRef.current;
      const inputElement: HTMLInputElement = e.target as HTMLInputElement;

      majorRecommendDiv.innerHTML = '';
      if (inputElement.value === '') return;
      majorList
        .filter(
          (major: Major) =>
            major.name.match(`^.*${inputElement.value ?? ''}.*$`) !== null
        )
        .forEach(function (recommend: Major, index: number, array: Major[]) {
          const majorRecommendElement: HTMLParagraphElement =
            document.createElement('p');
          majorRecommendElement.addEventListener('click', () => {
            setMajorName(array[index].name);
            inputElement.value = array[index].name;
            majorRecommendDiv.innerHTML = '';
          });
          majorRecommendElement.innerText = `${recommend.name}`;
          majorRecommendDiv.append(majorRecommendElement);
        });
    }
  };

  const autoCompleteCertification = (e: React.ChangeEvent) => {
    if (certificationRecommendRef.current) {
      const certificationRecommendDiv = certificationRecommendRef.current;
      const inputElement: HTMLInputElement = e.target as HTMLInputElement;

      certificationRecommendDiv.innerHTML = '';
      if (inputElement.value === '') return;
      certificationList
        .filter(
          (certification: Certification) =>
            certification.name.match(`^.*${inputElement.value ?? ''}.*$`) !==
            null
        )
        .forEach(function (
          recommend: Certification,
          index: number,
          array: Major[]
        ) {
          const certificationRecommendElement: HTMLParagraphElement =
            document.createElement('p');
          certificationRecommendElement.addEventListener('click', () => {
            setMajorName(array[index].name);
            inputElement.value = array[index].name;
            certificationRecommendDiv.innerHTML = '';
          });
          certificationRecommendElement.innerText = `${recommend.name}`;
          certificationRecommendDiv.append(certificationRecommendElement);
        });
    }
  };

  const removeAllTextMajor = () => {
    if (majorInputRef.current && majorRecommendRef.current) {
      majorInputRef.current.value = '';
      majorRecommendRef.current.innerHTML = '';
    }
  };

  const removeAllTextCertification = () => {
    if (certificationInputRef.current && certificationRecommendRef.current) {
      certificationInputRef.current.value = '';
      certificationRecommendRef.current.innerHTML = '';
    }
  };

  return (
    <SearchStepContainer isDarkMode={isDarkMode}>
      <p>편제를 선택해주십시오</p>
      <SelectOrganization isDarkMode={isDarkMode}>
        <OrganizationText
          isDarkMode={isDarkMode}
          onClick={() => {
            setSelectedOrg(0);
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
            setSelectedOrg(1);
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
            setSelectedOrg(2);
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
            setSelectedOrg(3);
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
          >
            4학년+
          </GradeText>
        </GradeContainer>
      </MajorInput>
      <p>자격증 / 면허증을 입력해주십시오</p>
      <CertificationInput isDarkMode={isDarkMode}>
        <input
          type="text"
          placeholder="입력 / 해당 없음"
          onChange={autoCompleteCertification}
          ref={certificationInputRef}
        />
        <RemoveAllTextBtn
          isDarkMode={isDarkMode}
          onClick={removeAllTextCertification}
        >
          ×
        </RemoveAllTextBtn>
        <RecommendContainer
          isDarkMode={isDarkMode}
          ref={certificationRecommendRef}
        />
      </CertificationInput>
    </SearchStepContainer>
  );
}
