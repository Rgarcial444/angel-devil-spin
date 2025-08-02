import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AlreadyPlayedScreenProps {
  onGoBack: () => void;
  timeRemaining?: string;
}

export const AlreadyPlayedScreen = ({ onGoBack, timeRemaining }: AlreadyPlayedScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-mystical flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-gradient-card border-border shadow-mystical animate-fade-in-up">
          <CardHeader className="text-center space-y-6">
            <div className="text-8xl animate-mystical-glow">
              ⏰
            </div>
            
            <CardTitle className="text-3xl font-bold text-foreground">
              ¡Ya jugaste hoy!
            </CardTitle>
            
            <div className="h-1 w-20 mx-auto bg-gradient-to-r from-saint to-primary rounded-full"></div>
          </CardHeader>
          
          <CardContent className="text-center space-y-6">
            <div className="space-y-4">
              <p className="text-xl text-muted-foreground leading-relaxed">
                Solo puedes jugar una vez cada 24 horas
              </p>
              
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-lg font-semibold text-foreground">
                  Vuelve en 24 horas
                </p>
                {timeRemaining && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Tiempo restante: {timeRemaining}
                  </p>
                )}
              </div>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Mientras tanto, puedes:</p>
                <ul className="list-disc list-inside space-y-1 text-left max-w-xs mx-auto">
                  <li>Disfrutar tu bebida favorita</li>
                  <li>Compartir el juego con amigos</li>
                  <li>Explorar nuestro menú</li>
                </ul>
              </div>
            </div>
            
            <Button
              onClick={onGoBack}
              className="w-full py-3 font-bold bg-primary hover:bg-primary/90 transition-all duration-300"
            >
              Volver al Inicio
            </Button>
          </CardContent>
        </Card>
        
        {/* Decorative elements */}
        <div className="flex justify-between items-center pt-8 opacity-40">
          <div className="text-4xl animate-saint-glow">👼</div>
          <div className="text-sm text-muted-foreground">24h</div>
          <div className="text-4xl text-primary animate-mystical-glow">😈</div>
        </div>
      </div>
    </div>
  );
};