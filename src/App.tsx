import React from "react";
import "./App.css";
import PairsGame from "./games/PairsGame/PairsGame";
import { getAnalytics } from "firebase/analytics";
import { app } from "./firebase";

function App() {
  getAnalytics(app);
  return (
    <div className="App">
      <PairsGame />
    </div>
  );
}

export default App;
