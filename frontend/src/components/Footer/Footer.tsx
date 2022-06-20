import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { FooterContainer } from "./Footer.styles";

export default function Footer() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <FooterContainer isDarkMode={isDarkMode}>
      <p>2022 국방 공공데이터 활용 경진대회 출품작</p>
      <p>Copyright @2022 꿈꾸는 개발자들 All rights reserved.</p>
    </FooterContainer>
  );
}
