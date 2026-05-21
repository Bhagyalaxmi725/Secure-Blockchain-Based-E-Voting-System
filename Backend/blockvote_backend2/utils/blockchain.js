// utils/blockchain.js - Custom Blockchain
const crypto = require("crypto");
const { getDB, saveDB } = require("../db/database");

const generateHash = (data) => {
  return crypto.createHash("sha256").update(JSON.stringify(data)).digest("hex").toUpperCase().substring(0, 16);
};

const addBlock = (voterId, candidateId) => {
  const db = getDB();
  const lastBlock = db.blockchain[db.blockchain.length - 1];
  const blockNumber = lastBlock ? lastBlock.block_number + 1 : 1;
  const previousHash = lastBlock ? lastBlock.block_hash : "0000000000000000";

  const blockData = { blockNumber, voterId, candidateId, timestamp: new Date().toISOString(), previousHash };
  const blockHash = generateHash(blockData);

  const newBlock = {
    block_number: blockNumber,
    block_hash: blockHash,
    previous_hash: previousHash,
    voter_id: voterId,
    candidate_id: candidateId,
    timestamp: new Date().toISOString(),
  };

  db.blockchain.push(newBlock);
  saveDB(db);

  return { blockNumber, blockHash, previousHash };
};

const getAllBlocks = () => {
  const db = getDB();
  return [...db.blockchain].reverse();
};

const verifyChain = () => {
  const db = getDB();
  for (let i = 1; i < db.blockchain.length; i++) {
    if (db.blockchain[i].previous_hash !== db.blockchain[i - 1].block_hash) return false;
  }
  return true;
};

module.exports = { addBlock, getAllBlocks, verifyChain };
