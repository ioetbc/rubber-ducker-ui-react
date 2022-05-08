import React from "react";
import { RubberDuckerContextProvider } from "../context/RubberDuckerContext";
import { App } from "./App";

function Sidebar() {
  return (
    <RubberDuckerContextProvider>
      <App />
    </RubberDuckerContextProvider>
  );
}

export default Sidebar;
