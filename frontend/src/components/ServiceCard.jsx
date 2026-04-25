// import "./ServiceCard.css";

export default function ServiceCard({ title, desc, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <h3>{title}</h3>
      <p>{desc}</p>
      <button>Explore</button>
    </div>
  );
}