import { Button } from "@/components/ui/button";
import holyInfernoLogo from "@/assets/holy-inferno-logo.png";

interface WelcomeScreenProps {
  onStartGame: () => void;
  onTitleClick?: () => void;
}

export const WelcomeScreen = ({ onStartGame, onTitleClick }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-mystical flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-sm w-full space-y-4 animate-fade-in-up">
        {/* Holy Inferno Logo */}
        <div className="mb-4">
          <img 
            src={holyInfernoLogo} 
            alt="Holy Inferno - Sant@ vs Diabl@" 
            className="w-full max-w-xs mx-auto rounded-lg shadow-mystical animate-fade-in"
          />
        </div>
        
        {/* Title */}
        <div className="space-y-3">
          <h1 
            className="text-3xl md:text-4xl font-bold text-foreground tracking-wide cursor-pointer select-none"
            onClick={onTitleClick}
          >
            Sant@ o Diabl@
          </h1>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-saint via-primary to-devil rounded-full"></div>
        </div>
        
        {/* Game description */}
        <div className="space-y-4 text-foreground">
          <p className="text-lg md:text-xl font-semibold leading-relaxed">
            Juega cada 24 horas y gana hasta el{" "}
            <span className="text-primary font-bold">15%</span> en tu consumo
          </p>
          
          <p className="text-muted-foreground text-base">
            ¿Serás un Sant@ bondadoso o un Diabl@ travieso?
          </p>
        </div>
        
        {/* Start button */}
        <Button 
          onClick={onStartGame}
          className="w-full py-4 text-lg font-bold bg-primary hover:bg-primary/90 transition-all duration-300 animate-mystical-glow"
          size="lg"
        >
          Iniciar Juego
        </Button>
        
        {/* Decorative elements */}
        <div className="flex justify-between items-center pt-4 opacity-60">
          <div className="text-4xl animate-saint-glow">👼</div>
          <div className="text-xs text-muted-foreground">VS</div>
          <div className="text-4xl text-primary animate-mystical-glow">😈</div>
        </div>
      </div>
    </div>
  );
};