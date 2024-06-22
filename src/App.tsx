import Header from "./components/Header";
import AnnouncementsBar from "./components/AnnouncementsBar.";
import SimulationPage from "./pages/SimulationPage";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Footer from "./components/Footer";
import RandomQuote from "./components/RandomQuote";
import Newsletter from "./pages/NewsLetter";

function App() {
  return (
    <div className="overflow-hidden">
      <AnnouncementsBar />
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <MainPage />
              <RandomQuote />
            </>
          }
        />
        <Route path="/simulation" element={<SimulationPage />} />
        <Route path="/newsletter" element={<Newsletter />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
