import { Routes, Route } from "react-router-dom";
import "./App.css";

import Page from "./pages/Page";
import BlankPage from "./pages/BlankPage";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Page />} />
        <Route exact path="/blankpage" element={<BlankPage />} />
      </Routes>
    </>
  );
}

export default App;
