import { EXTRAOPTIONBYORG, ExtraPoint } from './ExtraOption';
import styled from '@emotion/styled';
import { ExtraInput } from './SearchStepTwo.styles';

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
}

export function SelectedPointContainer({
  isDarkMode,
  selectedOrg,
  extraPoint,
}: Props) {
  return (
    <>
      {extraPoint.map(element => (
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
          <button>삭제</button>
        </SelectedPoint>
      ))}
    </>
  );
}
