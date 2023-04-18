import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "./index.css";
import { Providers } from "./providers/Providers";
import { store } from "./store/index";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>
    </Providers>
  </React.StrictMode>
);
