import { Routes, Route } from "react-router-dom";
import "./App.css";

import Page from "./pages/Page";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Page />} />
      </Routes>
    </>
  );
}

export default App;
