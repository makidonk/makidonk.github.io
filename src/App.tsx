import { Route, Routes } from "react-router";
import { ScrollManager } from "./components/ScrollManager";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProjectPage } from "./pages/ProjectPage";
import { ProjectsPage } from "./pages/ProjectsPage";

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
