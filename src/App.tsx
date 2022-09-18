import { Route, Routes } from "react-router-dom";
import "./App.css";
import Admin from "./pages/admin";

import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}

export default App;
