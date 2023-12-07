import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";

import "./index.css";
import "./fonts/fonts.css";
import "./components/ui/common.css";
import "./components/ui/box.css";

import App from "./components/app/app";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
    <BrowserRouter>
      <App/>
    </BrowserRouter>
)
