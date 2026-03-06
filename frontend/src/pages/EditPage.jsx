import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/axios";
import { ArrowLeft, Trash, Plus } from "lucide-react";

const EditPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    creatorName: "",
    description: "",
    status: "Draft",
  });

  const [panels, setPanels] = useState([]);

  const [loading, setLoading] = useState(true);

  /* FETCH COMIC */
  useEffect(() => {
    const fetchComic = async () => {
      try {

        const res = await api.get(`/records/${id}`);

        setForm({
          title: res.data.title,
          creatorName: res.data.creatorName,
          description: res.data.description,
          status: res.data.status,
        });

        setPanels(res.data.panels || []);

      } catch (error) {
        console.error("Error fetching comic", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComic();
  }, [id]);

  /* HANDLE PANEL CHANGE */
  const handlePanelChange = (index, field, value) => {

    const updatedPanels = [...panels];

    updatedPanels[index][field] = value;

    setPanels(updatedPanels);
  };

  /* ADD PANEL */
  const addPanel = () => {

    setPanels([
      ...panels,
      {
        panelOrder: panels.length + 1,
        captionText: "",
        dialogueText: "",
      },
    ]);

  };

  /* REMOVE PANEL */
  const removePanel = (index) => {

    const updated = panels.filter((_, i) => i !== index);

    setPanels(updated);

  };

  /* SAVE */
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.put(`/records/${id}`, {
        ...form,
        panels,
      });

      navigate(`/comic/${id}`);

    } catch (error) {
      console.error("Update failed", error);
    }

  };

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">

      <button
        onClick={() => navigate(`/comic/${id}`)}
        className="btn btn-ghost mb-6"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div className="card bg-base-100 shadow-xl p-8 border border-primary">

        <h2 className="text-3xl font-bold text-primary mb-6">
          Edit Comic
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* TITLE */}
          <input
            className="input input-bordered w-full"
            placeholder="Comic Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          {/* CREATOR */}
          <input
            className="input input-bordered w-full"
            placeholder="Creator Name"
            value={form.creatorName}
            onChange={(e) =>
              setForm({ ...form, creatorName: e.target.value })
            }
          />

          {/* DESCRIPTION */}
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          {/* STATUS */}
          <select
            className="select select-bordered w-full"
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option>Draft</option>
            <option>Published</option>
          </select>

          {/* PANELS */}
          <h3 className="text-xl font-bold text-secondary mt-8">
            Storyboard Panels
          </h3>

          {panels.map((panel, index) => (

            <div
              key={index}
              className="bg-base-200 p-4 rounded-xl border border-secondary mt-4"
            >

              <h4 className="font-semibold mb-2">
                Panel {index + 1}
              </h4>

              {/* CAPTION */}
              <input
                className="input input-bordered w-full mb-2"
                placeholder="Caption"
                value={panel.captionText}
                onChange={(e) =>
                  handlePanelChange(index, "captionText", e.target.value)
                }
              />

              {/* DIALOGUE */}
              <input
                className="input input-bordered w-full"
                placeholder="Dialogue"
                value={panel.dialogueText}
                onChange={(e) =>
                  handlePanelChange(index, "dialogueText", e.target.value)
                }
              />

              <button
                type="button"
                onClick={() => removePanel(index)}
                className="btn btn-xs btn-error mt-3"
              >
                <Trash size={14} /> Remove Panel
              </button>

            </div>

          ))}

          {/* ADD PANEL */}
          <button
            type="button"
            onClick={addPanel}
            className="btn btn-outline btn-primary mt-4"
          >
            <Plus size={16} /> Add Panel
          </button>

          {/* SAVE */}
          <button className="btn btn-primary w-full mt-6">
            Save Changes
          </button>

        </form>

      </div>

    </div>
  );
};

export default EditPage;