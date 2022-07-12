import { ChangeEvent, useRef } from 'react';
import { ExtraOption } from './ExtraOption';

interface Props {
  selectedOption: ExtraOption;
  setSelectedPoint: React.Dispatch<React.SetStateAction<number>>;
}

export function ExtraInputOption({ selectedOption, setSelectedPoint }: Props) {
  const changePoint = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPoint(parseInt(e.target.value));
  };

  return (
    <select onChange={changePoint}>
      {selectedOption.score_list.map(
        (element: { option: string; score: number }, index: number) => (
          <option value={element.score}>{element.option}</option>
        )
      )}
    </select>
  );
}
