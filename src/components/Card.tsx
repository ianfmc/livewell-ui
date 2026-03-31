type CardProps = {
  title: string;
  subtitle: string;
};

const Card = ({ title, subtitle }: CardProps) => (
  <div
    style={{
      border: "1px solid #ddd",
      borderRadius: "12px",
      padding: "1rem",
      width: "250px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    }}
  >
    <h3>{title}</h3>
    <p>{subtitle}</p>
    <button>Info</button>
  </div>
);

export default Card;