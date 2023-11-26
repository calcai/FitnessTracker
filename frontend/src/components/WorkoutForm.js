import { useState } from "react"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


const WorkoutForm = () =>{
    const [open, setOpen] = useState(false)

    const [title, setTitle] = useState('')
    const [sets, setSets] = useState('')
    const [reps, setReps] = useState('')
    const [load, setLoad] = useState('')
    const [error, setError] = useState(null)

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
        }
        if (response.ok){
            setError(null)
            console.log('new workout added', json)
        }

        setTitle('')
        setSets('')
        setReps('')
        setLoad('')
        setError(null)

        setOpen(false)
    }

    return(
        <div>
            <Grid container justifyContent= 'flex-end'>
                <Button variant="outlined" onClick = {handleOpen} sx = {{ mb: 1.5 }}>
                    Add workout
                </Button>
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <Box component = "form" onSubmit = {(e) => handleSubmit(e)}>
                    <DialogTitle>New Workout</DialogTitle>
                    <DialogContent>
                        <TextField
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
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Sets"
                            variant="standard"
                            onChange = {(e) => setSets(e.target.value)}
                            value = {sets}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Reps"
                            variant="standard"
                            onChange = {(e) => setReps(e.target.value)}
                            value = {reps}
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
            {error && <div className="error">{error}</div>}
        </div>
    )
}

export default WorkoutForm