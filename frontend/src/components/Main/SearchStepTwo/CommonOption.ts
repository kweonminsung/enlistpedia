export interface CommonOption {
  description: string;
  subDescription?: string;
  score_list: {
    index: number;
    option: string;
    score: number;
  }[];
}

export const COMMONOPTIONS: CommonOption[] = [
  {
    description: '사회봉사활동 시간',
    subDescription: '(최근 1년 이내)',
    score_list: [
      { index: 0, option: '0시간 ~ 7시간', score: 0 },
      { index: 1, option: '8시간 ~ 15시간', score: 1 },
      { index: 2, option: '16시간 ~ 23시간', score: 2 },
      { index: 3, option: '24시간 ~ 31시간', score: 3 },
      { index: 4, option: '32시간 ~ 39시간', score: 4 },
      { index: 5, option: '40시간 ~ 47시간', score: 5 },
      { index: 6, option: '48시간 ~ 55시간', score: 6 },
      { index: 7, option: '56시간 ~ 63시간', score: 7 },
      { index: 8, option: '64시간 이상', score: 8 },
    ],
  },
  {
    description: '헌혈 횟수',
    subDescription: '(최근 1년 이내)',
    score_list: [
      { index: 0, option: '0회', score: 0 },
      { index: 1, option: '1회', score: 1 },
      { index: 2, option: '2회', score: 2 },
      { index: 3, option: '3회', score: 3 },
      { index: 4, option: '4회', score: 4 },
      { index: 5, option: '5회', score: 5 },
      { index: 6, option: '6회', score: 6 },
      { index: 7, option: '7회', score: 7 },
      { index: 8, option: '8회', score: 8 },
    ],
  },
  {
    description: '국가유공자 자녀',
    score_list: [
      { index: 0, option: '해당 없음', score: 0 },
      { index: 1, option: '국가유공자 자녀', score: 4 },
      { index: 2, option: '독립유공자 자녀·손자', score: 4 },
    ],
  },
  {
    description: '다자녀 가정 자녀',
    score_list: [
      { index: 0, option: '해당 없음', score: 0 },
      { index: 1, option: '2명', score: 2 },
      { index: 2, option: '3명 이상', score: 4 },
    ],
  },
  {
    description: '병역 진로 설계 온라인 서비스 추천 특기 지원자',
    score_list: [
      { index: 0, option: '해당 없음', score: 0 },
      { index: 1, option: '해당', score: 1 },
    ],
  },
  {
    description: '국외이주자 중 현역병복무지원자',
    score_list: [
      { index: 0, option: '해당 없음', score: 0 },
      { index: 1, option: '해당', score: 4 },
    ],
  },
  {
    description: '질병 치유 자진 입대',
    score_list: [
      { index: 0, option: '해당 없음', score: 0 },
      { index: 1, option: '해당', score: 4 },
    ],
  },
];
