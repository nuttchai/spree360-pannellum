import React from "react";
import "./styles.css";
import TestBox from "./partials/TestBox";

export default function App() {
  return (
    <div className="App">
      <div style={{ paddingTop: "12px" }}>
        <img
          src={require("./assets/rentspree-icon.png")}
          alt="rentspree logo"
          height={60}
        />
      </div>
      <TestBox />
    </div>
  );
}
