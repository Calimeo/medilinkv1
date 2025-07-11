import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  User,
  CalendarDays,
  Clock,
  Info,
  XCircle,
} from "lucide-react";

const PatientAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/appoitment/patient", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAppointments(res.data.appointments);
    } catch (err) {
      console.error("Erreur lors de la récupération :", err);
    }
  };

  const cancelAppointment = async (id) => {
    if (!window.confirm("Annuler ce rendez-vous ?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/v1/appoitment/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAppointments(appointments.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Erreur lors de l'annulation :", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Mes Rendez-vous</h1>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-600">Aucun rendez-vous trouvé.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((a) => (
            <div key={a._id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all">
              <div className="flex items-center mb-2 gap-2">
                <User className="text-blue-600 w-5 h-5" />
                <span className="font-semibold">
                  Dr. {a.doctor.firstName} {a.doctor.lastName}
                </span>
              </div>
              <div className="flex items-center mb-1 gap-2 text-sm text-gray-600">
                <CalendarDays className="w-4 h-4" />
                <span>{new Date(a.appointment_date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center mb-3 gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Heure : {a.time || "—"}</span>
              </div>
              <span className="inline-block px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                {a.status || "en attente"}
              </span>
              <div className="flex justify-between items-center mt-4 text-sm">
                <button
                  onClick={() => setSelected(a)}
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Info className="w-4 h-4" />
                  Détails
                </button>
                <button
                  onClick={() => cancelAppointment(a._id)}
                  className="text-red-600 hover:underline flex items-center gap-1"
                >
                  <XCircle className="w-4 h-4" />
                  Annuler
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold text-blue-700 mb-3">Détails du rendez-vous</h2>
            <p><strong>Médecin :</strong> Dr. {selected.doctor.firstName} {selected.doctor.lastName}</p>
            <p><strong>Date :</strong> {new Date(selected.appointment_date).toLocaleDateString()}</p>
            <p><strong>Département :</strong> {selected.department}</p>
            <p><strong>Nom :</strong> {selected.firstName} {selected.lastName}</p>
            <p><strong>Email :</strong> {selected.email}</p>
            <p><strong>Téléphone :</strong> {selected.phone}</p>
            <p><strong>Adresse :</strong> {selected.address}</p>
            <p><strong>Statut :</strong> {selected.status || "en attente"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientAppointmentsPage;
