import { useState } from "react"
import { useWorkoutContext } from '../hooks/useWorkoutContext'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { IoIosClose } from "react-icons/io";
 


const WorkoutForm = () =>{
    const [open, setOpen] = useState(false)

    const { dispatch } = useWorkoutContext()


    const [title, setTitle] = useState('')
    const [sets, setSets] = useState('')
    const [reps, setReps] = useState('')
    const [load, setLoad] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = {title, sets, reps, load}
        const response = await fetch('api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
            setOpen(true)
        }
        if (response.ok){
            setError(null)
            setEmptyFields([])
            console.log('new workout added', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
            setOpen(false)
        }


        setTitle('')
        setSets('')
        setReps('')
        setLoad('')
        setError(null)
    }

    return(
        <div>
            <Grid container justifyContent= 'flex-end'>
                <Button variant="outlined" onClick = {handleOpen} sx = {{ mb: 1.5 }}>
                    Add workout
                </Button>
            </Grid>
            <Dialog open={open} onClose={handleClose} sx = {{ p: 0.8 }}>
                <Box component = "form" sx = {{ pt: 2 }} onSubmit = {(e) => handleSubmit(e)}>
                    <DialogTitle sx = {{display: 'inline'}}>New Workout</DialogTitle>
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 15,
                            top: 15,
                            m: 0,
                            p: 0,
                            color: (theme) => theme.palette.grey[500],
                        }}
                        >
                        <IoIosClose />
                    </IconButton>
                    <DialogContent sx = {{m: 0, pt: 0}}>
                        <TextField
                            error = {emptyFields.includes('title')}
                            required
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Title"
                            fullWidth
                            variant="standard"
                            onChange = {(e) => setTitle(e.target.value)}
                            value = {title}                            
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Sets"
                            variant="standard"
                            onChange = {(e) => setSets(e.target.value)}
                            value = {sets}
                            error = {emptyFields.includes('sets')}
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Reps"
                            variant="standard"
                            onChange = {(e) => setReps(e.target.value)}
                            value = {reps}
                            error = {emptyFields.includes('reps')}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Weight"
                            variant="standard"
                            endAdornment={<InputAdornment position="end">lb</InputAdornment>}
                            onChange = {(e) => setLoad(e.target.value)}
                            value = {load}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button type = 'submit'>Submit</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    )
}

export default WorkoutForm