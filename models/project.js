const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    people: {
      type: Array,
      required: true,
      default: [],
    },
    active: {
      type: Boolean,
      default: true,
    },
    created_at: {
      type: Date,
      default: () => Date.now(),
      immutable: true
    },
    updated_at: {
      type: Date,
      default: () => Date.now(),
    },
  })    
    
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;