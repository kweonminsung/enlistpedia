import styled from '@emotion/styled';
import { Major } from '../../../typings/typings';

export const SearchStepContainer = styled.div<{
  isDarkMode: boolean;
}>`
  width: 90%;
  text-align: center;
  color: ${({ isDarkMode }) => (!isDarkMode ? '#7E8D6D' : '#ADCE8A')};
  font-size: 1.2rem;
  > p {
    margin-top: 2.5rem;
  }
`;

export const SearchStepInput = styled.div<{ isDarkMode: boolean }>`
  margin-top: 1.2rem;
  padding: 1.5rem 0;
  border-radius: 1rem;
  width: 100%;
  background-color: ${({ isDarkMode }) =>
    !isDarkMode ? '#FFFFFF' : '#3D3D3D'};
  transition: all 0.25s linear;
`;

export const SelectOrganization = styled(SearchStepInput)<{
  isDarkMode: boolean;
}>`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const OrganizationText = styled.button<{
  isDarkMode: boolean;
  orgNumber: number;
  selectedOrg: number;
}>`
  background-color: transparent;
  font-weight: 700;
  font-size: 1.7rem;
  color: ${({ isDarkMode, orgNumber, selectedOrg }) =>
    orgNumber === selectedOrg
      ? !isDarkMode
        ? '#7E8D6D'
        : '#ADCE8A'
      : !isDarkMode
      ? '#000000'
      : '#FFFFFF'};
  transition: all 0.125s linear;
  p {
    margin: 0;
    font-size: 0.8rem;
  }
`;

export const MajorInput = styled(SearchStepInput)<{
  isDarkMode: boolean;
}>`
  input {
    position: relative;
    left: 0.5rem;
    width: 15rem;
    background-color: transparent;
    padding: 0.5rem 1rem;
    border-bottom: 2px solid
      ${({ isDarkMode }) => (!isDarkMode ? '#7E8D6D' : '#ADCE8A')};
    text-align: center;
    font-size: 1rem;
    color: ${({ isDarkMode }) => (!isDarkMode ? '#909090' : '#A0A0A0')};
    caret-color: ${({ isDarkMode }) => (!isDarkMode ? '#7E8D6D' : '#ADCE8A')};
  }
`;

export const RecommendContainer = styled.div<{
  isDarkMode: boolean;
}>`
  position: absolute;
  left: calc(50% - 8.5rem);
  border-radius: 0 0 1rem 1rem;
  max-height: 20rem;
  overflow-y: auto;
  width: 17rem;
  background-color: ${({ isDarkMode }) =>
    !isDarkMode ? '#FFFFFF' : '#3D3D3D'};
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
    rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
    rgba(0, 0, 0, 0.09) 0px 32px 16px;
  z-index: 10;
  p {
    font-size: 0.8rem;
    cursor: pointer;
  }
`;

export const RemoveAllTextBtn = styled.button<{
  isDarkMode: boolean;
}>`
  position: relative;
  top: 1px;
  right: 1rem;
  font-size: 1rem;
  text-align: center;
  color: ${({ isDarkMode }) => (!isDarkMode ? '#7E8D6D' : '#ADCE8A')};
  background-color: transparent;
`;

export const GradeContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1.5rem;
`;

export const GradeText = styled.button<{
  isDarkMode: boolean;
  grade: number;
  selectedGrade: number;
  selectedMajor: Major | null;
}>`
  background-color: transparent;
  font-weight: 700;
  font-size: 1rem;
  color: ${({ isDarkMode, grade, selectedGrade, selectedMajor }) =>
    selectedMajor
      ? grade === selectedGrade
        ? !isDarkMode
          ? '#7E8D6D'
          : '#ADCE8A'
        : !isDarkMode
        ? '#000000'
        : '#FFFFFF'
      : '#909090'};
  transition: all 0.125s linear;
`;

export const CertificateInput = styled(SearchStepInput)<{
  isDarkMode: boolean;
}>`
  width: 90%;
  margin: 0 auto;
  padding: 1rem 0 0 0;
  overflow: hidden;
  > input {
    position: relative;
    left: 0.5rem;
    width: 15rem;
    background-color: transparent;
    padding: 0.5rem 1rem;
    border-bottom: 2px solid
      ${({ isDarkMode }) => (!isDarkMode ? '#7E8D6D' : '#ADCE8A')};
    text-align: center;
    font-size: 1rem;
    color: ${({ isDarkMode }) => (!isDarkMode ? '#909090' : '#A0A0A0')};
    caret-color: ${({ isDarkMode }) => (!isDarkMode ? '#7E8D6D' : '#ADCE8A')};
  }
  > button:nth-of-type(2) {
    width: 100%;
    margin: 0.8rem 0 0 0;
    padding: 0.5rem;
    background-color: ${({ isDarkMode }) =>
      !isDarkMode ? '#7E8D6D' : '#ADCE8A'};
    color: ${({ isDarkMode }) => (!isDarkMode ? '#FFFFFF' : '#3D3D3D')};
    font-size: 1rem;
  }
`;
