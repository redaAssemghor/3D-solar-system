import Header from "./components/Header";
import SimulationPage from "./pages/SimulationPage";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import IssPage from "./pages/IssPage";
import VenusPage from "./pages/SaturnPage";
import Scope from "./pages/Scope";
import NotFoundPage from "./components/PageNotFound";
import FooterInfo from "./components/FooterInfo";
import Slider from "./components/Slider";

function App() {
  return (
    <div className="min-h-screen overflow-hidden bg-black">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Slider />
          }
        />
        <Route path="/simulation" element={<SimulationPage />} />
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
