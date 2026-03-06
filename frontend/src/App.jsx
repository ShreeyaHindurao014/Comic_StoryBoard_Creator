import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import CreateComicPage from "./pages/CreateComicPage";
import ComicDetailsPage from "./pages/ComicDetailsPage";
import EditPage from "./pages/EditPage";
import ComicViewPage from "./pages/ComicViewPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-base-200">

        {/* Navbar visible everywhere */}
        <Navbar />

        {/* Page Container */}
        <main className="max-w-7xl mx-auto px-6 py-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreateComicPage />} />
            <Route path="/comic/:id" element={<ComicDetailsPage />} />
            <Route path="/comic-view/:id" element={<ComicViewPage />} />
            <Route path="/edit/:id" element={<EditPage />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;