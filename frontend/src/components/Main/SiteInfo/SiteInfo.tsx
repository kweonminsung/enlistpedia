import {
  IconContainer,
  IconImage,
  SiteInfoBottomContainer,
  CarouselContainer,
  CounterConatiner,
  IntoText,
} from './Siteinfo.styles';
import { ThemeContext } from '../../../context/ThemeContext';
import { useContext, useEffect, useRef, useState } from 'react';
import useOnScreen from '../hooks/useOnScreen';
import CountUp from 'react-countup';
import axios from 'axios';
import { css } from '@emotion/css';

export default function SiteInfo() {
  const { isDarkMode } = useContext(ThemeContext);

  const explainRef: any = useRef<HTMLDivElement>(null);
  const onExplain: boolean = useOnScreen<HTMLDivElement>(explainRef, '-50px');

  const [count, setCount] = useState<number>(0);

  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async function () {
      setCount(await (await axios.get('hits')).data.count);
    })();

    setInterval(() => {
      goToNextCard();
    }, 5000);
  }, []);

  let cardIndex = 0;
  const CARDIMAGES: string[] = [
    '/images/intro1.png',
    'images/intro2.png',
    'images/intro3.png',
  ];

  const goToNextCard = () => {
    if (carouselRef.current === null) {
      return;
    }
    cardIndex = (cardIndex + 1 === CARDIMAGES.length ? -1 : cardIndex) + 1;
    carouselRef.current.style.transform = `translate3d(-${
      carouselRef.current.clientHeight * (5 / 3) * cardIndex
    }px, 0, 0)`;
  };

  return (
    <>
      <IntoText isDarkMode={isDarkMode}>
        <p>군입대를 고민하고 계신가요?</p>
        <h2>
          <span>입대백과</span>가 도와줄게요!
        </h2>
      </IntoText>

      <CarouselContainer>
        <div ref={carouselRef}>
          {CARDIMAGES.map((imageURL: string) => (
            <div
              className={css`
                background-image: url(${imageURL});
              `}
            ></div>
          ))}
        </div>
      </CarouselContainer>

      <CounterConatiner isDarkMode={isDarkMode} ref={explainRef}>
        <div>
          <p>
            {onExplain && <CountUp end={count} duration={0.75} prefix="+" />}
          </p>
          <p>총 검색 횟수</p>
        </div>
        <div>
          <p>{onExplain && <CountUp end={287} duration={0.75} />}</p>
          <p>검색 가능 특기 수</p>
        </div>
        <div>
          <p>{onExplain && <CountUp end={1259} duration={0.75} />}</p>
          <p>이전 회차 결과</p>
        </div>
      </CounterConatiner>

      <SiteInfoBottomContainer isDarkMode={isDarkMode}>
        <p>Developed with</p>
        <IconContainer>
          <a href="https://ko.reactjs.org/" target="_blank">
            <IconImage url="images/react.svg" round={false} />
          </a>
          <a href="https://fastapi.tiangolo.com/ko/" target="_blank">
            <IconImage url="images/fastapi.svg" round={false} />
          </a>
          <a href="https://www.docker.com/" target="_blank">
            <IconImage url="images/docker.svg" round={false} />
          </a>
        </IconContainer>

        <p>Developed by</p>
        <IconContainer>
          <a href="https://github.com/kweonminsung" target="_blank">
            <IconImage
              url="https://avatars.githubusercontent.com/u/79230043"
              round={true}
            />
          </a>
          <a href="https://github.com/Just4Study" target="_blank">
            <IconImage
              url="https://avatars.githubusercontent.com/u/48237469"
              round={true}
            />
          </a>
        </IconContainer>
      </SiteInfoBottomContainer>
    </>
  );
}
