import axios from 'axios';
import React, {
  HTMLAttributes,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import { Major, Certificate } from '../../../typings/typings';
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
} from './SearchStepOne.styles';

interface Props extends HTMLAttributes<HTMLDivElement> {
  selectedOrg: number;
  setSelectedOrg: React.Dispatch<React.SetStateAction<number>>;
  selectedMajor: Major | null;
  setSelectedMajor: React.Dispatch<React.SetStateAction<Major | null>>;
  selectedGrade: number;
  setSelectedGrade: React.Dispatch<React.SetStateAction<number>>;
  selectedCert: Certificate | null;
  setSelectedCert: React.Dispatch<React.SetStateAction<Certificate | null>>;
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

  const majorRecommendRef = useRef<HTMLDivElement>(null);
  const certificateRecommendRef = useRef<HTMLDivElement>(null);

  const majorInputRef = useRef<HTMLInputElement>(null);
  const certificateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (majorInputRef.current && selectedMajor) {
      majorInputRef.current.value = selectedMajor.name;
    }
    if (certificateInputRef.current && selectedCert) {
      certificateInputRef.current.value = selectedCert.name;
    }
  }, []);

  const autoCompleteMajor = async (e: React.ChangeEvent) => {
    if (majorRecommendRef.current) {
      const majorRecommendDiv = majorRecommendRef.current;
      const inputElement: HTMLInputElement = e.target as HTMLInputElement;

      majorRecommendDiv.innerHTML = '';
      if (inputElement.value === '') return;

      const majorList = await (
        await axios.get(`/majors?match=${inputElement.value}`)
      ).data;

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
    }
  };

  const autoCompleteCertificate = async (e: React.ChangeEvent) => {
    if (certificateRecommendRef.current) {
      const certificateRecommendDiv = certificateRecommendRef.current;
      const inputElement: HTMLInputElement = e.target as HTMLInputElement;

      certificateRecommendDiv.innerHTML = '';
      if (inputElement.value === '') return;

      const certificateList = await (
        await axios.get(`/certificates?match=${inputElement.value}`)
      ).data;

      certificateList.forEach(function (
        recommend: Certificate,
        index: number,
        array: Certificate[]
      ) {
        const certificateRecommendElement: HTMLParagraphElement =
          document.createElement('p');
        certificateRecommendElement.addEventListener('click', () => {
          inputElement.value = array[index].name;
          setSelectedCert(array[index]);
          certificateRecommendDiv.innerHTML = '';
        });
        certificateRecommendElement.innerText = `${recommend.name}`;
        certificateRecommendDiv.append(certificateRecommendElement);
      });
    }
  };

  const removeAllTextMajor = () => {
    if (majorInputRef.current && majorRecommendRef.current) {
      majorInputRef.current.value = '';
      majorRecommendRef.current.innerHTML = '';
      setSelectedMajor(null);
    }
  };

  const removeAllTextCertificate = () => {
    if (certificateInputRef.current && certificateRecommendRef.current) {
      certificateInputRef.current.value = '';
      certificateRecommendRef.current.innerHTML = '';
      setSelectedCert(null);
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
            4학년+
          </GradeText>
        </GradeContainer>
      </MajorInput>
      <p>자격증 / 면허증을 입력해주십시오</p>
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
      </CertificateInput>
    </SearchStepContainer>
  );
}
