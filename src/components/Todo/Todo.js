import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Button, InputLabel, Input, List, ListItem, ListItemText, Modal } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import db from '../../firebase';

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));


function Todo(props)
{
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const updateTodo = () => {
        db.collection( process.env.REACT_APP_FIREBASE_COLLECTION_NAME ).doc(props.todo.id).set({
            todo: input
        }, { merge: true });
        handleClose();
    }
    
    const deleteTodo = () => {
        db.collection('todos').doc(props.todo.id).delete();
    }

    return (
        <>
        <Modal
            open={open}
            onClose={ e => handleClose() }>
            <div className={ classes.paper }>
                <h1>Edit Todo</h1>
                <FormControl>
                    <InputLabel htmlFor="my-input">Write a Todo</InputLabel>
                    <Input placeholder={props.todo.todo} value={input} onChange={ event => setInput( event.target.value ) }/>
                </FormControl>
                <Button onClick={ e => updateTodo() }>Update Todo</Button>
            </div>
        </Modal>
        <List>
            <ListItem>
                <ListItemText primary={props.todo.todo} secondary="Dummy deadline"/>
            </ListItem>
            <EditIcon onClick={ e => handleOpen() }/>
            <DeleteForeverIcon onClick={event => deleteTodo()} />
        </List>
        </>
    );
}

export default Todo;