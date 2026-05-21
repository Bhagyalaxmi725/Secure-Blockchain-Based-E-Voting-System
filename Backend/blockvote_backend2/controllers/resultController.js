// controllers/resultController.js
const { getDB } = require("../db/database");
const { getAllBlocks, verifyChain } = require("../utils/blockchain");

const getResults = (req, res) => {
  const db = getDB();
  const sorted = [...db.candidates].sort((a, b) => b.vote_count - a.vote_count);
  const totalVotes = sorted.reduce((s, c) => s + c.vote_count, 0);
  const results = sorted.map(c => ({
    ...c,
    percentage: totalVotes > 0 ? ((c.vote_count / totalVotes) * 100).toFixed(1) : "0.0",
  }));
  res.json({ success: true, results, totalVotes, winner: sorted[0], chainValid: verifyChain() });
};

const getBlockchainLogs = (req, res) => {
  const blocks = getAllBlocks();
  res.json({ success: true, blocks, chainValid: verifyChain(), totalBlocks: blocks.length });
};

module.exports = { getResults, getBlockchainLogs };
