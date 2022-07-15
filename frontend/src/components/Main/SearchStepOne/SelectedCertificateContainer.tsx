import styled from '@emotion/styled';
import { useReducer } from 'react';
import { Certificate } from '../../../typings/typings';
import { ExtraInput } from '../SearchStepTwo/SearchStepTwo.styles';

const SelectedCertificate = styled(ExtraInput)<{
  isDarkMode: boolean;
}>`
  width: 80%;
  margin: 1rem auto;
  font-size: 1rem;
  > p {
    margin: 0 auto;
    width: 80%;
    padding: 0.5rem;
    color: ${({ isDarkMode }) => (!isDarkMode ? '#3D3D3D' : '#FFFFFF')};
  }
  > p:first-of-type {
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
    background-color: ${({ isDarkMode }) =>
      !isDarkMode ? '#F0F0F0' : '#707070'};
  }
  > button {
    background-color: #f98b8b;
  }
`;

interface Props {
  isDarkMode: boolean;
  selectedCert: Certificate[];
  setSelectedCert: React.Dispatch<React.SetStateAction<Certificate[]>>;
}

export function SelectedCertificateContainer({
  isDarkMode,
  selectedCert,
  setSelectedCert,
}: Props) {
  // 강제 리렌더링
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  // 해당 추가 정보 입력을 배열에서 없애주는 함수
  const toggleDelete = (id: number) => {
    selectedCert.splice(
      selectedCert.findIndex((element: Certificate) => element.id === id),
      1
    );
    setSelectedCert(selectedCert);
    forceUpdate();
  };
  return (
    <>
      {selectedCert.map((element: Certificate) => (
        <SelectedCertificate isDarkMode={isDarkMode}>
          <p>{element.name}</p>
          <button
            onClick={() => {
              toggleDelete(element.id);
            }}
          >
            삭제
          </button>
        </SelectedCertificate>
      ))}
    </>
  );
}
