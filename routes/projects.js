var express = require('express');
var router = express.Router();

var User = require("../models/user");
var Project = require("../models/project");
const auth = require("../middleware/verifytoken");

/* GET projects listing. */
router.get('/', auth, async function(req, res, next) {
    const projects = await Project.find({}).exec();
    const users = await User.find({}).exec()
    const signedUser = await User.findById(req.user._id);
    res.render("projects", { "projects": projects, "people": users, "signedUser": signedUser});
  });

/* GET individual Project */
router.get("/:id", auth, async function(req, res, next) {
    const signedUser = await User.findById(req.user._id);
    const project = await Project.findById(req.params.id);
    let inUsers = []
    project.people.forEach(person => {
      inUsers.push(person._id)
    })
    const allUsers = await User.find({ _id: { $nin: inUsers } })
    res.render("project", {"project": project, "signedUser": signedUser, "allUsers": allUsers});
});

/* CREATE new project */
router.post("/", auth, async function(req, res, next) {
    try {
        const { name, description, people, active } = req.body;
        const person = await User.findById(people);
        const project = new Project({
        name: name,
        description: description,
        active: active === 'on'// Assuming the checkbox value is received as 'on' when checked
        })
        project.people.push(person)
        project.save()
    }
    catch {
        return res.status(500).json({ error: 'Server error' });
    }
    res.redirect("/projects");
});

/* UPDATE individual Project */
router.post('/:id', auth, async (req, res, next) => {
    try {
      const id  = req.params.id;
      const { name, description, people, active } = req.body;
      // Find the user 
      const person = await User.findById(people);
  
      // Find the project by ID
      const project = await Project.findById(id);

      if (!project) {
        return res.status(404).render({"status": 404, "message": 'Project not found' });
      }
  
      // Update the user's data
      project.name = name;
      project.description = description,
      project.people.push(person);
      project.active = active === 'on'; // Assuming the checkbox value is received as 'on' when checked
  
      // Save the updated user
      await project.save();
  
      return res.redirect("/projects"); // Redirect to the projects page
    } catch (error) {
      return res.status(500).render("error", {"message": error });
    }
});

/* DELETE a project */
router.post("/:id/delete", auth, async function(req, res, next) {
    const id = req.params.id;
    await Project.findByIdAndDelete(id);
    return res.redirect("/projects");
});

module.exports = router;