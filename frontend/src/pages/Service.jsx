import { useNavigate } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";
// import "./Service.css";

export default function Service() {
  const navigate = useNavigate();

  const services = [
    { title: "AI Diagnosis", desc: "Check disease using symptoms", path: "/diagnosis" },
    { title: "Image Detection", desc: "Upload image for disease detection", path: "/image" },
    { title: "Dashboard", desc: "View your health data", path: "/dashboard" },
    { title: "Chatbot", desc: "Ask health questions", path: "/chatbot" },
  ];

  return (
    <div className="container">
      <h1>Our Services</h1>
      <div className="grid">
        {services.map((s, i) => (
          <ServiceCard
            key={i}
            title={s.title}
            desc={s.desc}
            onClick={() => navigate(s.path)}
          />
        ))}
      </div>
    </div>
  );
}