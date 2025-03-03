import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:userId" element={<Home />} />
    </Routes>
  </Router>
);

export default AppRoutes;
