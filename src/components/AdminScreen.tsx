import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface AdminScreenProps {
  onExit: () => void;
}

export const AdminScreen = ({ onExit }: AdminScreenProps) => {
  const [saintPosition, setSaintPosition] = useState<number>(10);
  const [devilPosition, setDevilPosition] = useState<number>(11);

  const handleSetPositions = () => {
    // Validate positions
    if (saintPosition === devilPosition) {
      toast.error("Las posiciones deben ser diferentes");
      return;
    }

    if (saintPosition < 1 || devilPosition < 1) {
      toast.error("Las posiciones deben ser mayor a 0");
      return;
    }

    // Save positions to localStorage
    const today = new Date().toISOString().split('T')[0];
    const statsKey = `dailyStats_${today}`;
    
    const newStats = {
      date: today,
      total_players: 0,
      saint_winner_position: saintPosition,
      devil_winner_position: devilPosition,
      saint_winner_found: false,
      devil_winner_found: false
    };

    localStorage.setItem(statsKey, JSON.stringify(newStats));
    toast.success("Posiciones ganadoras actualizadas");
  };

  const handleResetGame = () => {
    // Clear all localStorage data related to the game
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('lastPlayed_') || key.startsWith('dailyStats_')) {
        localStorage.removeItem(key);
      }
    });
    
    toast.success("Juego reiniciado completamente");
  };

  return (
    <div className="min-h-screen bg-gradient-mystical flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <Card className="bg-gradient-card border-border shadow-mystical">
          <CardHeader>
            <CardTitle className="text-center text-primary">Panel de Administración</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Configurar Posiciones Ganadoras</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Posición Sant@ (15% descuento)
                  </label>
                  <Input
                    type="number"
                    value={saintPosition}
                    onChange={(e) => setSaintPosition(Number(e.target.value))}
                    className="w-full"
                    min="1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Posición Diabl@ (10% descuento)
                  </label>
                  <Input
                    type="number"
                    value={devilPosition}
                    onChange={(e) => setDevilPosition(Number(e.target.value))}
                    className="w-full"
                    min="1"
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleSetPositions}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Actualizar Posiciones
              </Button>
            </div>

            <div className="border-t border-border pt-4">
              <h3 className="text-lg font-semibold text-foreground mb-3">Controles del Juego</h3>
              <Button 
                onClick={handleResetGame}
                variant="destructive"
                className="w-full"
              >
                Reiniciar Juego Completo
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Esto eliminará todos los registros y permitirá que todos jueguen nuevamente
              </p>
            </div>

            <Button 
              onClick={onExit}
              variant="outline"
              className="w-full"
            >
              Salir del Panel
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};