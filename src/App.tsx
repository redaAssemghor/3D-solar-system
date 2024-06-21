import Header from "./components/Header";
import AnnouncementsBar from "./components/AnnouncementsBar.";
import SimulationPage from "./pages/SimulationPage";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <AnnouncementsBar />
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/simulation" element={<SimulationPage />} />
      </Routes>
    </div>
  );
}

export default App;
