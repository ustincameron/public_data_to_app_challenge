import React, {useState} from "react";
import { Grid } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

import useLocations from "../../lib/hooks/useLocations";
import LocationsMap from '../../components/LocationsMap';
import LocationList from '../../components/LocationList';
import LocationDetails from '../../components/LocationDetails';

const useStyles = makeStyles((theme) => ({
   resultsContainer:{
      margin:'10vh auto 50px',
      width:'80%',
      maxWidth:1100,
   }
}));

const HomePage = props => {
   const classes = useStyles();
   const locationResponse = useLocations();
   const [mapCenter, setMapCenter] = useState([39.0997, -94.5786]);
   const [chosenLocation, setChosenLocation] = useState();
   
   return (<Grid className={classes.resultsContainer}
                 container
                 spacing={0}
                 justify="space-between">
      <LocationsMap response={locationResponse} setChosenLocation={setChosenLocation} setMapCenter={setMapCenter} mapCenter={mapCenter} />
      <LocationList response={locationResponse} chosenLocation={chosenLocation} setChosenLocation={setChosenLocation} mapCenter={mapCenter} />
      {locationResponse.data  && <LocationDetails chosenLocation={chosenLocation} />}
   </Grid>)
}

export default HomePage;