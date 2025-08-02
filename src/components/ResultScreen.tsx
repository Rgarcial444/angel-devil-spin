import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import angelSilhouette from "@/assets/angel-silhouette.jpg";
import devilSilhouette from "@/assets/devil-silhouette.jpg";

interface ResultScreenProps {
  result: {
    isWinner: boolean;
    type?: 'saint' | 'devil';
    message: string;
    discount?: number;
  };
  playerName: string;
  onPlayAgain: () => void;
}

export const ResultScreen = ({ result, playerName, onPlayAgain }: ResultScreenProps) => {
  const getResultIcon = () => {
    if (!result.isWinner) return "🎭";
    return result.type === 'saint' ? "👼" : "😈";
  };

  const getResultImage = () => {
    if (!result.isWinner) return null;
    return result.type === 'saint' ? angelSilhouette : devilSilhouette;
  };

  const getResultTitle = () => {
    if (!result.isWinner) return "¡Gracias por jugar!";
    return result.type === 'saint' ? "¡Eres el Sant@!" : "¡Eres el Diabl@!";
  };

  const getCardClass = () => {
    if (!result.isWinner) return "bg-gradient-card border-border";
    if (result.type === 'saint') return "bg-gradient-saint border-saint text-black";
    return "bg-gradient-devil border-primary";
  };

  const getGlowClass = () => {
    if (!result.isWinner) return "";
    return result.type === 'saint' ? "animate-saint-glow" : "animate-mystical-glow";
  };

  return (
    <div className="min-h-screen bg-gradient-mystical flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className={`${getCardClass()} shadow-mystical ${getGlowClass()} animate-fade-in-up`}>
          <CardHeader className="text-center space-y-6">
            {/* Result image for winners */}
            {result.isWinner && getResultImage() && (
              <div className="mx-auto w-32 h-32 relative">
                <img 
                  src={getResultImage()!} 
                  alt={result.type} 
                  className="w-full h-full object-contain rounded-full"
                />
                <div className="absolute inset-0 rounded-full animate-mystical-glow"></div>
              </div>
            )}
            
            {/* Result icon */}
            <div className="text-8xl animate-mystical-glow">
              {getResultIcon()}
            </div>
            
            <CardTitle className={`text-3xl font-bold ${result.isWinner && result.type === 'saint' ? 'text-black' : 'text-foreground'}`}>
              {getResultTitle()}
            </CardTitle>
            
            <div className="h-1 w-20 mx-auto bg-gradient-to-r from-saint to-primary rounded-full"></div>
          </CardHeader>
          
          <CardContent className="text-center space-y-6">
            <div className="space-y-4">
              <p className={`text-xl font-semibold ${result.isWinner && result.type === 'saint' ? 'text-black' : 'text-foreground'}`}>
                {playerName}
              </p>
              
              <p className={`text-lg leading-relaxed ${result.isWinner && result.type === 'saint' ? 'text-gray-800' : 'text-muted-foreground'}`}>
                {result.message}
              </p>
              
              {result.isWinner && result.discount && (
                <div className={`p-4 rounded-lg ${result.type === 'saint' ? 'bg-black/10' : 'bg-white/10'}`}>
                  <p className={`text-2xl font-bold ${result.isWinner && result.type === 'saint' ? 'text-black' : 'text-foreground'}`}>
                    {result.discount}% de descuento
                  </p>
                  <p className={`text-sm ${result.isWinner && result.type === 'saint' ? 'text-gray-700' : 'text-muted-foreground'}`}>
                    {result.type === 'saint' ? 'En tu consumo personal' : 'En consumo grupal'}
                  </p>
                </div>
              )}
            </div>
            
            <div className="space-y-4 pt-4">
              {!result.isWinner && (
                <p className="text-muted-foreground text-sm">
                  Vuelve mañana para intentarlo de nuevo
                </p>
              )}
              
              <Button
                onClick={onPlayAgain}
                className="w-full py-3 font-bold bg-primary hover:bg-primary/90 transition-all duration-300"
              >
                Volver al Inicio
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Footer */}
        <div className="text-center mt-8 text-muted-foreground text-sm">
          <p>Sant@ o Diabl@ • Juega responsablemente</p>
        </div>
      </div>
    </div>
  );
};