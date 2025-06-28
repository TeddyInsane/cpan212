const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

app.use(cors());

const edu = require("./data/education");
const exp = require("./data/experience");
const overview = require("./data/overview");
const skills = require("./data/skills");

app.get("/getEdu", (req, res) => res.json(edu));
app.get("/getExp", (req, res) => res.json(exp));
app.get("/getOverview", (req, res) => res.json(overview));
app.get("/getSkills", (req, res) => res.json(skills));
app.get("/getProjects", (req, res) => res.json(exp.projects));
app.get("/getContact", (req, res) => res.json({
  name: overview.name,
  email: overview.email,
  phone: overview.phone,
  location: overview.location,
  linkedin: overview.linkedin,
  github: overview.github
}));

app.get("/", (req, res) => {
  res.send("Portfolio API Server running");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
