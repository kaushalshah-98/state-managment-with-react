export type Action =
  | { type: 'SET'; payload: any[] }
  | { type: 'DELETE'; payload: string }
  | { type: 'CREATE'; payload: any };
