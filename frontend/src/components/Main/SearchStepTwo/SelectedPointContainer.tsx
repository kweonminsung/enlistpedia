import { EXTRAOPTIONBYORG, ExtraPoint } from './ExtraOption';
import styled from '@emotion/styled';
import { ExtraInput } from './SearchStepTwo.styles';
import { useReducer } from 'react';

const SelectedPoint = styled(ExtraInput)<{
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
  selectedOrg: number;
  extraPoint: ExtraPoint[];
  setExtraPoint: React.Dispatch<React.SetStateAction<ExtraPoint[]>>;
}

export function SelectedPointContainer({
  isDarkMode,
  selectedOrg,
  extraPoint,
  setExtraPoint,
}: Props) {
  // 강제 리렌더링
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  // 해당 추가 정보 입력을 배열에서 없애주는 함수
  const toggleDelete = (index: number) => {
    extraPoint.splice(
      extraPoint.findIndex((element: ExtraPoint) => element.index === index),
      1
    );
    setExtraPoint(extraPoint);
    forceUpdate();
  };

  return (
    <>
      {extraPoint.map((element: ExtraPoint) => (
        <SelectedPoint isDarkMode={isDarkMode}>
          <p>
            {EXTRAOPTIONBYORG[selectedOrg][element.option_index].description}
          </p>
          <p>
            {
              EXTRAOPTIONBYORG[selectedOrg][element.option_index].score_list[
                element.score_index
              ].option
            }
          </p>
          <button
            onClick={() => {
              toggleDelete(element.index);
            }}
          >
            삭제
          </button>
        </SelectedPoint>
      ))}
    </>
  );
}
