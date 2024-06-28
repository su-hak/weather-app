import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState, useEffect } from 'react';
import Sunny from '../asset/Sunny.gif';
import Rain from '../asset/Rain.gif';

const requireGif = require.context('../asset', false, /\.gif$/);

export default function RecipeReviewCard({ weather }) {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const weatherIcon = weather.weather && weather.weather[0] ? weather.weather[0].main : "No weather data";
  const weatherDescription = weather.weather && weather.weather[0] ? weather.weather[0].description : "No weather data";
  const [weatherImg, setWeatherImg] = useState('');

  useEffect(() => {
    if(weatherIcon === "Clear") {
      setWeatherImg(Sunny);
    } else if(weatherIcon === "Rain") {
      setWeatherImg(Rain);
    } 
  })

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={weather.name}
        subheader={currentDateTime.toLocaleString()}
      />
      <div>
      {weatherIcon && (
        <CardMedia
          className='weatherIcon'
          component="img"
          height="100"
          image={weatherImg}
          alt={weatherDescription}
        />
      )}
      </div>
      <CardContent>
      <Typography variant="body2" color="text.secondary">
          {weatherDescription}
        </Typography>
        {weather.main && (
          <>
        <Typography variant="body2" color="text.secondary">
          {weather.main.temp}°C
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Humidity: {weather.main.humidity}%
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Wind Speed: {weather.wind.speed} m/s
        </Typography>
        </>
        )}
      </CardContent>
    </Card>
  );
}
