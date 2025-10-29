import express from "express"
import cors from "cors";
import connectDb from "./connection.js";
import Poll from "./pool.model.js";
const app =express()

app.use(cors())
app.use(express.json());



app.post("/createpoll", async(req, res) => {
  console.log(req.body)
  try {
    const { title, options, owner } = req.body;

    if (!title || !options || options.length < 2) {
      return res.status(400).json({ message: "Title and at least 2 options are required." });
    }

    const formattedOptions = options.map(opt => ({ text: opt }));

    const poll = await Poll.create({ title, options: formattedOptions, owner });
    res.status(201).json({ success: true, poll });
  } catch (error) {
    console.error("Error creating poll:", error);
    res.status(500).json({ message: "Server error while creating poll." });
  }
});

app.post("/vote",async(req,res)=>{
    try {
    const { pollId, optionIndex } = req.body;

    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ message: "Poll not found" });

    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return res.status(400).json({ message: "Invalid option index" });
    }

    poll.options[optionIndex].votes += 1;
    await poll.save();

    res.status(200).json({ success: true, poll });
  } catch (error) {
    console.error("Error voting:", error);
    res.status(500).json({ message: "Error while voting." });
  }
})

app.get("/fetchpoll",async (req,res)=>{
console.log("fetch is call ")
  try {
    const polls = await Poll.find()
    console.log(polls)
    if(!polls.length) return res.status(200).json({ success: true, message:'no poll yet' });
    res.status(200).json({ success: true, polls });
  } catch (error) {
    console.error("Error fetching polls:", error);
    res.status(500).json({ message: "Error fetching polls." });
  }

})

app.get("/getpolldetail", async (req, res) => {
  try {
    const { pollId } = req.query; // ✅ fixed here

    const poll = await Poll.findById(pollId);
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    // Find the option with the most votes
    const winningOption = poll.options.reduce(
      (max, option) => (option.votes > max.votes ? option : max),
      poll.options[0]
    );

    res.status(200).json({
      success: true,
      poll: {
        title: poll.title,
        owner: poll.owner,
        totalOptions: poll.options.length,
        options: poll.options,
        createdAt: poll.createdAt,
        winner: {
          text: winningOption.text,
          votes: winningOption.votes
        }
      }
    });
  } catch (error) {
    console.error("Error fetching poll details:", error);
    res.status(500).json({ message: "Error fetching poll details" });
  }
});



connectDb().then(
        app.listen(3000,()=>{
            console.log("app is lisnign on the port 3000")
        })
).catch((e)=>{
    console.log("error to connect to the db",e)
})