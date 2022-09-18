import { Route, Routes } from "react-router-dom";
import "./App.css";
import Settings from "./pages/settings";

import Home from "./pages/Home";
import Ranking from "./pages/ranking";
import { Box } from "@mui/material";

function App() {
  return (
    <Box>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="settings" element={<Settings />} />
          <Route path="ranking" element={<Ranking />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
