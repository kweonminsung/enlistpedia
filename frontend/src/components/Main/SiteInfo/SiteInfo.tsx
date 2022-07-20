import {
  IconContainer,
  IconImage,
  SiteInfoBottomContainer,
  TempContainer,
  CounterConatiner,
} from './Siteinfo.styles';
import { ThemeContext } from '../../../context/ThemeContext';
import { useContext, useEffect, useRef, useState } from 'react';
import useOnScreen from '../hooks/useOnScreen';
import CountUp from 'react-countup';
import axios from 'axios';

export default function SiteInfo() {
  const { isDarkMode } = useContext(ThemeContext);

  const explainRef: any = useRef<HTMLDivElement>();
  const onExplain: boolean = useOnScreen<HTMLDivElement>(explainRef, '-50px');

  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    (async function () {
      setCount(await (await axios.get('hits')).data.count);
    })();
  }, []);

  return (
    <>
      <TempContainer isDarkMode={isDarkMode}></TempContainer>

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
