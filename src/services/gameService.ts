// import { supabase } from "@/integrations/supabase/client";
import { Player, GameSession, GameResult, DailyStats } from "@/types/game";

export class GameService {
  // Get player's IP address
  static async getClientIP(): Promise<string> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Error getting IP:', error);
      return 'unknown';
    }
  }

  // Check if player can play (24 hour rule)
  static async canPlayerPlay(phone: string, ip: string): Promise<boolean> {
    // Mock implementation - in real app, check against database
    const lastPlayedKey = `lastPlayed_${phone}_${ip}`;
    const lastPlayed = localStorage.getItem(lastPlayedKey);
    
    if (!lastPlayed) return true;
    
    const lastPlayedTime = new Date(lastPlayed);
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
    
    return lastPlayedTime < twentyFourHoursAgo;
  }

  // Create or get player
  static async createOrGetPlayer(name: string, phone: string, ip: string): Promise<Player> {
    // Mock implementation - return player object
    return {
      id: `player_${phone}`,
      name,
      phone,
      ip_address: ip,
      created_at: new Date().toISOString()
    };
  }

  // Get or create today's stats
  static async getTodayStats(): Promise<DailyStats> {
    const today = new Date().toISOString().split('T')[0];
    const statsKey = `dailyStats_${today}`;
    
    const existingStats = localStorage.getItem(statsKey);
    if (existingStats) {
      return JSON.parse(existingStats);
    }

    // Create new daily stats with random winner positions
    const saintPosition = this.generateRandomWinnerPosition();
    const devilPosition = this.generateRandomWinnerPosition(saintPosition);

    const newStats: DailyStats = {
      date: today,
      total_players: 0,
      saint_winner_position: saintPosition,
      devil_winner_position: devilPosition,
      saint_winner_found: false,
      devil_winner_found: false
    };

    localStorage.setItem(statsKey, JSON.stringify(newStats));
    return newStats;
  }

  // Generate random winner position (14+ or any position once a week)
  static generateRandomWinnerPosition(excludePosition?: number): number {
    const isWeeklySpecial = Math.random() < 1/7; // 1/7 chance for weekly special
    
    if (isWeeklySpecial) {
      let position;
      do {
        position = Math.floor(Math.random() * 50) + 1; // 1-50
      } while (position === excludePosition);
      return position;
    }
    
    // Normal case: position 14+
    let position;
    do {
      position = Math.floor(Math.random() * 37) + 14; // 14-50
    } while (position === excludePosition);
    return position;
  }

  // Play game and determine result
  static async playGame(player: Player, cardSelected: number): Promise<GameResult> {
    const ip = await this.getClientIP();
    
    // Check if player can play
    const canPlay = await this.canPlayerPlay(player.phone, ip);
    if (!canPlay) {
      throw new Error('Player has already played in the last 24 hours');
    }

    // Get today's stats
    const stats = await this.getTodayStats();
    const newPosition = stats.total_players + 1;

    // Determine if player wins
    let isWinner = false;
    let winnerType: 'saint' | 'devil' | undefined;
    let discount: number | undefined;

    // Check if this position is a winning position
    if (!stats.saint_winner_found && newPosition === stats.saint_winner_position) {
      isWinner = true;
      winnerType = 'saint';
      discount = 15;
    } else if (!stats.devil_winner_found && newPosition === stats.devil_winner_position) {
      isWinner = true;
      winnerType = 'devil';
      discount = 10;
    }

    // Store play record in localStorage
    const lastPlayedKey = `lastPlayed_${player.phone}_${ip}`;
    localStorage.setItem(lastPlayedKey, new Date().toISOString());

    // Update daily stats
    const today = new Date().toISOString().split('T')[0];
    const statsKey = `dailyStats_${today}`;
    
    const updatedStats = {
      ...stats,
      total_players: newPosition,
      saint_winner_found: stats.saint_winner_found || winnerType === 'saint',
      devil_winner_found: stats.devil_winner_found || winnerType === 'devil'
    };
    
    localStorage.setItem(statsKey, JSON.stringify(updatedStats));

    // Generate result message
    let message = "";
    if (isWinner) {
      if (winnerType === 'saint') {
        message = "¡Eres el/la Sant@! Ganaste 15% de descuento en tu consumo personal.";
      } else {
        message = "¡Eres el/la Diabl@! Ganaste 10% de descuento en consumo grupal.";
      }
    } else {
      message = "Gracias por jugar. Vuelve mañana para intentarlo de nuevo.";
    }

    return {
      isWinner,
      type: winnerType,
      message,
      discount
    };
  }
}