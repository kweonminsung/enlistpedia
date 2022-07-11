import { SearchStepContainer } from '../SearchStepOne/SearchStepOne.styles';
import { ThemeContext } from '../../../context/ThemeContext';
import { useContext, useRef } from 'react';
import {
  EtcInput,
  ExtraInput,
  ExtraInputMain,
  ExtraInputOption,
} from './SearchStepTwo.styles';

export function SearchStepTwo() {
  const { isDarkMode } = useContext(ThemeContext);

  const extraOptionRef = useRef(null);

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
      <ExtraInput isDarkMode={isDarkMode}>
        <ExtraInputMain>
          <select name="" id=""></select>
          <ExtraInputOption ref={extraOptionRef}></ExtraInputOption>
        </ExtraInputMain>
        <button>추가</button>
      </ExtraInput>
    </SearchStepContainer>
  );
}
