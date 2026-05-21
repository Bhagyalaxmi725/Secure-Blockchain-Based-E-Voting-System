// db/database.js - JSON File Based Database (No build tools needed!)
const fs = require("fs");
const path = require("path");

const DB_FILE = path.join(__dirname, "blockvote_data.json");

// Default database structure
const defaultDB = {
  admins: [
    {
      id: 1,
      admin_id: "admin",
      // bcrypt hash of "admin123"
      password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
      name: "Super Admin",
    },
  ],
  voters: [
    { id: 1, voter_id: "VT001", name: "Rahul Sharma", age: 28, area: "Mumbai North", phone: "9876543210", address: "123 MG Road, Mumbai", email: "rahul@email.com", fingerprint_registered: true, has_voted: false, voted_at: null },
    { id: 2, voter_id: "VT002", name: "Priya Patel", age: 34, area: "Mumbai South", phone: "9765432109", address: "45 Hill Street, Mumbai", email: "priya@email.com", fingerprint_registered: true, has_voted: false, voted_at: null },
    { id: 3, voter_id: "VT003", name: "Amit Kumar", age: 41, area: "Andheri East", phone: "9654321098", address: "78 Link Road, Andheri", email: "amit@email.com", fingerprint_registered: true, has_voted: false, voted_at: null },
    { id: 4, voter_id: "VT004", name: "Sunita Rao", age: 29, area: "Bandra West", phone: "9543210987", address: "12 Carter Road, Bandra", email: "sunita@email.com", fingerprint_registered: false, has_voted: false, voted_at: null },
    { id: 5, voter_id: "VT005", name: "Vikram Singh", age: 52, area: "Dadar", phone: "9432109876", address: "89 Shivaji Nagar, Dadar", email: "vikram@email.com", fingerprint_registered: true, has_voted: false, voted_at: null },
  ],
  candidates: [
    { id: 1, candidate_id: "C001", name: "Narendra Patil", party: "National Progress Party", vote_count: 0 },
    { id: 2, candidate_id: "C002", name: "Deepa Mehta", party: "People's Democratic Alliance", vote_count: 0 },
    { id: 3, candidate_id: "C003", name: "Suresh Nair", party: "United Citizens Front", vote_count: 0 },
    { id: 4, candidate_id: "C004", name: "Kavita Joshi", party: "Independent Candidate", vote_count: 0 },
  ],
  election: {
    id: 1,
    title: "BlockVote 2025 General Election",
    status: "open",
    start_time: new Date().toISOString(),
    end_time: null,
  },
  votes: [],
  blockchain: [],
};

// Load database from file
const loadDB = () => {
  if (!fs.existsSync(DB_FILE)) {
    saveDB(defaultDB);
    console.log("✅ Database created with default data");
    return defaultDB;
  }
  const data = fs.readFileSync(DB_FILE, "utf8");
  return JSON.parse(data);
};

// Save database to file
const saveDB = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// Get database
const getDB = () => loadDB();

module.exports = { getDB, saveDB };
