import { SearchStepContainer } from '../SearchStepOne/SearchStepOne.styles';
import { ThemeContext } from '../../../context/ThemeContext';
import { useContext, useEffect, useRef, useState } from 'react';
import { EtcInput, ExtraInput, ExtraInputMain } from './SearchStepTwo.styles';
import { ExtraOption, EXTRAOPTIONBYORG, ExtraPoint } from './ExtraOption';
import { ExtraInputOption } from './ExtraInputOption';
import { SelectedPointContainer } from './SelectedPointContainer';

interface Props {
  selectedOrg: number;
  extraPoint: ExtraPoint[];
  setExtraPoint: React.Dispatch<React.SetStateAction<ExtraPoint[]>>;
}

export function SearchStepTwo({
  selectedOrg,
  extraPoint,
  setExtraPoint,
}: Props) {
  const { isDarkMode } = useContext(ThemeContext);

  const extraSelectRef = useRef<HTMLSelectElement>(null);

  const [selectedOption, setSelectedOption] = useState<ExtraOption>(
    EXTRAOPTIONBYORG[selectedOrg][0]
  );
  const [selectedPoint, setSelectedPoint] = useState<number>(
    selectedOption.score_list[0].score
  );

  const extraSelectChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(EXTRAOPTIONBYORG[selectedOrg][parseInt(e.target.value)]);
  };

  const addExtraPoint = () => {
    if (typeof selectedOption.specialty_id == 'number') {
      extraPoint.push({
        specialty_id: selectedOption.specialty_id,
        description: selectedOption.description,
        score: selectedPoint,
      });
      setExtraPoint(extraPoint);
    } else {
      (selectedOption.specialty_id as number[]).forEach((id: number) => {
        extraPoint.push({
          specialty_id: id,
          description: selectedOption.description,
          score: selectedPoint,
        });
        setExtraPoint(extraPoint);
      });
    }
    console.log(extraPoint);
  };

  useEffect(() => {
    if (extraSelectRef.current) {
      const extraSelectDiv = extraSelectRef.current as HTMLSelectElement;

      console.log(EXTRAOPTIONBYORG[selectedOrg]);
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

  return (
    <SearchStepContainer isDarkMode={isDarkMode}>
      <p>기타 정보를 입력해주십시오</p>

      <EtcInput isDarkMode={isDarkMode}>
        <div>고교 결석 일수</div>
        <input type="text" placeholder="일" />
        <div>헌혈 횟수</div>
        <input type="text" placeholder="회" />
        <div>봉사 시간</div>
        <input type="text" placeholder="시간" />
      </EtcInput>

      <p>추가 정보를 입력해주십시오</p>

      <SelectedPointContainer
        isDarkMode={isDarkMode}
        extraPoint={extraPoint}
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
