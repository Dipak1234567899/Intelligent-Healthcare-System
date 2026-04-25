import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

const SPECIALITIES = [
  "General Physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatrician",
  "Neurologist",
  "Gastroenterologist",
];

const badgeColor = (speciality) => {
  switch (speciality) {
    case "General Physician": return "bg-blue-500";
    case "Gynecologist": return "bg-pink-500";
    case "Dermatologist": return "bg-yellow-500";
    case "Pediatrician": return "bg-green-500";
    case "Neurologist": return "bg-purple-500";
    case "Gastroenterologist": return "bg-orange-500";
    default: return "bg-gray-400";
  }
};

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filter, setFilter] = useState(speciality || "");
  const [filteredDocs, setFilteredDocs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFilter(speciality || "");
  }, [speciality]);

  useEffect(() => {
    setFilteredDocs(
      filter
        ? doctors.filter(doc => doc.speciality.toLowerCase() === filter.toLowerCase())
        : doctors
    );
  }, [doctors, filter]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-blue-100 to-purple-100 py-8 px-2">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-900 mb-6 text-center">
          Book an Appointment With Expert Doctors
        </h1>
        {/* Horizontal Scroll Filter Chips */}
        <div className="flex overflow-x-auto gap-2 pb-3 mb-6 scroll-smooth">
          <button
            className={`px-4 py-1.5 rounded-full font-semibold shadow transition-all text-xs 
              ${!filter ? "bg-blue-600 text-white" : "bg-white text-blue-600 border border-blue-200"}`}
            onClick={() => { setFilter(""); navigate("/doctors"); }}
          >
            All
          </button>
          {SPECIALITIES.map((spec) => (
            <button
              key={spec}
              className={`px-4 py-1.5 rounded-full font-semibold shadow transition-all text-xs whitespace-nowrap
                ${filter === spec ? badgeColor(spec) + " text-white" : "bg-white text-slate-700 border border-slate-200"}`}
              onClick={() => { setFilter(spec); navigate(`/doctors/${spec}`); }}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* Larger Doctor Cards with Well-Fitting Image */}
        {filteredDocs.length === 0 ? (
          <div className="text-center text-base text-slate-400 py-16">
            No doctors found for <span className="font-bold text-blue-700">{filter || "All"}</span>.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-9">
            {filteredDocs.map(doc => (
              <div
                key={doc._id}
                tabIndex={0}
                onClick={() => { navigate(`/appointment/${doc._id}`); scrollTo(0, 0); }}
                className="relative group bg-white/90 backdrop-blur-md border border-blue-100 shadow-lg rounded-2xl overflow-hidden transition hover:scale-105 hover:shadow-xl cursor-pointer flex flex-col"
                style={{ minWidth: "255px", maxWidth: "335px", margin: "auto" }}
              >
                {/* Floating badge */}
                <span
                  className={`absolute top-5 left-5 px-4 py-1 rounded-full text-xs font-bold text-white ${badgeColor(doc.speciality)} shadow`}
                >
                  {doc.speciality}
                </span>
                {/* Image completely visible, never head-cut */}
                <div className="w-full flex items-center justify-center bg-gray-100" style={{height: '210px'}}>
                  <img
                    src={doc.image}
                    alt={`Dr. ${doc.name}`}
                    className="h-full object-contain object-top group-hover:scale-105 transition"
                    style={{maxHeight: "200px", width: "auto", maxWidth: "90%"}}
                  />
                </div>
                {/* Card details */}
                <div className="px-6 py-6 flex flex-col gap-2 flex-1">
                  <div className="flex gap-2 items-center mb-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${doc.available ? "bg-green-500" : "bg-gray-400"}`}/>
                    <span className={`text-xs font-medium ${doc.available ? "text-green-700" : "text-gray-400"}`}>
                      {doc.available ? "Available" : "Not Available"}
                    </span>
                  </div>
                  <h2 className="text-base md:text-lg font-bold text-blue-800 truncate">{doc.name}</h2>
                  <div className="text-[13px] text-blue-600 mb-3 truncate">{doc.speciality}</div>
                  <button
                    className="mt-auto w-full px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[14px] shadow hover:from-blue-700"
                    onClick={e => { e.stopPropagation(); navigate(`/appointment/${doc._id}`); scrollTo(0, 0); }}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;


