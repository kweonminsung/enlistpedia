import { useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import SearchComponent from "./SearchComponent";
import SiteInfo from "./SiteInfo";

export default function Main() {
  const { isDarkMode } = useContext(ThemeContext);
  const [isSearching, setIsSearching] = useState(false);

  const searchToggle = () => {
    setIsSearching(!isSearching);
  };

  return (
    <>
      <button onClick={searchToggle}>찾아보기</button>
      {isSearching ? <SearchComponent /> : null}
      <SiteInfo />
    </>
  );
}
