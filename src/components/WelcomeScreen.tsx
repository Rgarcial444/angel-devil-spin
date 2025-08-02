import { Button } from "@/components/ui/button";
import epicBattle from "@/assets/epic-battle.jpg";

interface WelcomeScreenProps {
  onStartGame: () => void;
}

export const WelcomeScreen = ({ onStartGame }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-mystical flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-8 animate-fade-in-up">
        {/* Epic battle background */}
        <div className="mb-8">
          <img 
            src={epicBattle} 
            alt="Sant@ vs Diabl@" 
            className="w-full max-w-2xl mx-auto rounded-lg shadow-mystical animate-fade-in"
          />
        </div>
        
        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-wide">
            Sant@ o Diabl@
          </h1>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-saint via-primary to-devil rounded-full"></div>
        </div>
        
        {/* Game description */}
        <div className="space-y-6 text-foreground">
          <p className="text-xl md:text-2xl font-semibold leading-relaxed">
            Juega cada 24 horas y gana hasta el{" "}
            <span className="text-primary font-bold">15%</span> en tu consumo
          </p>
          
          <p className="text-muted-foreground text-lg">
            ¿Serás un Sant@ bondadoso o un Diabl@ travieso?
          </p>
        </div>
        
        {/* Start button */}
        <Button 
          onClick={onStartGame}
          className="w-full py-6 text-xl font-bold bg-primary hover:bg-primary/90 transition-all duration-300 animate-mystical-glow"
          size="lg"
        >
          Iniciar Juego
        </Button>
        
        {/* Decorative elements */}
        <div className="flex justify-between items-center pt-8 opacity-60">
          <div className="text-6xl animate-saint-glow">👼</div>
          <div className="text-sm text-muted-foreground">VS</div>
          <div className="text-6xl text-primary animate-mystical-glow">😈</div>
        </div>
      </div>
    </div>
  );
};