import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Leaderboard from "@/pages/Leaderboard";
import ManageSummoners from "@/pages/ManageSummoners";
import SummonerDetail from "@/pages/SummonerDetail";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Leaderboard />} />
          <Route path="/gestion" element={<ManageSummoners />} />
          <Route path="/invocador/:id" element={<SummonerDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
