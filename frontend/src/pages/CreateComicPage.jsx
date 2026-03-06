import api from "../lib/axios";
import { ArrowLeft, Plus, Trash } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const CreateComicPage = () => {

  const [title, setTitle] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Draft");

  const [panels, setPanels] = useState([
    { caption: "", dialogue: "" }
  ]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* ADD PANEL */
  const addPanel = () => {
    setPanels([...panels, { caption: "", dialogue: "" }]);
  };

  /* REMOVE PANEL */
  const removePanel = (index) => {
    const updated = [...panels];
    updated.splice(index, 1);
    setPanels(updated);
  };

  /* PANEL CHANGE */
  const handlePanelChange = (index, field, value) => {
    const updated = [...panels];
    updated[index][field] = value;
    setPanels(updated);
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !creatorName.trim() || !email.trim()) {
      toast.error("Please fill required fields");
      return;
    }

    setLoading(true);

    try {

      const formattedPanels = panels.map((panel, index) => ({
        panelOrder: index + 1,
        captionText: panel.caption,
        dialogueText: panel.dialogue
      }));

      await api.post("/records", {
        recordId: "COMIC-" + Date.now(),
        title,
        creatorName,
        email,
        description,
        status,
        panels: formattedPanels
      });

      toast.success("Comic created successfully!");
      navigate("/");

    } catch (error) {
      console.log("Error creating comic", error);
      toast.error("Failed to create comic.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">

      <Link to="/" className="btn btn-ghost mb-6">
        <ArrowLeft className="size-4" />
        Back to Comics
      </Link>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">

          <h2 className="card-title text-2xl mb-4">
            🎨 Create New Comic
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* TITLE */}
            <input
              type="text"
              placeholder="Comic Title"
              className="input input-bordered w-full"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              required
            />

            {/* CREATOR */}
            <input
              type="text"
              placeholder="Creator Name"
              className="input input-bordered w-full"
              value={creatorName}
              onChange={(e)=>setCreatorName(e.target.value)}
              required
            />

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Creator Email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />

            {/* DESCRIPTION */}
            <textarea
              placeholder="Comic Description"
              className="textarea textarea-bordered w-full"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
            />

            {/* STATUS */}
            <select
              className="select select-bordered w-full"
              value={status}
              onChange={(e)=>setStatus(e.target.value)}
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>

            

            {/* SUBMIT */}
            <div className="text-right">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Comic"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateComicPage;