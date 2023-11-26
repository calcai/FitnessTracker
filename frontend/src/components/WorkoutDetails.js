import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@emotion/react';
import Theme from '../Theme';

const WorkoutDetails = ({ workout }) => {
  return (
    <div className="workout-details">
      <ThemeProvider theme={Theme}>
        <Card sx={{ minWidth: 275, mt: 1}}>
          <CardContent>
            <Typography variant="header1" component="div" color="#039be5" sx={{ mb: 2 }}>
              {workout.title}
            </Typography>
            <Typography variant="body1">
              <em>Set: </em>
              {workout.sets} x {workout.reps} reps
              <br />
              {workout.load > 0 && (
                <>
                  <em>Weight: </em>
                  {workout.load} lbs
                </>
              )}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </ThemeProvider>
    </div>
  );
};

export default WorkoutDetails;
