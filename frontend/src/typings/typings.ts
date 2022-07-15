export interface Major {
  id: number;
  name: string;
}

export interface Certificate {
  id: number;
  name: string;
}

export interface SpecialtyRequest {
  military_type: number[];
  major_id: number | null;
  grade: number | null;
  certificates_id: number[];
  absent_days: number;
  blood_donation: number;
  volunteer_time: number;
  extra_points: {
    specialty_id: number;
    description: string;
    score: number;
  }[];
}

export interface Specialty {
  military_type: string;
  id: number;
  name: string;
  specialty_type: string;
  applicable: boolean;
  my_tot_score: number;
  perfect_score: number;
  info_url: string;
  comment: string;
  previous_score_list: {
    enlist_date: string;
    min_score: number;
  }[];
  score_data: {
    article: string;
    description: string;
    score: number;
  }[];
}
