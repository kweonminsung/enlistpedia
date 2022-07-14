export interface ExtraPoint {
  option_index: number;
  score_index: number;
}

export interface ExtraOption {
  index: number;
  specialty_id: number | number[];
  description: string;
  score_list: {
    index: number;
    option: string;
    score: number;
  }[];
}

export const EXTRAOPTIONBYORG: ExtraOption[][] = [
  [
    {
      index: 0,
      specialty_id: -1,
      description: '국가 / 독립 유공자 자녀',
      score_list: [
        { index: 0, option: '국가유공자 자녀', score: 4 },
        { index: 1, option: '독립유공자 자녀', score: 4 },
      ],
    },
    {
      index: 1,
      specialty_id: -1,
      description: '다자녀 가정 자녀',
      score_list: [
        { index: 0, option: '2명', score: 2 },
        { index: 1, option: '3명 이상', score: 4 },
      ],
    },
    {
      index: 2,
      specialty_id: -1,
      description: '모집특기 관련 근무 경력자(법인)',
      score_list: [
        { index: 0, option: '6개월 ~ 1년 미만', score: 1 },
        { index: 1, option: '1년 ~ 2년 미만', score: 2 },
        { index: 2, option: '2년 이상', score: 3 },
      ],
    },
    {
      index: 3,
      specialty_id: -1,
      description: '모집특기 관련 근무 경력자(개인 업체)',
      score_list: [
        { index: 0, option: '1년 ~ 2년 미만', score: 1 },
        { index: 1, option: '2년 ~ 4년 미만', score: 2 },
        { index: 2, option: '4년 이상', score: 3 },
      ],
    },
    {
      index: 4,
      specialty_id: -1,
      description: '병역 진로 설계 온라인 서비스 추천 특기 지원자',
      score_list: [{ index: 0, option: '해당', score: 1 }],
    },
    {
      index: 5,
      specialty_id: -1,
      description: '국외이주자 둥 현역병 복무 지원자',
      score_list: [{ index: 0, option: '해당', score: 4 }],
    },
    {
      index: 6,
      specialty_id: -1,
      description:
        '질병 치료에 따른 병역 처분 변경으로 현역병 입영 대상 판정자',
      score_list: [{ index: 0, option: '해당', score: 4 }],
    },
    {
      index: 7,
      specialty_id: [84, 143, 7, 39],
      description: '군 운전적성정밀검사 합격자',
      score_list: [{ index: 0, option: '해당', score: 4 }],
    },
  ],
  [
    {
      index: 0,
      specialty_id: -2,
      description: '국가 / 독립 유공자 자녀',
      score_list: [
        { index: 0, option: '국가유공자 자녀', score: 4 },
        { index: 1, option: '독립유공자 자녀', score: 4 },
      ],
    },
    {
      index: 1,
      specialty_id: -2,
      description: '다자녀 가정 자녀',
      score_list: [
        { index: 0, option: '2명', score: 2 },
        { index: 1, option: '3명 이상', score: 4 },
      ],
    },
    {
      index: 2,
      specialty_id: -2,
      description: '잠수기능사',
      score_list: [
        { index: 0, option: '잠수기능사', score: 5 },
        { index: 1, option: '잠수기능사보', score: 5 },
      ],
    },
    {
      index: 3,
      specialty_id: -2,
      description: '병역 진로 설계 온라인 서비스 추천 특기 지원자',
      score_list: [{ index: 0, option: '해당', score: 1 }],
    },
    {
      index: 4,
      specialty_id: -2,
      description: '인명구조 관련 자격증 소지자',
      score_list: [{ index: 0, option: '해당', score: 2.5 }],
    },
    {
      index: 5,
      specialty_id: -2,
      description: '잠수 관련 자격증 소지자',
      score_list: [{ index: 0, option: '해당', score: 2.5 }],
    },
    {
      index: 6,
      specialty_id: -2,
      description: '국외이주자 둥 현역병 복무 지원자',
      score_list: [{ index: 0, option: '해당', score: 4 }],
    },
    {
      index: 7,
      specialty_id: -2,
      description: '질병치유 자원병역 이행자',
      score_list: [{ index: 0, option: '해당', score: 4 }],
    },
    {
      index: 8,
      specialty_id: -2,
      description: '수상 안전 강사',
      score_list: [{ index: 0, option: '해당', score: 5 }],
    },
  ],
  [
    {
      index: 0,
      specialty_id: -3,
      description: '국가 / 독립 유공자 자녀',
      score_list: [
        { index: 0, option: '국가유공자 자녀', score: 4 },
        { index: 1, option: '독립유공자 자녀', score: 4 },
      ],
    },
    {
      index: 1,
      specialty_id: -3,
      description: '다자녀 가정 자녀',
      score_list: [
        { index: 0, option: '2명', score: 2 },
        { index: 1, option: '3명 이상', score: 4 },
      ],
    },
    {
      index: 2,
      specialty_id: -3,
      description: '공인 영어 성적',
      score_list: [
        {
          index: 0,
          option: 'TOEIC 520 ~ 729 또는 TOFEL 59 ~ 81 또는 TEPS 201 ~ 276',
          score: 1,
        },
        {
          index: 1,
          option: 'TOEIC 730 이상 또는 TOFEL 82 이상 또는 TEPS 277 이상',
          score: 2,
        },
      ],
    },
    {
      index: 3,
      specialty_id: -3,
      description: '한국어능력검정(KBS)',
      score_list: [
        {
          index: 0,
          option: '3 ~ 4 급',
          score: 1,
        },
        {
          index: 1,
          option: '1 ~ 2 급',
          score: 2,
        },
      ],
    },
    {
      index: 4,
      specialty_id: -3,
      description: '한국사능력검정(국사편찬위원회)',
      score_list: [
        {
          index: 0,
          option: '3 ~ 4 급',
          score: 1,
        },
        {
          index: 1,
          option: '1 ~ 2 급',
          score: 2,
        },
      ],
    },
    {
      index: 5,
      specialty_id: -3,
      description: '병역 진로 설계 온라인 서비스 추천 특기 지원자',
      score_list: [{ index: 0, option: '해당', score: 1 }],
    },
    {
      index: 6,
      specialty_id: -3,
      description: '국외이주자 둥 현역병 복무 지원자',
      score_list: [{ index: 0, option: '해당', score: 4 }],
    },
    {
      index: 7,
      specialty_id: -3,
      description: '질병 치유 자진 입대',
      score_list: [{ index: 0, option: '해당', score: 4 }],
    },
    {
      index: 8,
      specialty_id: [282],
      description: '지정특기병(방공포·조리·군사 경찰 특기 희망)',
      score_list: [{ index: 0, option: '해당', score: 4 }],
    },
    {
      index: 9,
      specialty_id: [258],
      description: '2종 보통 이상(오토 제외) 운전 면허 소지자',
      score_list: [{ index: 0, option: '해당', score: 4 }],
    },
    {
      index: 10,
      specialty_id: [251],
      description: '지정 특기(항공기 기체정비/기관정비)희망',
      score_list: [
        { index: 0, option: '항공정비기초인력인증서 소지자', score: 4 },
        { index: 1, option: '항공정비사 소지자', score: 4 },
      ],
    },
    {
      index: 11,
      specialty_id: [257],
      description: '지정 특기(항공전자장비정비)희망',
      score_list: [
        { index: 0, option: '항공정비기초인력인증서 소지자', score: 4 },
        { index: 1, option: '항공정비사 소지자', score: 4 },
      ],
    },
  ],
  [
    {
      index: 0,
      specialty_id: -4,
      description: '국가 / 독립 유공자 자녀',
      score_list: [
        { index: 0, option: '국가유공자 자녀', score: 4 },
        { index: 1, option: '독립유공자 자녀', score: 4 },
      ],
    },
    {
      index: 1,
      specialty_id: -4,
      description: '다자녀 가정 자녀',
      score_list: [
        { index: 0, option: '2명', score: 2 },
        { index: 1, option: '3명 이상', score: 4 },
      ],
    },
    {
      index: 2,
      specialty_id: -4,
      description: '무도 유단자',
      score_list: [
        { index: 0, option: '1 ~ 2 단', score: 2 },
        { index: 1, option: '3단 이상', score: 5 },
      ],
    },
    {
      index: 3,
      specialty_id: -4,
      description: '병역 진로 설계 온라인 서비스 추천 특기 지원자',
      score_list: [{ index: 0, option: '해당', score: 1 }],
    },
    {
      index: 4,
      specialty_id: -4,
      description: '국외이주자 둥 현역병 복무 지원자',
      score_list: [{ index: 0, option: '해당', score: 4 }],
    },
    {
      index: 5,
      specialty_id: -4,
      description:
        '질병 치료에 따른 병역 처분 변경으로 현역병 입영 대상 판정자',
      score_list: [{ index: 0, option: '해당', score: 4 }],
    },
    {
      index: 6,
      specialty_id: [282, 285, 277, 279, 283, 284, 281],
      description: '수상 인명 구조 자격증 소지자',
      score_list: [{ index: 0, option: '해당', score: 2 }],
    },
    {
      index: 7,
      specialty_id: [282, 285, 277, 279, 283, 284, 281],
      description: '공인회계사 자격 소지자',
      score_list: [{ index: 0, option: '해당', score: 10 }],
    },
    {
      index: 8,
      specialty_id: [280],
      description: '수상 인명 구조 자격증 소지자(수색지원자)',
      score_list: [{ index: 0, option: '해당', score: 5 }],
    },
    {
      index: 9,
      specialty_id: [280],
      description: '수영 강사 자격증 소지자(수색지원자)',
      score_list: [{ index: 0, option: '해당', score: 10 }],
    },
    {
      index: 10,
      specialty_id: [280],
      description: '스키 강사 자격증 소지자(수색지원자)',
      score_list: [{ index: 0, option: '해당', score: 10 }],
    },
    {
      index: 11,
      specialty_id: [280],
      description: '스킨스쿠버 자격증 소지자(수색지원자)',
      score_list: [{ index: 0, option: '해당', score: 10 }],
    },
  ],
];
