import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface AdminLoginProps {
  onLogin: () => void;
  onCancel: () => void;
}

export const AdminLogin = ({ onLogin, onCancel }: AdminLoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Secret login with "AMIGO"
    if (username.toUpperCase() === "AMIGO" && password.toUpperCase() === "AMIGO") {
      toast.success("Acceso de administrador concedido");
      onLogin();
      return;
    }

    // Regular admin credentials (you can customize these)
    if (username === "admin" && password === "del pino") {
      toast.success("Acceso de administrador concedido");
      onLogin();
      return;
    }

    toast.error("Credenciales incorrectas");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-mystical flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <Card className="bg-gradient-card border-border shadow-mystical">
          <CardHeader>
            <CardTitle className="text-center text-primary">Acceso de Administrador</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full"
              />
            </div>
            
            <div>
              <Input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Button 
                onClick={handleLogin}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Ingresar
              </Button>
              
              <Button 
                onClick={onCancel}
                variant="outline"
                className="w-full"
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};