// controllers/candidateController.js
const { getDB, saveDB } = require("../db/database");

const getAllCandidates = (req, res) => {
  const db = getDB();
  res.json({ success: true, candidates: db.candidates.sort((a, b) => b.vote_count - a.vote_count) });
};

const addCandidate = (req, res) => {
  const { candidate_id, name, party } = req.body;
  if (!candidate_id || !name || !party)
    return res.status(400).json({ success: false, message: "All fields required." });
  const db = getDB();
  if (db.candidates.find(c => c.candidate_id === candidate_id))
    return res.status(400).json({ success: false, message: "Candidate ID already exists." });
  db.candidates.push({ id: db.candidates.length + 1, candidate_id, name, party, vote_count: 0 });
  saveDB(db);
  res.json({ success: true, message: "Candidate added." });
};

const deleteCandidate = (req, res) => {
  const db = getDB();
  const index = db.candidates.findIndex(c => c.candidate_id === req.params.candidate_id);
  if (index === -1) return res.status(404).json({ success: false, message: "Candidate not found." });
  db.candidates.splice(index, 1);
  saveDB(db);
  res.json({ success: true, message: "Candidate deleted." });
};

module.exports = { getAllCandidates, addCandidate, deleteCandidate };
