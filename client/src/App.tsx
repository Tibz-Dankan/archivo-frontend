import { useState } from "react";
import "./App.css";
import { SignUp } from "./pages/SignUp";

const App: React.FC = (): JSX.Element => {
  return (
    <div className="App">
      <p>In the main component</p>
      <p>SignUp</p>
      <SignUp />
    </div>
  );
};

export default App;
