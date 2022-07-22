/* eslint-disable no-restricted-globals */
import { useState, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { MainContainer, StartArrowContainer } from './Main.styles';
import { SearchButton } from './Main.styles';
import SearchComponent from './SearchComponent';
import SiteInfo from './SiteInfo/SiteInfo';
import Footer from '../Footer/Footer';
import { css } from '@emotion/css';

export default function Main() {
  const { isDarkMode } = useContext(ThemeContext);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const searchToggle = () => {
    if (!isSearching) {
      window.scrollTo({
        top: 300,
        behavior: 'smooth',
      });
    } else {
      if (!confirm('창을 닫으면 결과가 사라집니다. 그래도 닫으시겠습니까?')) {
        return;
      }
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    setIsSearching(!isSearching);
  };

  return (
    <MainContainer>
      <StartArrowContainer isDarkMode={isDarkMode} isSearching={isSearching}>
        <svg height="32px" viewBox="0 0 32 32" width="32px">
          <path
            d="M24.285,11.284L16,19.571l-8.285-8.288c-0.395-0.395-1.034-0.395-1.429,0  c-0.394,0.395-0.394,1.035,0,1.43l8.999,9.002l0,0l0,0c0.394,0.395,1.034,0.395,1.428,0l8.999-9.002  c0.394-0.395,0.394-1.036,0-1.431C25.319,10.889,24.679,10.889,24.285,11.284z"
            fill={!isDarkMode ? '#7E8D6D' : '#ADCE8A'}
          />
        </svg>
      </StartArrowContainer>
      <SearchButton
        onClick={searchToggle}
        isDarkMode={isDarkMode}
        isSearching={isSearching}
      >
        시작하기
      </SearchButton>
      {isSearching ? <SearchComponent /> : null}
      <SiteInfo />
      <Footer />
    </MainContainer>
  );
}
