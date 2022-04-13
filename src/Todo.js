import { List, ListItemText, ListItem, ListItemAvatar, Avatar, Icon, Button, makeStyles } from '@material-ui/core'
import React ,{ useState} from 'react'
import "./Todo.css";
import { db } from './firebase';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Modal from '@mui/material/Modal';


const useStyle = makeStyles((theme)=>({
    paper : {
        position : "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border : "2px solid #000",
        boxShadow : theme.shadows[5],
        padding: theme.spacing(2,4,3),
    },
}))



function Todo(props) {
    const classes = useStyle();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();

    const handleOpen = ()=>{
        setOpen(true);
    };

        const updateTodos = ()=>{
            db.collection('todos').doc(props.todo.id).set({
            todo: input
            },{merge: true});
            setOpen(false);
        }

 
    return (
        <>
        <Modal
        open ={open}
        onClose = {e=>setOpen(false)}>
            <div className={classes.paper}>
                <h1>Im am a Modal</h1>
                <input value={input}
                placeholder = {props.todo.todo}
                onChange={event=>setInput(event.target.value)} />
                <button onClick={updateTodos}>Update Todo</button>
            </div>
        </Modal>
        <List className='todo__list'>
            <ListItem>
                <ListItemAvatar>
                </ListItemAvatar>
                <ListItemText primary={props.todo.todo} secondary= "Dummy deadLine"/>
            </ListItem>
            <button onClick={e=>setOpen(true)}>
                Edit
            </button>
            <DeleteForeverIcon onClick={event => {db.collection("Todos")
            .doc(props.todo.id).delete()}}></DeleteForeverIcon>
        </List>

    </>
    )
}

export default Todo