const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:5173"
}));

const path = require("path");
const filePath = path.join(__dirname, "/todo.json");
 
app.get("/todos", (req, res) => {
  fs.readFile(filePath, "utf-8", (err, data) => {
    res.json(JSON.parse(data));
  });
});

function find(index, todo) {
  for (let i = 0; i < todo.length; i++) {
    if (todo[i].id == index) {
      return i;
    }
  }
  return -1;
}

app.get("/todos/:id", (req, res) => {
  let index = req.params.id;
  fs.readFile(filePath, "utf-8", (err, data) => {
    let todo = JSON.parse(data);
    if (find(index, todo) == -1) {
      res.status(400).send("Not found");
    } else {
      res.json(todo[find(index, todo)]);
    }
  });
});

app.post("/todos", (req, res) => {
   
  let newTodo = {
    id : Math.floor(Math.random()*10000)+1,
    title : req.body.title,
    description : req.body.description
  };
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) throw err;
    let todo = JSON.parse(data);
    todo.push(newTodo);
    fs.writeFile(filePath, JSON.stringify(todo), (err) => {
      if (err) throw err;
      res.status(200).json(newTodo);
    });
  });
});

app.put("/todos/:id", (req, res) => {
  let index = req.params.id;
  let newTodo = {
    id : parseInt(index),
    title : req.body.title,
    description : req.body.description
  }
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) throw err;
    let todo = JSON.parse(data);
    if (find(index, todo) == -1) {
      res.sendStatus(404);
    } else {
      todo[find(index, todo)] = newTodo;
      fs.writeFile(filePath, JSON.stringify(todo), (err) => {
        if (err) throw err;
        res.status(200).json(req.body);
      });
    }
  });
});

app.delete("/todos/:id", (req, res) => {
    let index = req.params.id;
    let flag = 0;
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        res.sendStatus(500);  
        return;
      }
      let todo = JSON.parse(data);
      for (let i = 0; i < todo.length; i++) {
        if (todo[i].id == index) {
          todo.splice(i, 1);
          console.log("from outside",todo);
          fs.writeFile(filePath, JSON.stringify(todo), (err) => {
            if (err) {
              res.sendStatus(500); 
              return;
            }
            console.log(todo);
            res.sendStatus(200);  
          });
          flag = 1;
          return;  
        }
      }
      if (flag == 0) {
        res.sendStatus(404); // Send a 404 response if the todo with the specified id is not found
      }
    });
  });
  

app.listen(3000, () => {
  console.log("listening on 3000");
});
