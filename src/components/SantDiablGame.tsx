import { useState, useEffect } from "react";
import { toast } from "sonner";
import { WelcomeScreen } from "./WelcomeScreen";
import { PlayerDataScreen } from "./PlayerDataScreen";
import { GameScreen } from "./GameScreen";
import { ResultScreen } from "./ResultScreen";
import { AlreadyPlayedScreen } from "./AlreadyPlayedScreen";
import { GameService } from "@/services/gameService";
import { Player, GameResult } from "@/types/game";

type GameState = 'welcome' | 'playerData' | 'game' | 'result' | 'alreadyPlayed';

export const SantDiablGame = () => {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [player, setPlayer] = useState<Player | null>(null);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleStartGame = () => {
    setGameState('playerData');
  };

  const handlePlayerDataSubmit = async (name: string, phone: string) => {
    setLoading(true);
    try {
      const ip = await GameService.getClientIP();
      
      // Check if player can play
      const canPlay = await GameService.canPlayerPlay(phone, ip);
      if (!canPlay) {
        setGameState('alreadyPlayed');
        setLoading(false);
        return;
      }

      // Create or get player
      const playerData = await GameService.createOrGetPlayer(name, phone, ip);
      setPlayer(playerData);
      setGameState('game');
    } catch (error) {
      console.error('Error submitting player data:', error);
      toast.error('Error al procesar los datos. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleCardSelected = async (cardIndex: number) => {
    if (!player) return;

    setLoading(true);
    try {
      const result = await GameService.playGame(player, cardIndex);
      setGameResult(result);
      setGameState('result');
      
      // Show toast based on result
      if (result.isWinner) {
        toast.success(`¡Felicidades! Eres ${result.type === 'saint' ? 'Sant@' : 'Diabl@'}!`);
      } else {
        toast.info('¡Gracias por jugar! Vuelve mañana.');
      }
    } catch (error) {
      console.error('Error playing game:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error al jugar';
      
      if (errorMessage.includes('already played')) {
        setGameState('alreadyPlayed');
      } else {
        toast.error('Error al procesar el juego. Intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePlayAgain = () => {
    setPlayer(null);
    setGameResult(null);
    setGameState('welcome');
  };

  const handleGoBack = () => {
    setGameState('welcome');
  };

  // Render current screen based on game state
  switch (gameState) {
    case 'welcome':
      return <WelcomeScreen onStartGame={handleStartGame} />;
    
    case 'playerData':
      return (
        <PlayerDataScreen 
          onSubmit={handlePlayerDataSubmit} 
          loading={loading}
        />
      );
    
    case 'game':
      return (
        <GameScreen 
          onCardSelected={handleCardSelected}
          playerName={player?.name || ''}
        />
      );
    
    case 'result':
      return gameResult && player ? (
        <ResultScreen 
          result={gameResult}
          playerName={player.name}
          onPlayAgain={handlePlayAgain}
        />
      ) : null;
    
    case 'alreadyPlayed':
      return (
        <AlreadyPlayedScreen 
          onGoBack={handleGoBack}
        />
      );
    
    default:
      return <WelcomeScreen onStartGame={handleStartGame} />;
  }
};