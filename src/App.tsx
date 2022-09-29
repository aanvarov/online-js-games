import React from "react";
import "./App.css";
import PairsGame from "./games/PairsGame/PairsGame";
import { app, analytics } from "./firebase";

function App() {
  console.log(analytics.app.options.appId);

  return (
    <div className="App">
      <PairsGame />
    </div>
  );
}

export default App;
