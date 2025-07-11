import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUserPlus, FaUserMinus, FaEnvelope } from "react-icons/fa";
import ChatModal from "../ChatModal.jsx"; // adapte ce chemin si besoin

const DoctorSearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatDoctor, setChatDoctor] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return toast.warn("Veuillez entrer un mot-clé");

    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/user/search?query=${query}`,
        { withCredentials: true }
      );
      const updated = data.doctors.map((doc) => ({ ...doc, followed: false }));
      setResults(updated);
    } catch (error) {
      toast.error("Erreur lors de la recherche");
    } finally {
      setLoading(false);
    }
  };

  const toggleFollow = async (doctorId, isFollowed, index) => {
    try {
      const url = isFollowed
        ? `http://localhost:4000/api/v1/user/unfollow/${doctorId}`
        : `http://localhost:4000/api/v1/user/follow/${doctorId}`;

      const { data } = await axios.put(url, {}, { withCredentials: true });

      toast.success(data.message);

      setResults((prev) =>
        prev.map((doc, i) =>
          i === index ? { ...doc, followed: !isFollowed } : doc
        )
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur lors du suivi du médecin"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-emerald-700 mb-10">
          Recherche de médecins
        </h1>

        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row gap-4 mb-10"
        >
          <input
            type="text"
            placeholder="Nom, spécialité, email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700 transition"
          >
            Rechercher
          </button>
        </form>

        {loading && <p className="text-center text-gray-600">Chargement...</p>}

        {!loading && results.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((doctor, index) => (
              <div
                key={doctor._id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={doctor.docAvatar?.url || "/doctor-placeholder.png"}
                  alt={`${doctor.firstName} ${doctor.lastName}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Dr. {doctor.firstName} {doctor.lastName}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{doctor.email}</p>
                  <p className="text-sm text-gray-600">📞 {doctor.phone}</p>
                  <p className="text-sm text-indigo-700 mt-2 font-medium">
                    Département : {doctor.doctorDepartment || "Non spécifié"}
                  </p>
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() =>
                        toggleFollow(doctor._id, doctor.followed, index)
                      }
                      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full transition text-white ${
                        doctor.followed
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {doctor.followed ? (
                        <>
                          <FaUserMinus className="text-lg" />
                          Ne plus suivre
                        </>
                      ) : (
                        <>
                          <FaUserPlus className="text-lg" />
                          Suivre
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setChatDoctor(doctor)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition"
                    >
                      <FaEnvelope className="text-lg" />
                      Contacter
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && results.length === 0 && query && (
          <p className="text-center text-gray-500">
            Aucun médecin trouvé pour « {query} »
          </p>
        )}
      </div>

      {/* Modal de chat */}
      {chatDoctor && (
        <ChatModal doctor={chatDoctor} onClose={() => setChatDoctor(null)} />
      )}
    </div>
  );
};

export default DoctorSearchPage;
