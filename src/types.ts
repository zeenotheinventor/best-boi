export interface Stats {
  interviews: number;
  client_calls: number;
  cvs: number;
  deals: number;
}

export interface User {
  id: string;
  name: string;
  stats: Stats;
}
