import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/axios";
import { Loader, ArrowLeft } from "lucide-react";

const ComicViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComic = async () => {
      try {
        const res = await api.get(`/records/${id}`);
        setComic(res.data);
      } catch (error) {
        console.error("Error fetching comic", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComic();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin size-10 text-primary" />
      </div>
    );
  }

  if (!comic) return null;

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate("/")}
          className="btn btn-ghost"
        >
          <ArrowLeft className="size-4" />
          Back
        </button>

        <button
          onClick={() => navigate(`/edit/${comic._id}`)}
          className="btn btn-primary"
        >
          Edit Comic
        </button>
      </div>

      {/* COMIC DETAILS */}
      <div className="card bg-base-100 shadow-xl p-8 mb-10">

        <h1 className="text-4xl font-bold text-primary mb-3">
          {comic.title}
        </h1>

        <p className="text-lg text-base-content/70 mb-4">
          {comic.description}
        </p>

        <div className="flex flex-wrap gap-3 mt-4">

          <span className="badge badge-outline">
            ID: {comic.recordId}
          </span>

          <span className="badge badge-info">
            Creator: {comic.creatorName}
          </span>

          <span className="badge badge-secondary">
            {comic.type}
          </span>

          <span className="badge badge-accent">
            {comic.status}
          </span>

          <span className="badge badge-ghost">
            {new Date(comic.createdAt).toLocaleDateString()}
          </span>

        </div>
      </div>

      {/* PANELS */}
      <h2 className="text-3xl font-bold text-secondary mb-6">
        📖 Storyboard Panels
      </h2>

      {comic.panels && comic.panels.length > 0 ? (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {comic.panels.map((panel, index) => (

            <div
              key={index}
              className="bg-white border-[6px] border-black rounded-lg shadow-lg p-4 relative hover:scale-105 transition"
            >

              {/* PANEL NUMBER */}
              <div className="absolute -top-3 -left-3 bg-black text-white text-xs px-3 py-1 rounded-full">
                Panel {panel.panelOrder || index + 1}
              </div>

              {/* CAPTION */}
              {panel.captionText && (
                <div className="bg-yellow-200 border border-black p-2 text-sm font-semibold mb-3">
                  {panel.captionText}
                </div>
              )}

              {/* PANEL SPACE */}
              <div className="h-40 bg-gray-100 border border-dashed border-gray-400 flex items-center justify-center text-gray-400 text-sm mb-4">
                Comic Scene
              </div>

              {/* DIALOGUE BUBBLE */}
              {panel.dialogueText && (
                <div className="relative bg-white border-2 border-black rounded-xl p-3 text-sm">

                  💬 {panel.dialogueText}

                  {/* Bubble Tail */}
                  <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white border-l-2 border-b-2 border-black rotate-45"></div>

                </div>
              )}

            </div>

          ))}

        </div>

      ) : (

        <p className="text-base-content/60">
          No panels created yet.
        </p>

      )}

    </div>
  );
};

export default ComicViewPage;