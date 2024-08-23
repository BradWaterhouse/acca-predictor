import React from "react";
import ReactDOM from "react-dom/client";
import "../src/assets/css/index.css";
import App from "../src/components/App";
import "bulma/css/bulma.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
