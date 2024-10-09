import Header from "./components/Header";
import AnnouncementsBar from "./components/AnnouncementsBar.";
import SimulationPage from "./pages/SimulationPage";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Footer from "./components/Footer";
import Newsletter from "./pages/NewsLetter";
import IssPage from "./pages/IssPage";
import VenusPage from "./pages/SaturnPage";
import Scope from "./pages/Scope";
import NotFoundPage from "./components/PageNotFound";
import FooterInfo from "./components/FooterInfo";
import Slider from "./components/Slider";

function App() {
  return (
    <div className="overflow-hidden bg-black">
      <AnnouncementsBar />
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <MainPage />
              <Slider />
            </>
          }
        />
        <Route path="/simulation" element={<SimulationPage />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/iss-info" element={<IssPage />} />
        <Route path="/saturn-info" element={<VenusPage />} />
        <Route path="/scop" element={<Scope />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <FooterInfo />
      <Footer />
    </div>
  );
}

export default App;
