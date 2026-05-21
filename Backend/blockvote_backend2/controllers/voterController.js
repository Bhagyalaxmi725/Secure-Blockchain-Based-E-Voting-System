// controllers/voterController.js
const { getDB, saveDB } = require("../db/database");

const getAllVoters = (req, res) => {
  const db = getDB();
  res.json({ success: true, voters: db.voters });
};

const getVoter = (req, res) => {
  const db = getDB();
  const voter = db.voters.find(v => v.voter_id === req.params.voter_id);
  if (!voter) return res.status(404).json({ success: false, message: "Voter not found." });
  res.json({ success: true, voter });
};

const addVoter = (req, res) => {
  const { voter_id, name, age, area, phone, address, email } = req.body;
  if (!voter_id || !name) return res.status(400).json({ success: false, message: "Voter ID and name required." });

  const db = getDB();
  if (db.voters.find(v => v.voter_id === voter_id))
    return res.status(400).json({ success: false, message: "Voter ID already exists." });

  const newVoter = {
    id: db.voters.length + 1, voter_id, name,
    age: age || null, area: area || null, phone: phone || null,
    address: address || null, email: email || null,
    fingerprint_registered: false, has_voted: false, voted_at: null,
  };
  db.voters.push(newVoter);
  saveDB(db);
  res.json({ success: true, message: "Voter added successfully." });
};

const deleteVoter = (req, res) => {
  const db = getDB();
  const index = db.voters.findIndex(v => v.voter_id === req.params.voter_id);
  if (index === -1) return res.status(404).json({ success: false, message: "Voter not found." });
  db.voters.splice(index, 1);
  saveDB(db);
  res.json({ success: true, message: "Voter deleted successfully." });
};

const registerFingerprint = (req, res) => {
  const { voter_id } = req.body;
  const db = getDB();
  const voter = db.voters.find(v => v.voter_id === voter_id);
  if (!voter) return res.status(404).json({ success: false, message: "Voter not found." });
  voter.fingerprint_registered = true;
  voter.fingerprint_id = Math.floor(Math.random() * 1000) + 1;
  saveDB(db);
  res.json({ success: true, message: "Fingerprint registered successfully.", fingerprint_id: voter.fingerprint_id });
};

const verifyFingerprint = (req, res) => {
  const { voter_id } = req.body;
  const db = getDB();
  const voter = db.voters.find(v => v.voter_id === voter_id);
  if (!voter) return res.status(404).json({ success: false, message: "Voter not found." });
  if (!voter.fingerprint_registered) return res.status(400).json({ success: false, message: "Fingerprint not registered." });
  if (voter.has_voted) return res.status(400).json({ success: false, message: "Voter has already voted." });
  res.json({ success: true, message: "Fingerprint verified. Authentication successful.", voter });
};

const getStats = (req, res) => {
  const db = getDB();
  res.json({
    success: true,
    stats: {
      totalVoters: db.voters.length,
      votedVoters: db.voters.filter(v => v.has_voted).length,
      notVoted: db.voters.filter(v => !v.has_voted).length,
      fpRegistered: db.voters.filter(v => v.fingerprint_registered).length,
    },
  });
};

module.exports = { getAllVoters, getVoter, addVoter, deleteVoter, registerFingerprint, verifyFingerprint, getStats };
