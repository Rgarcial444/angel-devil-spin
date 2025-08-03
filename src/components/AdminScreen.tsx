import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface AdminScreenProps {
  onExit: () => void;
}

export const AdminScreen = ({ onExit }: AdminScreenProps) => {
  const [saintPosition, setSaintPosition] = useState<number>(10);
  const [devilPosition, setDevilPosition] = useState<number>(11);
  const [autoMode, setAutoMode] = useState<boolean>(true);
  const [lastActivity, setLastActivity] = useState<number>(Date.now());

  // Auto-reset after 5 minutes of inactivity
  useEffect(() => {
    const checkInactivity = () => {
      if (Date.now() - lastActivity > 300000) { // 5 minutes
        if (!autoMode) {
          setAutoMode(true);
          generateRandomPositions();
          toast.info("Posiciones reiniciadas automáticamente por inactividad");
        }
      }
    };

    const interval = setInterval(checkInactivity, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [lastActivity, autoMode]);

  // Update activity timestamp on any interaction
  const updateActivity = () => {
    setLastActivity(Date.now());
  };

  const generateRandomPositions = () => {
    updateActivity();
    let newSaint, newDevil;
    do {
      newSaint = Math.floor(Math.random() * 20) + 1;
      newDevil = Math.floor(Math.random() * 20) + 1;
    } while (newSaint === newDevil);
    
    setSaintPosition(newSaint);
    setDevilPosition(newDevil);
    
    if (!autoMode) {
      handleSetPositions(newSaint, newDevil);
    }
  };

  const handleSetPositions = (saint = saintPosition, devil = devilPosition) => {
    updateActivity();
    // Validate positions
    if (saint === devil) {
      toast.error("Las posiciones deben ser diferentes");
      return;
    }

    if (saint < 1 || devil < 1) {
      toast.error("Las posiciones deben ser mayor a 0");
      return;
    }

    // Save positions to localStorage
    const today = new Date().toISOString().split('T')[0];
    const statsKey = `dailyStats_${today}`;
    
    const newStats = {
      date: today,
      total_players: 0,
      saint_winner_position: saint,
      devil_winner_position: devil,
      saint_winner_found: false,
      devil_winner_found: false
    };

    localStorage.setItem(statsKey, JSON.stringify(newStats));
    toast.success("Posiciones ganadoras actualizadas");
  };

  const handleModeChange = (checked: boolean) => {
    updateActivity();
    setAutoMode(checked);
    if (checked) {
      generateRandomPositions();
    }
  };

  const handleResetGame = () => {
    updateActivity();
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
              
              {/* Mode Switch */}
              <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <span className="text-sm text-foreground">Modo Automático</span>
                <Switch 
                  checked={autoMode} 
                  onCheckedChange={handleModeChange}
                />
              </div>
              
              {/* Manual Controls */}
              {!autoMode && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Posición Sant@ (15% descuento)
                    </label>
                    <Input
                      type="number"
                      value={saintPosition}
                      onChange={(e) => {
                        setSaintPosition(Number(e.target.value));
                        updateActivity();
                      }}
                      className="w-full"
                      min="1"
                      max="20"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Posición Diabl@ (10% descuento)
                    </label>
                    <Input
                      type="number"
                      value={devilPosition}
                      onChange={(e) => {
                        setDevilPosition(Number(e.target.value));
                        updateActivity();
                      }}
                      className="w-full"
                      min="1"
                      max="20"
                    />
                  </div>
                  
                  <Button 
                    onClick={() => handleSetPositions()}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Actualizar Posiciones
                  </Button>
                </div>
              )}
              
              {/* Random Generator Button */}
              <Button 
                onClick={generateRandomPositions}
                variant="outline"
                className="w-full"
              >
                🎲 Generar Posiciones Aleatorias
              </Button>
              
              {/* Current Positions Display */}
              <div className="p-3 bg-primary/10 rounded-lg">
                <p className="text-sm text-foreground">
                  <strong>Posiciones Actuales:</strong><br/>
                  Sant@: {saintPosition} | Diabl@: {devilPosition}
                </p>
              </div>
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