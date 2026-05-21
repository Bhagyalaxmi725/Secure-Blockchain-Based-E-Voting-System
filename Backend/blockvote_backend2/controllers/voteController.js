// controllers/voteController.js
const { getDB, saveDB } = require("../db/database");
const { addBlock } = require("../utils/blockchain");

const castVote = (req, res) => {
  const { voter_id, candidate_id } = req.body;
  if (!voter_id || !candidate_id)
    return res.status(400).json({ success: false, message: "Voter ID and Candidate ID required." });

  const db = getDB();

  if (db.election.status !== "open")
    return res.status(400).json({ success: false, message: "Election is not open." });

  const voter = db.voters.find(v => v.voter_id === voter_id);
  if (!voter) return res.status(404).json({ success: false, message: "Voter not found." });
  if (voter.has_voted) return res.status(400).json({ success: false, message: "Duplicate voting not allowed." });
  if (!voter.fingerprint_registered) return res.status(400).json({ success: false, message: "Fingerprint not registered." });

  const candidate = db.candidates.find(c => c.candidate_id === candidate_id);
  if (!candidate) return res.status(404).json({ success: false, message: "Candidate not found." });

  // Add to blockchain
  const block = addBlock(voter_id, candidate_id);

  // Update data
  voter.has_voted = true;
  voter.voted_at = new Date().toISOString();
  candidate.vote_count += 1;

  db.votes.push({ voter_id, candidate_id, block_number: block.blockNumber, block_hash: block.blockHash, timestamp: new Date().toISOString() });
  saveDB(db);

  res.json({ success: true, message: "Vote cast successfully! Stored on blockchain.", block });
};

const getAllVotes = (req, res) => {
  const db = getDB();
  res.json({ success: true, votes: db.votes });
};

module.exports = { castVote, getAllVotes };
