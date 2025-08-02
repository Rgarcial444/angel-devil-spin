import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import seductiveAngel from "@/assets/seductive-angel.jpg";
import seductiveDevil from "@/assets/seductive-devil.jpg";

interface PlayerDataScreenProps {
  onSubmit: (name: string, phone: string) => void;
  loading?: boolean;
}

export const PlayerDataScreen = ({ onSubmit, loading }: PlayerDataScreenProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({ name: "", phone: "" });

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = { name: "", phone: "" };
    
    if (!name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }
    
    if (!phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio";
    } else if (!validatePhone(phone)) {
      newErrors.phone = "Ingresa un número de teléfono válido";
    }
    
    setErrors(newErrors);
    
    if (!newErrors.name && !newErrors.phone) {
      onSubmit(name.trim(), phone.replace(/\s/g, ""));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-mystical flex items-center justify-center p-4">
      <div className="w-full max-w-md relative">
        {/* Background decorations */}
        <div className="absolute -left-20 top-0 opacity-30 animate-pulse">
          <img src={seductiveAngel} alt="" className="w-32 h-32 object-contain" />
        </div>
        <div className="absolute -right-20 bottom-0 opacity-30 animate-pulse">
          <img src={seductiveDevil} alt="" className="w-32 h-32 object-contain" />
        </div>
        
        <Card className="bg-gradient-card border-border shadow-mystical animate-fade-in-up">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-2xl font-bold text-foreground">
              Ingresa tus datos
            </CardTitle>
            <p className="text-muted-foreground">
              Necesitamos conocerte para poder jugar
            </p>
            <div className="h-1 w-20 mx-auto bg-gradient-to-r from-saint to-primary rounded-full"></div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground font-medium">
                  Nombre *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  className={`bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-primary ${
                    errors.name ? "border-destructive" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-destructive text-sm">{errors.name}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground font-medium">
                  Teléfono *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Tu número de teléfono"
                  className={`bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-primary ${
                    errors.phone ? "border-destructive" : ""
                  }`}
                />
                {errors.phone && (
                  <p className="text-destructive text-sm">{errors.phone}</p>
                )}
              </div>
              
              <Button
                type="submit"
                className="w-full py-3 font-bold bg-primary hover:bg-primary/90 transition-all duration-300"
                disabled={loading}
              >
                {loading ? "Verificando..." : "Continuar al Juego"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};