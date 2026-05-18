import { Calendar, ListChecks, Clock, Building2, Dog } from "lucide-react";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Reserva de turnos",
      icon: Calendar,
      path: "/home/book",
      color: "bg-[#a78763]",
    },
    {
      title: "Mis turnos",
      icon: ListChecks,
      path: "/home/appointments",
      color: "bg-[#b89976]",
    },
    {
      title: "Mis mascotas",
      icon: Dog,
      path: "/home/pets",
      color: "bg-[#d4b895]",
    },
    {
      title: "Historial de visitas",
      icon: Clock,
      path: "/home/history",
      color: "bg-[#c9ab89]",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col p-6">
      <div className="mb-8">
        <h1 className="text-2xl text-foreground mb-1">¡Hola, María!</h1>
        <p className="text-muted-foreground">¿Qué necesitas hoy?</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`${item.color} text-white rounded-3xl p-6 flex flex-col items-center justify-center gap-4 shadow-lg hover:scale-105 transition-transform active:scale-95`}
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Icon className="w-8 h-8" strokeWidth={2} />
              </div>
              <span className="text-center leading-tight">{item.title}</span>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => navigate("/home/vet-dashboard")}
        className="bg-secondary border-2 border-primary/20 rounded-2xl p-4 flex items-center gap-3 hover:bg-accent transition-colors"
      >
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <Building2 className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1 text-left">
          <p className="text-foreground font-medium">¿Eres veterinaria?</p>
          <p className="text-sm text-muted-foreground">Accede al panel de administración</p>
        </div>
      </button>
    </div>
  );
}
