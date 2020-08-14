const router = require("express").Router();
const Todo = require("../models/todoModel");

//router.route("/login").post(validateEmail, loginUser);

//Devuelvo datos del usuario logueado, mas favorite movies populate
//router.route("/profile").get(auth, getUser);

router.route("/").get(async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.json({ todos });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Error" });
  }
});

router.route("/").post(async (req, res) => {
  try {
    const text = req.body.text;
    const date = req.body.date;
    const todo = new Todo({ text, date });
    await Todo.create(todo);
    res.json({ message: "Todo created" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Error" });
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.json({ todo });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Error" });
  }
});

router.route("/:id").delete(async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Error" });
  }
});

router.route("/:id").put(async (req, res) => {
  try {
    await Todo.updateOne(
      { _id: req.params.id },
      { $set: { finalized: req.body.finalized } }
    );
    res.json({ message: "Todo updated" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Error" });
  }
});

module.exports = router;
