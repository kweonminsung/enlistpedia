import { SearchStepContainer } from '../SearchStepOne/SearchStepOne.styles';
import { ThemeContext } from '../../../context/ThemeContext';
import { ChangeEvent, useContext } from 'react';
import { EtcInput, EtcInputMore } from './SearchStepTwo.styles';
import { COMMONOPTIONS } from './CommonOption';

interface Props {
  absentDays: number;
  setAbsentDays: React.Dispatch<React.SetStateAction<number>>;
  commonPoint: number[];
  setCommonPoint: React.Dispatch<React.SetStateAction<number[]>>;
}

export function SearchStepTwo({
  absentDays,
  setAbsentDays,
  commonPoint,
  setCommonPoint,
}: Props) {
  const { isDarkMode } = useContext(ThemeContext);

  const absentDayOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value) < 0) {
      alert('고교 결석 일수는 음수일 수 없습니다.');
      e.target.value = '';
      return;
    }
    if (e.target.value === null) {
      setAbsentDays(0);
      return;
    }
    setAbsentDays(parseInt(e.target.value));
  };

  const commonPointOnChange = (
    e: ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    commonPoint[index] = parseInt(e.target.value);
    setCommonPoint(commonPoint);
  };

  return (
    <SearchStepContainer isDarkMode={isDarkMode}>
      <p>기타 정보를 입력해주십시오</p>

      <EtcInput isDarkMode={isDarkMode}>
        <div>고교 결석 일수</div>
        <input
          type="number"
          defaultValue={absentDays}
          min={0}
          placeholder="일"
          onChange={absentDayOnChange}
        />
        {commonPoint.slice(0, 4).map((element, index: number) => (
          <>
            <div>
              {COMMONOPTIONS[index].description}
              {COMMONOPTIONS[index].subDescription ? (
                <div>{COMMONOPTIONS[index].subDescription}</div>
              ) : null}
            </div>
            <select
              defaultValue={commonPoint[index]}
              onChange={e => {
                commonPointOnChange(e, index);
              }}
            >
              {COMMONOPTIONS[index].score_list.map((option, i: number) => (
                <option value={i}>{option.option}</option>
              ))}
            </select>
          </>
        ))}
      </EtcInput>

      <EtcInputMore isDarkMode={isDarkMode}>
        {commonPoint.slice(4, 7).map((element, index: number) => (
          <>
            <p>{COMMONOPTIONS[index + 4].description}</p>
            <select
              defaultValue={commonPoint[index + 4]}
              onChange={e => {
                commonPointOnChange(e, index + 4);
              }}
            >
              {COMMONOPTIONS[index + 4].score_list.map((option, i: number) => (
                <option value={i}>{option.option}</option>
              ))}
            </select>
          </>
        ))}
      </EtcInputMore>
    </SearchStepContainer>
  );
}
