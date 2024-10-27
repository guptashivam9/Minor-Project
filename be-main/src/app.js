const express = require("express");
// const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const { router } = require("./routes");
const { connectDB } = require("./db");
const { User } = require("./db/model");
const { PORT } = require("./config");
const app = express();
const multer = require('multer');

const path = require('path');


app.use(bodyParser.json());
app.use(cors());
app.use(express.json({limit: "10mb"}))

connectDB();


app.use(router);


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../front-end-master/src/Images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), async (req, res) => {
  console.log(req.body);
  const obj = JSON.parse(JSON.stringify(req.body))
const id  = obj.id;
console.log(id)
  const imageName = req.file.filename;

  try {
    const profile = await User.findOneAndUpdate({ id },{image: imageName}, { new: true });
    if (profile) {
      res.status(200).json({ message: 'User profile image updated successfully' });
    } else {
      res.status(404).json({ error: 'User profile not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating user profile', message: error.message });
  }
});



app.listen(PORT, () => {
  console.log("App is running on port " + PORT);
});

