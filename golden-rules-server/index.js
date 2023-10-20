const express = require("express");
const db = require("./db");
const { Rule } = require("./models/rule");

// ------------
// Init app and login db
// ------------
const app = express();

db.connect(app);

// ------------
// Run Server
// ------------
app.use(express.json());

app.listen(3000, () => {
  console.log("Golder rules server is runing on port: 3000");
});

// ------------
// Routes
// ------------
app.get("/rules", async (_, res) => {
  try{
    const data = await Rule.find();
    return res.status(200).send(data)
  }
  catch(error){
    return res.status(500).send(error.message)
  }
});

app.post("/rules/new-rule", (req, res) => {
  if (!req.body.title) {
    res.status(400).send("Rule must have a title");
  } else {

    const data = new Rule({
      title: req.body.title,
      description: req.body.description || "",
      likes: req.body.likes || 0,
      dislikes: req.body.dislikes || 0,
    })

    try {
      data.save();
      return res.status(201).send(data)
    }
    catch (error) {
      return res.status(400).json({message: error.message})
    }
  }
});

app.patch("/rules/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Rule.findByIdAndUpdate(
        id, updatedData, options
    )

    return res.send(result)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
});

app.delete("/rules/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Rule.findByIdAndDelete(id)

    const data = await Rule.find();
    return res.status(200).send(data)
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
});
