const mongoose = require("mongoose");

const TodosSchema = mongoose.Schema(
  {
    userName: { type: String },
    userId: { type: String },
    title: { type: String },
    status: { type: Boolean },
  },
  {
    versionKey: false,
  }
);

const TodosModel = mongoose.model("Todos", TodosSchema);

module.exports = { TodosModel };
