// routes/index.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const { login } = require("../controllers/authController");
const { getAllVoters, getVoter, addVoter, deleteVoter, registerFingerprint, verifyFingerprint, getStats } = require("../controllers/voterController");
const { getAllCandidates, addCandidate, deleteCandidate } = require("../controllers/candidateController");
const { castVote, getAllVotes } = require("../controllers/voteController");
const { getStatus, startElection, endElection, resetElection } = require("../controllers/electionController");
const { getResults, getBlockchainLogs } = require("../controllers/resultController");

// Auth
router.post("/auth/login", login);

// Voters
router.get("/voters", auth, getAllVoters);
router.get("/voters/stats", auth, getStats);
router.get("/voters/:voter_id", getVoter);
router.post("/voters/add", auth, addVoter);
router.delete("/voters/:voter_id", auth, deleteVoter);
router.post("/voters/fingerprint/register", auth, registerFingerprint);
router.post("/voters/fingerprint/verify", verifyFingerprint);

// Candidates
router.get("/candidates", getAllCandidates);
router.post("/candidates/add", auth, addCandidate);
router.delete("/candidates/:candidate_id", auth, deleteCandidate);

// Votes
router.post("/vote/cast", castVote);
router.get("/votes", auth, getAllVotes);

// Election
router.get("/election/status", getStatus);
router.post("/election/start", auth, startElection);
router.post("/election/end", auth, endElection);
router.post("/election/reset", auth, resetElection);

// Results & Blockchain
router.get("/results", getResults);
router.get("/blockchain/logs", getBlockchainLogs);

module.exports = router;
