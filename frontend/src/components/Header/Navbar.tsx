import { css } from "@emotion/css";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { NavbarContainer, LoginButton, ToggleButton } from "./Navbar.styles";

export default function Navbar() {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  const loginToggle = () => {
    console.log("로그인 시도");
  };

  return (
    <NavbarContainer>
      <LoginButton isDarkMode={isDarkMode} onClick={loginToggle}>
        로그인
      </LoginButton>
      <ToggleButton isDarkMode={isDarkMode} onClick={toggleDarkMode}>
        <svg
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={css`
            width: 32px;
            height: 32px;
            position: relative;
            left: -6px;
          `}
        >
          <path
            d="M21 29.3333C23.2101 29.3333 25.3298 28.4554 26.8926 26.8926C28.4554 25.3298 29.3333 23.2101 29.3333 21C29.3333 18.7899 28.4554 16.6703 26.8926 15.1074C25.3298 13.5446 23.2101 12.6667 21 12.6667V29.3333Z"
            fill={!isDarkMode ? "#7E8D6D" : "#ADCE8A"}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21 0.166672C9.49371 0.166672 0.166626 9.49376 0.166626 21C0.166626 32.5063 9.49371 41.8333 21 41.8333C32.5062 41.8333 41.8333 32.5063 41.8333 21C41.8333 9.49376 32.5062 0.166672 21 0.166672ZM21 4.33334V12.6667C18.7898 12.6667 16.6702 13.5446 15.1074 15.1074C13.5446 16.6703 12.6666 18.7899 12.6666 21C12.6666 23.2101 13.5446 25.3298 15.1074 26.8926C16.6702 28.4554 18.7898 29.3333 21 29.3333V37.6667C25.4202 37.6667 29.6595 35.9107 32.7851 32.7851C35.9107 29.6595 37.6666 25.4203 37.6666 21C37.6666 16.5797 35.9107 12.3405 32.7851 9.21489C29.6595 6.08929 25.4202 4.33334 21 4.33334Z"
            fill={!isDarkMode ? "#7E8D6D" : "#ADCE8A"}
          />
        </svg>
      </ToggleButton>
    </NavbarContainer>
  );
}
