import Header from "./components/Header";
import AnnouncementsBar from "./components/AnnouncementsBar.";
import SimulationPage from "./pages/SimulationPage";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="overflow-hidden">
      <AnnouncementsBar />
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/simulation" element={<SimulationPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
