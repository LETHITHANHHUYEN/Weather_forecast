import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Cloud from '@mui/icons-material/Cloud';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '15ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const Forecast = () => {
  const [load, setLoad] = useState(false);

  const API_KEY = "857978cc45a1702f4423e30c89a00f9e";
  const [userLocation, setUserLocation] = useState('');

  const [degree, setDegree] = useState(null);
  const [location, setLocation] = useState(null);
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [country, setCountry] = useState("");


  const searchLocation = async () => {

    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&appid=${API_KEY}&units=metric`);
    const data = await res.data;

    setDegree(data.main.temp)
    setLocation(data.name)
    setDescription(data.weather[0].description)
    setIcon(data.weather[0].icon)
    setHumidity(data.main.humidity)
    setWind(data.wind.speed)
    setCountry(data.sys.country)

    //console.log(data);
    setUserLocation('');
    setLoad(true);
  }
  const [clock, setClock] = useState();
  var today = new Date(),
    day = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClock(date.toLocaleTimeString());
    }, 1000);
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Cloud />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              WEATHER FORECAST
            </Typography>
            <div style={{ fontSize: "32px", margin: "30px" }}>
              {day} - {clock}
            </div>
            <Search>
              <SearchIconWrapper>
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search by city"
                inputProps={{ 'aria-label': 'search' }}
                required
                value={userLocation}
                onChange={event => setUserLocation(event.target.value)}
              />
            </Search>
            <Button variant="contained" type='submit' onClick={searchLocation} ><SearchIcon /></Button>
          </Toolbar>
        </AppBar>
      </Box>

      {load ?
        <Box sx={{ maxWidth: 350, maxHeight: 500, padding: '20px', margin: '128px auto' }}>
          <Card sx={{ minWidth: 275, backgroundColor: "lightskyblue" }}>
            <CardContent>
              <Typography variant="h5" component="div">
                <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="weather icon" />
                {location}, {country}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {description} <br />
              </Typography>
              <Typography variant="body2">
                Temperature: {degree}°C <br />
                Humidity: {humidity} %<br />
                Wind speed: {wind} m/s
              </Typography>
            </CardContent>
          </Card>
        </Box>

        : null}

    </>
  );
}
export default Forecast;