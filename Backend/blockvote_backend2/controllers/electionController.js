// controllers/electionController.js
const { getDB, saveDB } = require("../db/database");

const getStatus = (req, res) => {
  const db = getDB();
  res.json({
    success: true,
    election: db.election,
    stats: {
      totalVoters: db.voters.length,
      votedVoters: db.voters.filter(v => v.has_voted).length,
      totalCandidates: db.candidates.length,
      totalBlocks: db.blockchain.length,
    },
  });
};

const startElection = (req, res) => {
  const db = getDB();
  db.election.status = "open";
  db.election.start_time = new Date().toISOString();
  saveDB(db);
  res.json({ success: true, message: "Election started." });
};

const endElection = (req, res) => {
  const db = getDB();
  db.election.status = "closed";
  db.election.end_time = new Date().toISOString();
  saveDB(db);
  res.json({ success: true, message: "Election ended." });
};

const resetElection = (req, res) => {
  const db = getDB();
  db.election.status = "open";
  db.election.start_time = new Date().toISOString();
  db.election.end_time = null;
  db.voters.forEach(v => { v.has_voted = false; v.voted_at = null; });
  db.candidates.forEach(c => { c.vote_count = 0; });
  db.votes = [];
  db.blockchain = [];
  saveDB(db);
  res.json({ success: true, message: "Election reset. All votes cleared." });
};

module.exports = { getStatus, startElection, endElection, resetElection };
