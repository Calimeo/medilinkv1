import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import API from "@/axios/axios.js";
const AppointmentLocation = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Pediatrics");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);
  const [doctors, setDoctors] = useState([]);

  const departmentsArray = [
    "Pediatrics", "Orthopedics", "Cardiology", "Neurology", "Oncology",
    "Radiology", "Physical Therapy", "Dermatology", "ENT",
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await API.get(
          "/api/v1/user/doctors",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDoctors(data.doctors || []);
      } catch (error) {
        console.error("Erreur lors du chargement des docteurs:", error);
        toast.error("Échec du chargement des docteurs.");
      }
    };

    fetchDoctors();
  }, []);

  const handleAppointment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Vous devez être connecté pour réserver.");
      return;
    }

    try {
      const { data } = await API.post(
        "/api/v1/appoitment/post",
        {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          appointment_date: appointmentDate,
          department,
          doctor_firstName: doctorFirstName,
          doctor_lastName: doctorLastName,
          hasVisited,
          address,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(data.message);
      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setNic("");
      setDob("");
      setGender("");
      setAppointmentDate("");
      setDepartment("Pediatrics");
      setDoctorFirstName("");
      setDoctorLastName("");
      setHasVisited(false);
      setAddress("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur de soumission");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8 mt-10">
      <h2 className="text-3xl font-semibold text-center text-cyan-800 mb-6">
        Book an Appointment
      </h2>

      <form onSubmit={handleAppointment} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="First Name" className="input-field"
            value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input type="text" placeholder="Last Name" className="input-field"
            value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="email" placeholder="Email" className="input-field"
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="text" placeholder="Mobile Number" className="input-field"
            value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="NIC" className="input-field"
            value={nic} onChange={(e) => setNic(e.target.value)} />
          <input type="date" className="input-field"
            value={dob} onChange={(e) => setDob(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select className="input-field" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input type="date" className="input-field"
            value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            className="input-field"
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setDoctorFirstName("");
              setDoctorLastName("");
            }}
          >
            {departmentsArray.map((dept, idx) => (
              <option key={idx} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            className="input-field"
            value={`${doctorFirstName} ${doctorLastName}`}
            onChange={(e) => {
              const [first, ...rest] = e.target.value.split(" ");
              setDoctorFirstName(first || "");
              setDoctorLastName(rest.join(" ") || "");
            }}
          >
            <option value="">Select Doctor</option>
            {(doctors || [])
              .filter((doc) =>
  doc?.doctorDepartment?.trim().toLowerCase() === department.trim().toLowerCase()
)
            .map((doc, i) => (
                <option key={i} value={`${doc.firstName} ${doc.lastName}`}>
                  {doc.firstName} {doc.lastName}
                </option>
              ))}
          </select>
        </div>

        <input
          type="text"
          className="input-field w-full"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <div className="flex items-center gap-3">
          <label className="text-gray-700">Have you visited before?</label>
          <input
            type="checkbox"
            checked={hasVisited}
            onChange={(e) => setHasVisited(e.target.checked)}
            className="h-5 w-5"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-cyan-700 text-white font-semibold py-2 px-6 rounded-lg hover:bg-cyan-800 transition"
          >
            Envoi
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentLocation;
