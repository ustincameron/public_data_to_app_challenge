import React from "react";
import {
   Card,
   Grid,
   LinearProgress,
   Typography
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Alert from "@material-ui/lab/Alert";
import {MapContainer, TileLayer, Marker, Popup, useMapEvent} from 'react-leaflet'

const useStyles = makeStyles((theme) => ({
   resultsContainer:{
      margin:'10vh auto 50px',
      width:'80%',
      maxWidth:1100,
   },
   card:{
      borderRadius:12,
      padding:40,
      marginBottom:50,
      '& h4':{
         textAlign:'center'
      }
   },
   alert:{
      maxWidth:500,
      margin:'20px auto 20px'
   },
   loading:{
      paddingTop:100,
      lineHeight:'80px',
      textAlign:'center'
   },
   mapContainer:{
      height:'300px'
   }
}));
const LocationsMap = props => {
   const { response, setChosenLocation, setMapCenter, mapCenter } = props;
   const { data, isFetching } = response;
   const classes = useStyles();
   
   return(
      <Grid item xs={12}>
         <Card className={classes.card}>
            <Typography variant={'h4'} color={'textPrimary'} gutterBottom>Kansas Public Libraries</Typography>
            {isFetching ?
                  <Typography variant={'h5'} color={'textSecondary'} className={classes.loading}>
                     Loading Locations
                     <LinearProgress color={"secondary"}/>
                  </Typography>
               :
                  <MapContainer center={mapCenter} zoom={8} scrollWheelZoom={false} className={classes.mapContainer}>
                     <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                     />
                     <MapEvents setMapCenter={setMapCenter}/>
                     {data && data.map((value,index) => {
                        return (
                           <Marker key={`map_${value.place_id}_${index}`} position={[value.geometry.location.lat, value.geometry.location.lng]}
                                   eventHandlers={{
                                      click: () => setChosenLocation(value)
                                   }}>
                              <Popup>{value.name}</Popup>
                           </Marker>
                        );
                     })}
                  </MapContainer>
            }
            {data===undefined && !isFetching && <Alert severity="error" className={classes.alert}>Could not load locations, please contact Support.</Alert>}
         </Card>
      </Grid>)
}
const MapEvents = props => {
   const { setMapCenter } = props;
   const map = useMapEvent('mouseup', (e) => {
      const coords = map.getCenter();
      setMapCenter([coords.lat,coords.lng]);
   })
   return null
}
export default LocationsMap;