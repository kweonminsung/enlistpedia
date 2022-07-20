import { css } from '@emotion/css';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export default function Title() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div
      className={css`
        margin: 0 auto;
        margin-top: 4rem;
        width: 15rem;
        text-align: center;
        background-image: url('${!isDarkMode
          ? '/images/patternLight.png'
          : 'images/patternDark.png'}');
        background-size: cover;
        background-clip: text;
        color: transparent;
        transition: all 0.25s linear;
      `}
    >
      <h2
        className={css`
          font-size: 1.5rem;
        `}
      >
        군 선택도 현명하게
      </h2>
      <h1
        className={css`
          font-size: 3.5rem;
          margin-top: 0.6rem;
        `}
      >
        입대백과
      </h1>
    </div>
  );
}
