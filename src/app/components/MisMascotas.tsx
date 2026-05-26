import { useState, useEffect } from "react";
import { Dog, Cat, Calendar, Weight, Palette, Ruler, Bell, FileText, ChevronRight, Plus, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  furType: string;
  furColor: string;
  photo?: string;
}

interface Reminder {
  id: number;
  petId: number;
  type: string;
  description: string;
  date: string;
  daysUntil: number;
  priority: "high" | "medium" | "low";
}

interface Visit {
  id: number;
  petId: number;
  date: string;
  location: string;
  reason: string;
  notes: string;
}

export default function MisMascotas() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [newPet, setNewPet] = useState({
    name: "",
    species: "Perro",
    breed: "",
    age: "",
    weight: "",
    furType: "",
    furColor: "",
  });

  // 1. PRIMERO DECLARAMOS EL ESTADO DE LAS MASCOTAS
  const [pets, setPets] = useState<Pet[]>([]);

  // 2. DESPUÉS EXECUTAMOS EL EFECTO QUE USA ESE SETPETS
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/mascotas/")
      .then((response) => response.json())
      .then((data) => {
        const mappedPets = data.map((mascota: any) => ({
          id: mascota.id,
          name: mascota.nombre,
          species: mascota.especie,
          breed: mascota.raza,
          age: mascota.edad,
          weight: mascota.peso,
          furType: mascota.tipo_pelo,
          furColor: mascota.color_pelo,
        }));
        setPets(mappedPets);
      })
      .catch((error) => console.error("Error al traer mascotas:", error));
  }, []);

  
  const [reminders] = useState<Reminder[]>([
    {
      id: 1,
      petId: 1,
      type: "Análisis de sangre",
      description: "Control anual de análisis de sangre completo",
      date: "2026-05-26",
      daysUntil: 30,
      priority: "high",
    },
    {
      id: 2,
      petId: 1,
      type: "Vacuna antirrábica",
      description: "Refuerzo anual de vacuna antirrábica",
      date: "2026-09-15",
      daysUntil: 142,
      priority: "medium",
    },
    {
      id: 3,
      petId: 1,
      type: "Desparasitación",
      description: "Desparasitación interna trimestral",
      date: "2026-05-10",
      daysUntil: 14,
      priority: "high",
    },
  ]);

  const [visits] = useState<Visit[]>([
    {
      id: 1,
      petId: 1,
      date: "15 Abr 2026",
      location: "Vet Care Recoleta",
      reason: "Control de rutina",
      notes: "Peso: 28kg. Estado general: excelente. Próxima vacuna: septiembre.",
    },
    {
      id: 2,
      petId: 1,
      date: "02 Mar 2026",
      location: "Veterinaria Palermo",
      reason: "Vacunación antirrábica",
      notes: "Aplicación de vacuna antirrábica. Próxima dosis en 1 año.",
    },
    {
      id: 3,
      petId: 1,
      date: "18 Ene 2026",
      location: "Clínica Veterinaria Belgrano",
      reason: "Consulta general",
      notes: "Revisión de piel y pelaje. Todo en orden.",
    },
  ]);

  const [selectedPet, setSelectedPet] = useState<Pet | null>(pets[0] || null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "Urgente";
      case "medium":
        return "Próximamente";
      case "low":
        return "Planificado";
      default:
        return "";
    }
  };

  const petReminders = selectedPet
    ? reminders.filter((r) => r.petId === selectedPet.id).sort((a, b) => a.daysUntil - b.daysUntil)
    : [];

  const petVisits = selectedPet
    ? visits.filter((v) => v.petId === selectedPet.id)
    : [];

  if (!selectedPet) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-background flex flex-col items-center justify-center p-6">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-6">
          <Dog className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-xl text-foreground mb-2">No tienes mascotas registradas</h2>
        <p className="text-muted-foreground text-center mb-6">
          Agrega tu primera mascota para comenzar a llevar su historial
        </p>
        <button
          onClick={() => navigate("/home/profile")}
          className="bg-primary text-white px-6 py-3 rounded-2xl hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Agregar mascota
        </button>
      </div>
    );
  }

  const SpeciesIcon = selectedPet.species === "Gato" ? Cat : Dog;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background pb-8">
      <div className="bg-primary text-white p-6 pb-8 rounded-b-3xl shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <h1 className="text-xl">Mis mascotas</h1>
          <button
            onClick={() => setShowModal(true)}
            className="ml-auto bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-xl flex items-center gap-1 text-sm"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>

        {pets.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {pets.map((pet) => (
              <button
                key={pet.id}
                onClick={() => setSelectedPet(pet)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl transition-colors ${
                  selectedPet?.id === pet.id
                    ? "bg-white text-primary"
                    : "bg-white/20 text-white"
                }`}
              >
                {pet.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-border">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <SpeciesIcon className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl text-foreground mb-1">{selectedPet.name}</h2>
              <p className="text-muted-foreground">{selectedPet.breed}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary rounded-2xl p-4">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Edad</span>
              </div>
              <p className="text-foreground text-lg">
                {selectedPet.age} {selectedPet.age === 1 ? "año" : "años"}
              </p>
            </div>

            <div className="bg-secondary rounded-2xl p-4">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Weight className="w-4 h-4" />
                <span className="text-sm">Peso</span>
              </div>
              <p className="text-foreground text-lg">{selectedPet.weight} kg</p>
            </div>

            <div className="bg-secondary rounded-2xl p-4">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Ruler className="w-4 h-4" />
                <span className="text-sm">Pelaje</span>
              </div>
              <p className="text-foreground text-lg">{selectedPet.furType}</p>
            </div>

            <div className="bg-secondary rounded-2xl p-4">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Palette className="w-4 h-4" />
                <span className="text-sm">Color</span>
              </div>
              <p className="text-foreground text-lg">{selectedPet.furColor}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              <h2 className="text-lg text-foreground">Recordatorios</h2>
              {petReminders.length > 0 && (
                <span className="bg-destructive text-white text-xs px-2 py-1 rounded-full">
                  {petReminders.filter(r => r.daysUntil <= 30).length}
                </span>
              )}
            </div>
            {petReminders.length > 1 && (
              <button
                onClick={() => navigate("/home/history")}
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                Ver todo
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {petReminders.length === 0 ? (
            <div className="bg-secondary rounded-2xl p-6 text-center">
              <p className="text-muted-foreground">No hay recordatorios pendientes</p>
            </div>
          ) : (
            <div className="space-y-3">
              {petReminders.slice(0, 1).map((reminder) => (
                <div
                  key={reminder.id}
                  className={`rounded-2xl p-4 border-2 ${getPriorityColor(reminder.priority)}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{reminder.type}</h3>
                        <span className="text-xs px-2 py-0.5 bg-white/50 rounded-full">
                          {getPriorityLabel(reminder.priority)}
                        </span>
                      </div>
                      <p className="text-sm opacity-80">{reminder.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="opacity-80">📅 {reminder.date}</span>
                    <span className="font-medium">
                      {reminder.daysUntil === 0
                        ? "¡Hoy!"
                        : reminder.daysUntil === 1
                        ? "Mañana"
                        : `En ${reminder.daysUntil} días`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="text-lg text-foreground">Historial de visitas</h2>
            </div>
            <button
              onClick={() => navigate("/home/history")}
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              Ver todo
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {petVisits.length === 0 ? (
            <div className="bg-secondary rounded-2xl p-6 text-center">
              <p className="text-muted-foreground">No hay visitas registradas</p>
            </div>
          ) : (
            <div className="space-y-3">
              {petVisits.slice(0, 1).map((visit) => (
                <div
                  key={visit.id}
                  className="bg-white border border-border rounded-2xl p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-foreground font-medium">{visit.reason}</h3>
                      <p className="text-sm text-muted-foreground">{visit.location}</p>
                    </div>
                    <span className="text-sm text-primary">{visit.date}</span>
                  </div>
                  <div className="bg-secondary rounded-xl p-3 mt-2">
                    <p className="text-sm text-foreground">{visit.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => navigate("/home/book")}
          className="w-full bg-primary text-white py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-md flex items-center justify-center gap-2"
        >
          <Calendar className="w-5 h-5" />
          Reservar turno para {selectedPet.name}
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white w-full max-w-lg rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-foreground font-medium">Agregar mascota</h2>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-foreground mb-2">Nombre</label>
                <input
                  type="text"
                  value={newPet.name}
                  onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                  className="w-full border border-border rounded-xl p-3 text-foreground"
                  placeholder="Nombre de tu mascota"
                />
              </div>

              <div>
                <label className="block text-sm text-foreground mb-2">Tipo de mascota</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setNewPet({ ...newPet, species: "Perro" })}
                    className={`flex-1 py-3 rounded-xl border-2 flex items-center justify-center gap-2 ${
                      newPet.species === "Perro" ? "border-primary bg-primary/10" : "border-border"
                    }`}
                  >
                    <Dog className="w-5 h-5" />
                    <span className={newPet.species === "Perro" ? "text-primary" : "text-muted-foreground"}>Perro</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewPet({ ...newPet, species: "Gato" })}
                    className={`flex-1 py-3 rounded-xl border-2 flex items-center justify-center gap-2 ${
                      newPet.species === "Gato" ? "border-primary bg-primary/10" : "border-border"
                    }`}
                  >
                    <Cat className="w-5 h-5" />
                    <span className={newPet.species === "Gato" ? "text-primary" : "text-muted-foreground"}>Gato</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-foreground mb-2">Raza</label>
                <input
                  type="text"
                  value={newPet.breed}
                  onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
                  className="w-full border border-border rounded-xl p-3 text-foreground"
                  placeholder="ej. Golden Retriever"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-foreground mb-2">Edad (años)</label>
                  <input
                    type="number"
                    value={newPet.age}
                    onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
                    className="w-full border border-border rounded-xl p-3 text-foreground"
                    placeholder="ej. 3"
                  />
                </div>
                <div>
                  <label className="block text-sm text-foreground mb-2">Peso (kg)</label>
                  <input
                    type="number"
                    value={newPet.weight}
                    onChange={(e) => setNewPet({ ...newPet, weight: e.target.value })}
                    className="w-full border border-border rounded-xl p-3 text-foreground"
                    placeholder="ej. 25"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-foreground mb-2">Tipo de pelaje</label>
                  <input
                    type="text"
                    value={newPet.furType}
                    onChange={(e) => setNewPet({ ...newPet, furType: e.target.value })}
                    className="w-full border border-border rounded-xl p-3 text-foreground"
                    placeholder="ej. Largo"
                  />
                </div>
                <div>
                  <label className="block text-sm text-foreground mb-2">Color de pelaje</label>
                  <input
                    type="text"
                    value={newPet.furColor}
                    onChange={(e) => setNewPet({ ...newPet, furColor: e.target.value })}
                    className="w-full border border-border rounded-xl p-3 text-foreground"
                    placeholder="ej. Dorado"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  if (newPet.name && newPet.breed) {
                    const pet: Pet = {
                      id: Date.now(),
                      name: newPet.name,
                      species: newPet.species,
                      breed: newPet.breed,
                      age: parseInt(newPet.age) || 0,
                      weight: parseFloat(newPet.weight) || 0,
                      furType: newPet.furType || "No especificado",
                      furColor: newPet.furColor || "No especificado",
                    };
                    setPets([...pets, pet]);
                    setSelectedPet(pet);
                    setShowModal(false);
                    setNewPet({ name: "", species: "Perro", breed: "", age: "", weight: "", furType: "", furColor: "" });
                  }
                }}
                className="w-full bg-primary text-white py-4 rounded-2xl hover:opacity-90 transition-opacity mt-4"
              >
                Agregar mascota
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
