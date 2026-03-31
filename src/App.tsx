import Card from "./components/Card";
import { mockData } from "./data/mockData";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>LIVEWELL</h1>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          marginTop: "2rem",
        }}
      >
        {mockData.map((card, index) => (
          <Card key={index} title={card.title} subtitle={card.subtitle} />
        ))}
      </div>
    </div>
  );
}

export default App;