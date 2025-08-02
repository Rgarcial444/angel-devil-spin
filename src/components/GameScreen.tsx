import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import attractiveCards from "@/assets/attractive-cards.jpg";

interface GameScreenProps {
  onCardSelected: (cardIndex: number) => void;
  playerName: string;
}

export const GameScreen = ({ onCardSelected, playerName }: GameScreenProps) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);

  const cards = [
    { id: 1, title: "Carta del De", icon: "🎭" },
    { id: 2, title: "Carta del Misterio", icon: "🔮" },
    { id: 3, title: "Carta del Poder", icon: "⚡" }
  ];

  const handleCardClick = (cardIndex: number) => {
    if (selectedCard !== null || isRevealing) return;
    
    setSelectedCard(cardIndex);
    setIsRevealing(true);
    
    // Delay to show the card flip animation
    setTimeout(() => {
      onCardSelected(cardIndex);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-mystical flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl text-center space-y-8">
        {/* Header */}
        <div className="space-y-4 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            ¡Elige tu destino, {playerName}!
          </h1>
          <p className="text-muted-foreground text-lg">
            Selecciona una carta y descubre si serás Sant@ o Diabl@
          </p>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-saint via-primary to-devil rounded-full"></div>
        </div>

        {/* Attractive cards image below */}
        <div className="relative mt-8">
          <img 
            src={attractiveCards} 
            alt="Cartas mágicas del destino" 
            className="w-full max-w-3xl mx-auto rounded-lg opacity-60 shadow-mystical animate-pulse"
          />
        </div>

        {/* Game cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
          {cards.map((card, index) => (
            <Card
              key={card.id}
              className={`cursor-pointer transition-all duration-300 transform hover:scale-105 bg-gradient-card border-border shadow-mystical ${
                selectedCard === index ? "animate-card-flip scale-110" : ""
              } ${
                selectedCard !== null && selectedCard !== index ? "opacity-50" : ""
              }`}
              onClick={() => handleCardClick(index)}
            >
              <CardContent className="p-8 text-center space-y-4">
                <div className="text-6xl mb-4 animate-mystical-glow">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {card.title}
                </h3>
                <p className="text-muted-foreground">
                  Toca para revelar
                </p>
                {selectedCard === index && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-saint/20 rounded-lg flex items-center justify-center">
                    <div className="text-2xl font-bold text-foreground">
                      Revelando...
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Instructions */}
        <div className="text-center space-y-4 pt-8">
          <p className="text-muted-foreground">
            Una vez que elijas, no podrás cambiar tu decisión
          </p>
          <div className="flex justify-center items-center space-x-4 text-sm text-muted-foreground">
            <span className="flex items-center">
              <span className="text-saint text-2xl mr-2">👼</span>
              Sant@: 15% descuento personal
            </span>
            <span>•</span>
            <span className="flex items-center">
              <span className="text-primary text-2xl mr-2">😈</span>
              Diabl@: 10% descuento grupal
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};