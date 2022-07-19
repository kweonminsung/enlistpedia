import { css } from '@emotion/css';
import { useRef, useState } from 'react';
import { Specialty } from '../../../typings/typings';
import { Chart } from 'react-chartjs-2';
import {
  AccordionContainer,
  AccordionHeader,
  AccordionContentWrapper,
  AccordionContent,
} from './Accordion,styles';

interface Props {
  isDarkMode: boolean;
  specialty: Specialty;
}

export function Accordion({ isDarkMode, specialty }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  const [isCollapse, setIsCollapse] = useState<boolean>(true);

  return (
    <AccordionContainer>
      <AccordionHeader
        isDarkMode={isDarkMode}
        onClick={() => {
          if (parentRef.current === null || childRef.current === null) {
            return;
          }
          if (!isCollapse) {
            setIsCollapse(!isCollapse);
            parentRef.current.style.height = '0';
            return;
          }
          setIsCollapse(!isCollapse);
          parentRef.current.style.height = `${childRef.current.clientHeight}px`;
        }}
        isCollapse={isCollapse}
      >
        <div>
          {specialty.military_type} / {specialty.specialty_type} /{' '}
          {specialty.name}
        </div>
        <div>{specialty.applicable ? '모집 중' : '모집 종료'}</div>
        <div>
          {specialty.my_tot_score && specialty.perfect_score
            ? `${specialty.my_tot_score} / ${specialty.perfect_score}`
            : '-'}
        </div>
        <svg
          width="15"
          height="9"
          viewBox="0 0 22 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={css`
            transform: rotate(${!isCollapse ? '0.5' : '0'}turn);
          `}
        >
          <path
            d="M1 1L11 11L21 1"
            stroke={!isDarkMode ? '#FFFFFF' : '#000000'}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </AccordionHeader>
      <AccordionContentWrapper isDarkMode={isDarkMode} ref={parentRef}>
        <AccordionContent ref={childRef}>
          {specialty.previous_score_list ? (
            specialty.previous_score_list.length !== 0 ? (
              <p>그래프</p>
            ) : (
              <p>이전 회차 결과 기록이 없습니다</p>
            )
          ) : (
            <p>이전 회차 결과 기록이 없습니다</p>
          )}
        </AccordionContent>
      </AccordionContentWrapper>
    </AccordionContainer>
  );
}
