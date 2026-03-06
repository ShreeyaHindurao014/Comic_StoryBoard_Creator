import React, { useEffect, useState } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import ComicCard from "../components/ComicCard.jsx";
import ComicNotFound from "../components/ComicNotFound.jsx";
import { Loader, Search } from "lucide-react";

const HomePage = () => {
  const [comics, setComics] = useState([]);
  const [filteredComics, setFilteredComics] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  /* FETCH COMICS */
  useEffect(() => {
    const fetchComics = async () => {
      try {
        const res = await api.get("/records");
        setComics(res.data);
        setFilteredComics(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load comics");
      } finally {
        setLoading(false);
      }
    };

    fetchComics();
  }, []);

  /* SEARCH + FILTER */
  useEffect(() => {
    let filtered = comics;

    if (search) {
      filtered = filtered.filter((comic) =>
        comic.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter(
        (comic) => comic.status === statusFilter
      );
    }

    setFilteredComics(filtered);
  }, [search, statusFilter, comics]);

  return (
    <div className="min-h-screen bg-base-200">

      {/* HERO */}
      <section className="text-center py-16 px-4 bg-base-100 shadow-sm">
        <h1 className="text-5xl font-extrabold text-primary mb-4">
          Comic Storyboard Creator 🎨
        </h1>

        <p className="text-base-content/70 max-w-xl mx-auto">
          Create, manage and publish your own comic stories.
          Add panels, dialogues and captions easily.
        </p>
      </section>

      <div className="max-w-7xl mx-auto p-6">

        {/* SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">

          {/* Search */}
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-3 size-4 text-base-content/50" />
            <input
              type="text"
              placeholder="Search comics..."
              className="input input-bordered w-full pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filter */}
          <select
            className="select select-bordered w-full md:w-48"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Comics</option>
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex justify-center py-20">
            <Loader className="animate-spin size-10 text-primary" />
          </div>
        )}

        {/* EMPTY */}
        {!loading && filteredComics.length === 0 && (
          <ComicNotFound />
        )}

        {/* COMICS GRID */}
        {!loading && filteredComics.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredComics.map((comic) => (
              <ComicCard
                key={comic._id}
                comic={comic}
                setComics={setComics}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default HomePage;