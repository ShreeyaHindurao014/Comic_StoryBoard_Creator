import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const ComicNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center max-w-md mx-auto space-y-6">

      {/* Icon */}
      <div className="bg-primary/20 p-8 rounded-full shadow-md animate-pulse">
        <BookOpen className="size-12 text-primary" />
      </div>

      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold">
        No Comics Yet 🎭
      </h2>

      {/* Description */}
      <p className="text-base-content/70 text-lg">
        Your storyboard universe is empty.
        Start creating your first comic and bring your imagination to life!
      </p>

      {/* Button */}
      <Link
        to="/create"
        className="btn btn-primary btn-lg shadow-lg hover:scale-105 transition"
      >
        Create Your First Comic 🚀
      </Link>

    </div>
  );
};

export default ComicNotFound;