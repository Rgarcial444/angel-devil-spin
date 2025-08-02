export interface Player {
  id?: string;
  name: string;
  phone: string;
  ip_address: string;
  created_at?: string;
}

export interface GameSession {
  id?: string;
  player_id: string;
  played_at: string;
  card_selected: number;
  is_winner: boolean;
  winner_type?: 'saint' | 'devil';
  daily_position: number;
  discount_percentage?: number;
}

export interface GameResult {
  isWinner: boolean;
  type?: 'saint' | 'devil';
  message: string;
  discount?: number;
}

export interface DailyStats {
  date: string;
  total_players: number;
  saint_winner_position?: number;
  devil_winner_position?: number;
  saint_winner_found: boolean;
  devil_winner_found: boolean;
}