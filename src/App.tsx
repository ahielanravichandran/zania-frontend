import { useCallback, useState } from "react";
import "./App.css";
import { CardsList } from "./components/CardsList";
import PeekCard from "./components/PeekCard";

function App() {
  const [selectedCardType, setSelectedCardType] = useState<string>("");

  const openClosePeek = useCallback((type: string) => {
    setSelectedCardType(type);
  }, []);

  return (
    <>
      {selectedCardType && (
        <PeekCard type={selectedCardType} onClose={openClosePeek} />
      )}
      <CardsList onCardClick={openClosePeek} />
    </>
  );
}

export default App;
