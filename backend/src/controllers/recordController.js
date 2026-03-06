import ComicRecord from "../models/ComicRecord.js";

/* ---------- GET ALL COMICS ---------- */
export const getRecords = async (req, res) => {
  try {
    const records = await ComicRecord.find().sort({ createdAt: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------- GET COMIC BY ID ---------- */
export const getRecordById = async (req, res) => {
  try {
    const record = await ComicRecord.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Comic not found" });
    }

    // sort panels by panelOrder
    if (record.panels) {
      record.panels.sort((a, b) => a.panelOrder - b.panelOrder);
    }

    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------- CREATE COMIC ---------- */
export const createRecord = async (req, res) => {
  try {

    const newRecord = new ComicRecord({
      recordId: Date.now().toString(), // auto generate ID
      creatorName: req.body.creatorName,
      email: req.body.email || "creator@email.com",
      title: req.body.title,
      description: req.body.description,
      status: req.body.status || "Draft",
      type: req.body.type || "Story",
      panels: [],
      comments: []
    });

    const savedRecord = await newRecord.save();

    res.status(201).json(savedRecord);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* ---------- UPDATE COMIC ---------- */
export const updateRecord = async (req, res) => {
  try {

    const updatedRecord = await ComicRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: "Comic not found" });
    }

    res.status(200).json(updatedRecord);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* ---------- DELETE COMIC ---------- */
export const deleteRecord = async (req, res) => {
  try {

    const deletedRecord = await ComicRecord.findByIdAndDelete(req.params.id);

    if (!deletedRecord) {
      return res.status(404).json({ message: "Comic not found" });
    }

    res.status(200).json({ message: "Comic deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------- ADD PANEL ---------- */
export const addPanel = async (req, res) => {
  try {

    const { panelOrder, dialogueText, captionText } = req.body;

    const updatedRecord = await ComicRecord.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          panels: {
            panelOrder,
            dialogueText,
            captionText
          }
        }
      },
      { new: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: "Comic not found" });
    }

    res.status(200).json(updatedRecord);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};