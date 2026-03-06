import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { Loader, Trash2, ArrowLeft } from "lucide-react";

const ComicDetailPage = () => {
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch Comic
  useEffect(() => {
    const fetchComic = async () => {
      try {
        const res = await api.get(`/records/${id}`);
        setComic({
          ...res.data,
          panels: res.data.panels || [],
        });
      } catch (error) {
        toast.error("Failed to fetch comic");
      } finally {
        setLoading(false);
      }
    };
    fetchComic();
  }, [id]);

 // Delete Comic
  const handleDelete = async () => {
    if (confirmtoast("Delete this comic?")) return;

    try {
      await api.delete(`/records/${id}`);
      toast.success("Comic deleted");
      navigate("/");
    } catch {
      toast.error("Delete failed");
    }
  };

  // Save Comic (INCLUDING PANELS)
  const handleSave = async () => {
    if (!comic.title.trim() || !comic.creatorName.trim()) {
      toast.error("Title and Creator required");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/records/${id}`, comic);
      toast.success("Comic updated successfully");
      navigate("/");
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin size-10 text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="btn btn-ghost">
          <ArrowLeft className="size-4" />
          Back to Comics
        </Link>

        <button onClick={handleDelete} className="btn btn-error btn-outline">
          <Trash2 className="size-4" />
          Delete Comic
        </button>
      </div>

      {/* Main Card */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body space-y-4">

          {/* Title */}
          <input
            type="text"
            className="input input-bordered"
            value={comic.title}
            onChange={(e) =>
              setComic({ ...comic, title: e.target.value })
            }
            placeholder="Comic Title"
          />

          {/* Creator */}
          <input
            type="text"
            className="input input-bordered"
            value={comic.creatorName}
            onChange={(e) =>
              setComic({ ...comic, creatorName: e.target.value })
            }
            placeholder="Creator Name"
          />

          {/* Description */}
          <textarea
            className="textarea textarea-bordered"
            rows="3"
            value={comic.description}
            onChange={(e) =>
              setComic({ ...comic, description: e.target.value })
            }
            placeholder="Description"
          />

          {/* Status */}
          <select
            className="select select-bordered"
            value={comic.status}
            onChange={(e) =>
              setComic({ ...comic, status: e.target.value })
            }
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
{/* ================= PANELS SECTION ================= */}
<div className="mt-6">
  <h2 className="text-xl font-bold text-secondary mb-4">
    📖 Storyboard Panels
  </h2>

  {comic.panels.map((panel, index) => (
    <div
      key={index}
      className="bg-base-200 p-4 rounded-xl border border-secondary mb-4 space-y-2"
    >
      <h3 className="font-semibold">
        Panel {index + 1}
      </h3>

      {/* Caption */}
      <input
        type="text"
        className="input input-bordered w-full"
        placeholder="Caption (scene description)"
        value={panel.captionText || ""}
        onChange={(e) => {
          const updated = [...comic.panels];
          updated[index].captionText = e.target.value;
          setComic({ ...comic, panels: updated });
        }}
      />

      {/* Dialogue */}
      <textarea
        className="textarea textarea-bordered w-full"
        placeholder="Dialogue"
        value={panel.dialogueText || ""}
        onChange={(e) => {
          const updated = [...comic.panels];
          updated[index].dialogueText = e.target.value;
          setComic({ ...comic, panels: updated });
        }}
      />

      <button
        type="button"
        onClick={() => {
          const updated = comic.panels.filter((_, i) => i !== index);
          setComic({ ...comic, panels: updated });
        }}
        className="btn btn-xs btn-error"
      >
        Remove Panel
      </button>
    </div>
  ))}

  <button
    type="button"
    onClick={() =>
      setComic({
        ...comic,
        panels: [
          ...comic.panels,
          {
            panelOrder: comic.panels.length + 1,
            dialogueText: "",
            captionText: ""
          }
        ]
      })
    }
    className="btn btn-outline btn-primary"
  >
    + Add Panel
  </button>
</div>
          {/* Save */}
          <div className="card-actions justify-end pt-6">
            <button
              className="btn btn-primary"
              disabled={saving}
              onClick={handleSave}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ComicDetailPage;