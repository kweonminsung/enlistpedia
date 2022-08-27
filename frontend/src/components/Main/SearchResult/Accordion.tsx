import { css } from '@emotion/css';
import { useRef, useState } from 'react';
import { ScoreData, Specialty } from '../../../typings/typings';
import Chart from 'react-apexcharts';
import {
  AccordionContainer,
  AccordionHeader,
  AccordionContentWrapper,
  AccordionContent,
  ScoreTable,
  SpecificScoreTable,
  GoToInfo,
} from './Accordion.styles';

interface Props {
  isDarkMode: boolean;
  specialty: Specialty;
}

export function Accordion({ isDarkMode, specialty }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  const [isCollapse, setIsCollapse] = useState<boolean>(true);

  const applyOnClick = () => {
    window.open(specialty.info_url);
  };

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
        <div
          className={css`
            color: ${specialty.applicable ? '#F98B8B' : ''};
          `}
        >
          {specialty.applicable ? '모집 중' : '모집 종료'}
        </div>
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
          {specialty.score_data ? (
            <>
              <ScoreTable isDarkMode={isDarkMode}>
                <div>
                  <div>총점</div>
                  <div>전공</div>
                  <div>고교 출석</div>
                  <div>자격증 / 면허</div>
                  <div>가산점</div>
                </div>
                <div>
                  <div>
                    {specialty.my_tot_score} / {specialty.perfect_score}
                  </div>
                  <div>
                    {specialty.score_data.find(
                      score => score.article === '전공'
                    )
                      ? `${
                          (
                            specialty.score_data.find(
                              score => score.article === '전공'
                            ) as ScoreData
                          ).score
                        } / ${
                          (
                            specialty.score_data.find(
                              score => score.article === '전공'
                            ) as ScoreData
                          ).perfect_score
                        }`
                      : '-'}
                  </div>
                  <div>
                    {specialty.score_data.find(
                      score => score.article === '고교 출결사항'
                    )
                      ? `${
                          (
                            specialty.score_data.find(
                              score => score.article === '고교 출결사항'
                            ) as ScoreData
                          ).score
                        } / ${
                          (
                            specialty.score_data.find(
                              score => score.article === '고교 출결사항'
                            ) as ScoreData
                          ).perfect_score
                        }`
                      : '-'}
                  </div>
                  <div>
                    {specialty.score_data.find(
                      score => score.article === '자격증/면허'
                    )
                      ? `${
                          (
                            specialty.score_data.find(
                              score => score.article === '자격증/면허'
                            ) as ScoreData
                          ).score
                        } / ${
                          (
                            specialty.score_data.find(
                              score => score.article === '자격증/면허'
                            ) as ScoreData
                          ).perfect_score
                        }`
                      : '-'}
                  </div>
                  {specialty.score_data.filter(
                    score => score.article === '가산점'
                  ) !== [] ? (
                    <div>
                      {specialty.score_data
                        .filter(score => score.article === '가산점')
                        .reduce(
                          (previousValue, currentValue) =>
                            previousValue + currentValue.score,
                          0
                        )}{' '}
                      / 15
                    </div>
                  ) : (
                    <div> 0 / 15</div>
                  )}
                </div>
              </ScoreTable>

              <p>세부 점수 내역</p>
              <SpecificScoreTable isDarkMode={isDarkMode}>
                <div>
                  <div>항목</div>
                  <div>내용</div>
                  <div>내 점수</div>
                  <div>만점</div>
                </div>
                {specialty.score_data.map(score => (
                  <div>
                    <div>{score.article}</div>
                    <div>{score.description}</div>
                    <div>{score.score}</div>
                    <div>{score.perfect_score}</div>
                  </div>
                ))}
              </SpecificScoreTable>
            </>
          ) : (
            <>
              <p>점수 환산 데이터가 없습니다</p>
              <h5>(전문특기병은 점수 환산 데이터를 제공하지 않습니다)</h5>
            </>
          )}

          {specialty.recruit_results ? (
            specialty.recruit_results.length !== 0 ? (
              <>
                <p>이전 회차 합격 점수</p>
                <Chart
                  className={css`
                    margin: 0 auto;
                    width: 80%;
                    @media (max-width: 600px) {
                      width: 100%;
                    }
                  `}
                  options={{
                    chart: {
                      toolbar: {
                        show: false,
                      },
                      zoom: {
                        enabled: false,
                      },
                      parentHeightOffset: 0,
                    },
                    xaxis: {
                      categories: specialty.recruit_results.map(result =>
                        result.enlist_date.split('-').join(' ')
                      ),
                      labels: {
                        style: {
                          colors: !isDarkMode ? '#7E8D6D' : '#ADCE8A',
                        },
                      },
                    },
                    yaxis: {
                      labels: {
                        style: {
                          colors: !isDarkMode ? '#7E8D6D' : '#ADCE8A',
                        },
                      },
                    },
                    colors: [!isDarkMode ? '#7E8D6D' : '#ADCE8A'],
                    dataLabels: {
                      enabled: true,
                    },
                    tooltip: {
                      enabled: false,
                    },
                    grid: {
                      padding: {
                        left: 20,
                        right: 20,
                      },
                    },
                    stroke: {
                      width: 3,
                      curve: 'smooth',
                    },
                  }}
                  series={[
                    {
                      data: specialty.recruit_results.map(
                        result => result.min_score
                      ),
                    },
                  ]}
                  type="line"
                />
              </>
            ) : null
          ) : null}

          <GoToInfo onClick={applyOnClick}>더 알아보기</GoToInfo>
        </AccordionContent>
      </AccordionContentWrapper>
    </AccordionContainer>
  );
}
