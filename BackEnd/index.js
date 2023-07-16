const express = require("express");
const { connect } = require("./db/Connected");
const { userRoutes } = require("./Routes/Authentication.Routes");
const { TodoRoutes } = require("./Routes/Todos.Routes");
const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/Todos", TodoRoutes);

app.listen(8080, async () => {
  console.log("server is running");
  try {
    await connect;
    console.log("connected to database");
  } catch (error) {
    console.log(error);
  }
});
