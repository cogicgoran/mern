import { ITodo } from "../types";

function Todo({completed,message }: ITodo) {
    return <div>
        todo
        <p>{message}</p>
        <p>{completed ? 'done' : 'not done'}</p>
        <div>
            <button>Toggle state</button>
        </div>
    </div>
}

export default Todo;