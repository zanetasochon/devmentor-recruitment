import { Navigate, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { RecruitmentLandingPage } from "./pages/RecruitmentLandingPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RecruitmentLandingPage />} />
      <Route path="/rekrutacja" element={<RecruitmentLandingPage />} />
      <Route path="/audyt" element={<LandingPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
