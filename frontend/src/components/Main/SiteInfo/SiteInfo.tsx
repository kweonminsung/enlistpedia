import {
  IconContainer,
  IconImage,
  SiteInfoBottomContainer,
  TempContainer,
} from './Siteinfo.styles';
import { ThemeContext } from '../../../context/ThemeContext';
import { useContext } from 'react';

export default function SiteInfo() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <>
      <TempContainer isDarkMode={isDarkMode}></TempContainer>
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
