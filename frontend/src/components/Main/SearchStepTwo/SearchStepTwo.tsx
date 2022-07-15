import { SearchStepContainer } from '../SearchStepOne/SearchStepOne.styles';
import { ThemeContext } from '../../../context/ThemeContext';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { EtcInput, ExtraInput, ExtraInputMain } from './SearchStepTwo.styles';
import { ExtraOption, EXTRAOPTIONBYORG, ExtraPoint } from './ExtraOption';
import { ExtraInputOption } from './ExtraInputOption';
import { SelectedPointContainer } from './SelectedPointContainer';

interface Props {
  selectedOrg: number;
  absentDays: number;
  setAbsentDays: React.Dispatch<React.SetStateAction<number>>;
  bloodDontation: number;
  setBloodDonation: React.Dispatch<React.SetStateAction<number>>;
  volunteerTime: number;
  setVolunteerTime: React.Dispatch<React.SetStateAction<number>>;
  extraPoint: ExtraPoint[];
  setExtraPoint: React.Dispatch<React.SetStateAction<ExtraPoint[]>>;
}

export function SearchStepTwo({
  selectedOrg,
  absentDays,
  setAbsentDays,
  bloodDontation,
  setBloodDonation,
  volunteerTime,
  setVolunteerTime,
  extraPoint,
  setExtraPoint,
}: Props) {
  const { isDarkMode } = useContext(ThemeContext);

  const absentDaysInputRef = useRef<HTMLInputElement>(null);
  const bloodDontationInputRef = useRef<HTMLInputElement>(null);
  const volunteerTimeInputRef = useRef<HTMLInputElement>(null);
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
    if (absentDaysInputRef.current && absentDays) {
      absentDaysInputRef.current.value = absentDays.toString();
    }
    if (bloodDontationInputRef.current && bloodDontation) {
      bloodDontationInputRef.current.value = bloodDontation.toString();
    }
    if (volunteerTimeInputRef.current && volunteerTime) {
      volunteerTimeInputRef.current.value = volunteerTime.toString();
    }
  }, []);

  const absentDayOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (absentDaysInputRef.current && parseInt(e.target.value) < 0) {
      alert('고교 결석 일수는 음수일 수 없습니다.');
      absentDaysInputRef.current.value = '';
      return;
    }
    if (e.target.value === null) {
      setAbsentDays(0);
      return;
    }
    setAbsentDays(parseInt(e.target.value));
  };

  const bloodDonationOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (bloodDontationInputRef.current && parseInt(e.target.value) < 0) {
      alert('헌혈 횟수는 음수일 수 없습니다.');
      bloodDontationInputRef.current.value = '';
      return;
    }
    if (e.target.value === null) {
      setBloodDonation(0);
      return;
    }
    setBloodDonation(parseInt(e.target.value));
  };

  const volunteerTimeOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (volunteerTimeInputRef.current && parseInt(e.target.value) < 0) {
      alert('봉사 시간은 음수일 수 없습니다.');
      volunteerTimeInputRef.current.value = '';
      return;
    }
    if (e.target.value === null) {
      setVolunteerTime(0);
      return;
    }
    setVolunteerTime(parseInt(e.target.value));
  };

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

  return (
    <SearchStepContainer isDarkMode={isDarkMode}>
      <p>기타 정보를 입력해주십시오</p>

      <EtcInput isDarkMode={isDarkMode}>
        <div>고교 결석 일수</div>
        <input
          type="number"
          min={0}
          placeholder="일"
          onChange={absentDayOnChange}
          ref={absentDaysInputRef}
        />
        <div>헌혈 횟수</div>
        <input
          type="number"
          min={0}
          placeholder="회"
          onChange={bloodDonationOnChange}
          ref={bloodDontationInputRef}
        />
        <div>봉사 시간</div>
        <input
          type="number"
          min={0}
          placeholder="시간"
          onChange={volunteerTimeOnChange}
          ref={volunteerTimeInputRef}
        />
      </EtcInput>

      <p>추가 정보를 입력해주십시오</p>

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
