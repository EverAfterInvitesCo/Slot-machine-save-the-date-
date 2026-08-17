export type GameState = 'idle' | 'spinning' | 'revealed';
export type LeverState = 'idle' | 'pulling';

export interface ReelProps {
  values: string[];
  finalValue: string;
  spinning: boolean;
  stopDelay: number;
}
