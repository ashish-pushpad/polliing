🗳️ Polling Web App

A simple Node.js + Express + MongoDB application that allows users to create polls, vote, and view poll results — including the winning option.

🚀 Features

📝 Create a new poll with a title, options, and owner name

🗳️ Vote on existing polls

📊 View all available polls

🏆 Check detailed results of any poll (including the most voted option)

🛠️ Tech Stack

Backend: Node.js, Express.js

Database: MongoDB with Mongoose ORM

Frontend: Simple HTML + JavaScript (fetch API)

Environment Variables: .env file for database connection

📂 Project Structure
backend/
    │
    ├── connection.js         # Database connection setup
    ├── pool.model.js         # Mongoose schema for Polls
    ├── app.js                # Main Express server file
    ├── .env                  # Environment variables (ignored in Git)
    ├── package.json
├── .gitignore
├── index.html
└── README.md

⚙️ Setup Instructions
1. Clone the repository
git clone https://github.com/ashish-pushpad/polliing
cd polling-app

2. Install dependencies
npm install 

3. Configure MongoDB

Create a .env file in the project root and add:

MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/pollsdb

4. Start the server
npm start


The server will start at http://localhost:3000

🧠 API Endpoints
1️⃣ Create Poll

POST /createpoll

{
  "title": "Favorite Programming Language?",
  "options": ["JavaScript", "Python", "C++"],
  "owner": "Ashish"
}

2️⃣ Vote on a Poll

POST /vote

{
  "pollId": "6531b5c4f3d82...",
  "optionIndex": 1
}

3️⃣ Get All Polls

GET /fetchpoll

Returns an array of all available polls.

4️⃣ Get Poll Detail

GET /getpolldetail?pollId=<id>

Returns details of one poll, including which option has the most votes.

💻 Frontend

Open public/frontend.html in your browser or serve it using Express.
It includes:

Poll creation form

Poll listing

Voting section

Poll detail/result viewer