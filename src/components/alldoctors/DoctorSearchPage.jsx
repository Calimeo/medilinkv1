import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUserPlus, FaUserMinus, FaEnvelope, FaSearch } from "react-icons/fa";
import ChatModal from "../ChatModal.jsx";
import API from "@/axios/axios";

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
      const { data } = await API.get(`/api/v1/user/search?query=${query}`, {
        withCredentials: true,
      });
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
        ? `/api/v1/user/unfollow/${doctorId}`
        : `/api/v1/user/follow/${doctorId}`;

      const { data } = await API.put(url, {}, { withCredentials: true });

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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-emerald-700 mb-8">
          🔍 Recherche de médecins
        </h1>

        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row items-center gap-4 mb-8"
        >
          <input
            type="text"
            placeholder="Nom, spécialité, email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full sm:w-2/3 px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
          <button
            type="submit"
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-full transition shadow-md"
          >
            <FaSearch />
            Rechercher
          </button>
        </form>

        {loading && (
          <p className="text-center text-gray-500 text-lg">Chargement...</p>
        )}

        {!loading && results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((doctor, index) => (
              <div
                key={doctor._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
              >
                <img
                  src={doctor.docAvatar?.url || "/doctor-placeholder.png"}
                  alt={`${doctor.firstName} ${doctor.lastName}`}
                  className="w-full h-44 object-cover"
                />
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      Dr. {doctor.firstName} {doctor.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">{doctor.email}</p>
                    <p className="text-sm text-gray-600">📞 {doctor.phone}</p>
                    <p className="text-sm text-indigo-700 mt-2">
                      Département :{" "}
                      <span className="font-medium">
                        {doctor.doctorDepartment || "Non spécifié"}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-3 mt-5 flex-wrap">
                    <button
                      onClick={() =>
                        toggleFollow(doctor._id, doctor.followed, index)
                      }
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full transition text-white shadow ${
                        doctor.followed
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {doctor.followed ? (
                        <>
                          <FaUserMinus />
                          Ne plus suivre
                        </>
                      ) : (
                        <>
                          <FaUserPlus />
                          Suivre
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setChatDoctor(doctor)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition shadow"
                    >
                      <FaEnvelope />
                      Contacter
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && results.length === 0 && query && (
          <p className="text-center text-gray-500 mt-10">
            Aucun médecin trouvé pour « {query} »
          </p>
        )}
      </div>

      {chatDoctor && (
        <ChatModal doctor={chatDoctor} onClose={() => setChatDoctor(null)} />
      )}
    </div>
  );
};

export default DoctorSearchPage;
