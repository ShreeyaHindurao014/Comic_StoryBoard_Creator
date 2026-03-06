import { Link } from "react-router-dom";
import { Plus, BookOpen } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-base-200 border-b border-base-300 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">

        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-extrabold text-primary hover:scale-105 transition"
          >
            <BookOpen className="size-7" />
            ComicBoard
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-3">

            <Link
              to="/"
              className="btn btn-ghost hover:bg-primary/10"
            >
              Home
            </Link>

            <Link
              to="/create"
              className="btn btn-primary flex items-center gap-2 shadow-md hover:scale-105 transition"
            >
              <Plus className="size-4" />
              New Comic
            </Link>

          </div>

        </div>

      </div>
    </header>
  );
};

export default Navbar;