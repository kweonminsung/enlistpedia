import { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import { SearchStepContainer } from '../SearchStepOne/SearchStepOne.styles';
import { ExtraInputOption } from '../SearchStepTwo/ExtraInputOption';
import { ExtraOption, EXTRAOPTIONBYORG, ExtraPoint } from './ExtraOption';
import { ExtraInput, ExtraInputMain } from './SearchStepThree.styles';
import { SelectedPointContainer } from './SelectedPointContainer';

interface Props {
  selectedOrg: number;
  extraPoint: ExtraPoint[];
  setExtraPoint: React.Dispatch<React.SetStateAction<ExtraPoint[]>>;
}

export function SearchStepThree({
  selectedOrg,
  extraPoint,
  setExtraPoint,
}: Props) {
  const { isDarkMode } = useContext(ThemeContext);

  const extraSelectRef = useRef<HTMLSelectElement>(null);

  // 추가 정보의 유형을 저장
  const [selectedOption, setSelectedOption] = useState<ExtraOption>(
    EXTRAOPTIONBYORG[selectedOrg][0]
  );
  // 추가 정보의 점수 항목을 저장
  const [selectedPoint, setSelectedPoint] = useState<number>(
    selectedOption.score_list[0].index
  );

  const [extraIndex, setExtraIndex] = useState<number>(0);

  useEffect(() => {
    if (extraSelectRef.current) {
      const extraSelectDiv = extraSelectRef.current as HTMLSelectElement;

      extraSelectDiv.innerHTML = '';
      EXTRAOPTIONBYORG[selectedOrg].forEach(
        (option: ExtraOption, index: number) => {
          const tempOption: HTMLOptionElement =
            document.createElement('option');
          tempOption.value = index.toString();
          tempOption.innerText = option.description;
          extraSelectDiv.append(tempOption);
        }
      );
    }
  }, [selectedOrg]);

  // 추가 정보의 유형을 저장하는 함수
  const extraSelectChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(EXTRAOPTIONBYORG[selectedOrg][parseInt(e.target.value)]);
  };

  // 입력한 추가 정보를 배열에 넣는 함수
  const addExtraPoint = () => {
    if (
      extraPoint.find(
        (element: ExtraPoint) => element.option_index === selectedOption.index
      )
    ) {
      alert('같은 유형의 추가 정보를 여러 번 입력할 수 없습니다');
      return;
    }
    extraPoint.push({
      index: extraIndex,
      option_index: selectedOption.index,
      score_index: selectedPoint,
    });
    setExtraPoint(extraPoint);
    setExtraIndex(extraIndex + 1);
  };
  return (
    <SearchStepContainer isDarkMode={isDarkMode}>
      <p>추가 정보를 입력해주십시오</p>
      <h5>
        {selectedOrg === 0
          ? '육군'
          : selectedOrg === 1
          ? '해군'
          : selectedOrg === 2
          ? '공군'
          : '해병대'}
        에 해당하는 추가 정보입니다
      </h5>

      <SelectedPointContainer
        isDarkMode={isDarkMode}
        selectedOrg={selectedOrg}
        extraPoint={extraPoint}
        setExtraPoint={setExtraPoint}
      ></SelectedPointContainer>

      <ExtraInput isDarkMode={isDarkMode}>
        <ExtraInputMain isDarkMode={isDarkMode}>
          <select
            name=""
            id=""
            ref={extraSelectRef}
            onChange={extraSelectChanged}
          ></select>
          <ExtraInputOption
            selectedOption={selectedOption}
            setSelectedPoint={setSelectedPoint}
          ></ExtraInputOption>
        </ExtraInputMain>
        <button onClick={addExtraPoint}>추가</button>
      </ExtraInput>
    </SearchStepContainer>
  );
}
