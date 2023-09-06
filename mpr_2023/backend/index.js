const express = require("express");
const cors = require("cors");
// const bodyParser = require('body-parser');

const {generateFile}  = require("./generateFile");
const {executeCpp}  = require("./executeCpp");


const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ success: "done" });
});

app.post("/run", async(req, res) => {
  // console.log(req.body);
  const { language, code } = req.body;
  // console.log(code);

  if (code === "") {
    return res.status(404).json({ success: false, error: "Empty code body!" });
  }

 try{
  //need to generate a c++ file with content from request.
  const filepath = await generateFile(language,code);
  // console.log(filepath);
  //need to run the file and send response
  const output = await executeCpp(filepath);
  // console.log(output);
  return res.json({output});

 }catch(err){
  res.status(500).json({err});

 }
  
});

app.listen(5000, () => {
  console.log("listening on port 5000!");
});
