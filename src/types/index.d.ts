export type PublicAPIsEntry = {
  API: string;
  Description: string;
  Auth: string;
  HTTPS: true;
  Cors: string;
  Link: string;
  Category: string;
};

export type PublicAPIsData = {
  count: number;
  entries: PublicAPIsEntry[] | null;
};
