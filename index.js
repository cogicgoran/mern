const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

const todos = new Array();

app.get("/api", (_, res) => {
    res.json(todos.reverse());
})

app.post('/api', (req, res) => {
    const message = req.body.message;
    const todo = { message, completed: false };
    todos.push(todo);
    res.json()
});


app.post('/api/:todoId', (req, res) => {
    // TODO: validate param
    const todoId = req.params.todoId;
    const todo = todos[todoId];
    // TODO: validate if exists
    todo.completed = !todo.completed;
    res.status(200).send({});
})

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/dist'));

    app.get('*', (req, res) => {
        console.log("MATCH");
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    });
}

app.listen(3000, () => {
    console.log("Application listening on port 3000");
});