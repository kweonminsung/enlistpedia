/* eslint-disable no-restricted-globals */
import { useState, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { MainContainer } from './Main.styles';
import { SearchButton } from './Main.styles';
import SearchComponent from './SearchComponent';
import SiteInfo from './SiteInfo/SiteInfo';
import Footer from '../Footer/Footer';

export default function Main() {
  const { isDarkMode } = useContext(ThemeContext);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const searchToggle = () => {
    if (!isSearching)
      window.scrollTo({
        top: 400,
        behavior: 'smooth',
      });

    if (
      isSearching &&
      !confirm('창을 닫으면 결과가 사라집니다. 그래도 닫으시겠습니까?')
    ) {
      return;
    }
    setIsSearching(!isSearching);
  };

  return (
    <MainContainer>
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
