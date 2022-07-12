import { ExtraPoint } from './ExtraOption';
import styled from '@emotion/styled';
import { ExtraInput } from './SearchStepTwo.styles';

const SelectedPoint = styled(ExtraInput)<{
  isDarkMode: boolean;
}>`
  width: 80%;
  margin: 1rem auto;
  > button {
    background-color: ${({ isDarkMode }) =>
      !isDarkMode ? '#ff0000' : '#ff0000'};
  }
`;

interface Props {
  isDarkMode: boolean;
  extraPoint: ExtraPoint[];
}

export function SelectedPointContainer({ isDarkMode, extraPoint }: Props) {
  return (
    <>
      {extraPoint.map(element => (
        <SelectedPoint isDarkMode={isDarkMode}>
          {element.description}
          {element.score}
          <button>삭제</button>
        </SelectedPoint>
      ))}
    </>
  );
}
