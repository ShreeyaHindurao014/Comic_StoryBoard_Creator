import { useNavigate } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";

const ComicCard = ({ comic, setComics }) => {
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.stopPropagation();

    if (!window.confirm("Delete this comic?")) return;

    try {
      await api.delete(`/records/${comic._id}`);

      setComics((prev) =>
        prev.filter((c) => c._id !== comic._id)
      );

      toast.success("Comic deleted");
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("Failed to delete comic");
    }
  };

  return (
    <div
      onClick={() => navigate(`/comic/${comic._id}`)}
      className="cursor-pointer rounded-2xl bg-gradient-to-br 
      from-primary/20 to-secondary/20 
      p-6 border-2 border-primary 
      shadow-lg hover:scale-105 
      hover:shadow-2xl transition-all duration-300"
    >

      {/* TITLE */}
      <h2 className="text-2xl font-extrabold text-primary mb-2">
        {comic.title}
      </h2>

      {/* CREATOR */}
      <p className="text-sm text-base-content/70 mb-2">
        by {comic.creatorName}
      </p>

      {/* DESCRIPTION */}
      <p className="text-base-content/80 line-clamp-2 mb-4">
        {comic.description}
      </p>

      {/* PANEL PREVIEW */}
      {comic.panels?.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-4">

          {comic.panels.slice(0, 3).map((panel, index) => (
            <div
              key={index}
              className="bg-black border-2 border-black rounded-md p-2 text-xs h-16 overflow-hidden flex flex-col justify-center"
            >

              {panel.captionText && (
                <div className="font-bold text-[10px] truncate">
                  {panel.captionText}
                </div>
              )}

              {panel.dialogueText && (
                <div className="italic text-[10px] truncate">
                  💬 {panel.dialogueText}
                </div>
              )}

            </div>
          ))}

        </div>
      )}

      {/* FOOTER */}
      <div className="flex justify-between items-center mt-4">

        <span className="badge badge-accent badge-lg">
          {comic.status}
        </span>

        <div className="flex gap-2">

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/edit/${comic._id}`);
            }}
            className="btn btn-sm btn-primary"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="btn btn-sm btn-error"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
};

export default ComicCard;