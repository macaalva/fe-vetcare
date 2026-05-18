import { useState } from "react";
import { Star, TrendingUp, Users, MessageSquare, Calendar, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export default function VetDashboard() {
  const navigate = useNavigate();

  const vetInfo = {
    name: "Veterinaria Palermo",
    rating: 4.5,
    totalReviews: 2,
  };

  const [reviews] = useState<Review[]>([
    {
      id: 1,
      userName: "María González",
      rating: 5,
      comment: "Excelente atención, el Dr. fue muy amable con mi perro Max. Instalaciones limpias y modernas.",
      date: "2026-04-15",
      helpful: 12,
    },
    {
      id: 2,
      userName: "Carlos Rodríguez",
      rating: 4,
      comment: "Muy buena atención, aunque tuve que esperar un poco. El diagnóstico fue certero.",
      date: "2026-04-10",
      helpful: 8,
    },
  ]);

  const ratingDistribution = [
    { stars: 5, count: 1 },
    { stars: 4, count: 1 },
    { stars: 3, count: 0 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ];

  const renderStars = (rating: number, size: string = "w-5 h-5") => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background pb-8">
      <div className="bg-primary text-white p-6 pb-8 rounded-b-3xl shadow-lg">
        <button onClick={() => navigate("/home")} className="mb-4 flex items-center gap-2 text-white/80 hover:text-white">
          <ChevronLeft className="w-5 h-5" />
          Volver
        </button>
        <h1 className="text-xl mb-2">{vetInfo.name}</h1>
        <p className="text-white/80 text-sm">Panel de administración</p>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white border border-border rounded-2xl p-4">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Star className="w-5 h-5" />
              <span className="text-sm">Calificación</span>
            </div>
            <div className="text-3xl font-bold text-foreground">{vetInfo.rating}</div>
            <div className="text-sm text-muted-foreground">de 5.0</div>
          </div>

          <div className="bg-white border border-border rounded-2xl p-4">
            <div className="flex items-center gap-2 text-primary mb-2">
              <MessageSquare className="w-5 h-5" />
              <span className="text-sm">Reseñas</span>
            </div>
            <div className="text-3xl font-bold text-foreground">{vetInfo.totalReviews}</div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="w-3 h-3" />
              <span>+2 este mes</span>
            </div>
          </div>

          <div className="bg-white border border-border rounded-2xl p-4">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Users className="w-5 h-5" />
              <span className="text-sm">Visitas</span>
            </div>
            <div className="text-3xl font-bold text-foreground">48</div>
            <div className="text-sm text-muted-foreground">este mes</div>
          </div>

          <div className="bg-white border border-border rounded-2xl p-4">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Calendar className="w-5 h-5" />
              <span className="text-sm">Turnos</span>
            </div>
            <div className="text-3xl font-bold text-foreground">12</div>
            <div className="text-sm text-muted-foreground">pendientes</div>
          </div>
        </div>

        <div className="bg-white border border-border rounded-3xl p-6">
          <h2 className="text-lg text-foreground mb-4">Distribución de calificaciones</h2>
          <div className="space-y-3">
            {ratingDistribution.map((item) => {
              const percentage =
                vetInfo.totalReviews > 0 ? (item.count / vetInfo.totalReviews) * 100 : 0;
              return (
                <div key={item.stars} className="flex items-center gap-3">
                  <span className="text-sm text-foreground w-12">{item.stars} ⭐</span>
                  <div className="flex-1 bg-secondary rounded-full h-3">
                    <div
                      className="bg-primary rounded-full h-3 transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {item.count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-lg text-foreground mb-4">Reseñas recientes</h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white border border-border rounded-2xl p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-foreground font-medium">{review.userName}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(review.date).toLocaleDateString("es-AR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  {renderStars(review.rating, "w-4 h-4")}
                </div>

                <p className="text-foreground mb-3">{review.comment}</p>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {review.helpful} personas encontraron esto útil
                  </span>
                  <button className="text-primary hover:underline">
                    Responder
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-accent border-2 border-primary/20 rounded-2xl p-6 text-center">
          <Star className="w-12 h-12 text-primary mx-auto mb-3" />
          <h3 className="text-foreground mb-2">¡Sigue brindando excelente servicio!</h3>
          <p className="text-sm text-muted-foreground">
            Las reseñas positivas ayudan a más usuarios a encontrarte y confiar en tu servicio.
          </p>
        </div>
      </div>
    </div>
  );
}
