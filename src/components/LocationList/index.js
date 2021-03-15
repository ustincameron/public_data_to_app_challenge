import React, {useState} from "react";
import {
   Avatar,
   Card,
   Grid,
   List,
   ListItem,
   ListItemAvatar,
   ListItemText
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Pagination from "@material-ui/lab/Pagination";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
   cardContainer:{
      [theme.breakpoints.down(780)]: {
         maxWidth: '100%',
         flexBasis: '100%',
      }
      },
   card:{
      borderRadius:12,
   },
   list:{
      padding:20,
      maxHeight:370,
      overflowY:'auto',
   },
   pagination:{
      margin:'20px auto 20px',
      '& ul':{
         margin:'auto',
         width:'max-content'
      }
   }
}));

const LocationList = props => {
   const { response, chosenLocation, setChosenLocation, mapCenter } = props;
   const { data } = response;
   const classes = useStyles();
   const [pageNumber, setPageNumber] = useState(1);
   const pageLength = 12;
   const pageResults = data ? data.slice((pageNumber - 1) * pageLength, pageNumber * pageLength) : undefined;
   return(
      <>
         {pageResults && <Grid item xs={4} className={classes.cardContainer}>
            <Card className={classes.card}>
               <List className={classes.list}>
                  {pageResults &&
                  pageResults
                     .sort((a,b)=>{
                        let dist = getDistance(mapCenter[0], mapCenter[1], a.geometry.location.lat, a.geometry.location.lng);
                        let prevDist = getDistance(mapCenter[0], mapCenter[1], b.geometry.location.lat, b.geometry.location.lng);
                        return dist < prevDist? -1 : 1;
                     })
                     .map((value,index) => {
                     return (
                        <ListItem key={`listItem_${value.place_id}_${index}`} button onClick={() => setChosenLocation(value)} selected={chosenLocation && chosenLocation.place_id === value.place_id}>
                           <ListItemAvatar>
                              <Avatar src={value.icon}>{value.place_id}</Avatar>
                           </ListItemAvatar>
                           <ListItemText key={`listItemText_${value.place_id}_${index}`} primary={value.name} secondary={<Rating value={value.rating} size={'medium'} precision={0.5} readOnly={true} />}/>
                        </ListItem>
                     );
                  })}
               </List>
               <Pagination variant="outlined" color="secondary" className={classes.pagination} count={Math.ceil(data.length%pageLength===0 ? data.length/pageLength : data.length/pageLength +1)} page={pageNumber} onChange={(event,val)=> setPageNumber(val)} />
            </Card>
         </Grid>
         }
      </>
   )
}

const getDistance = (lat1, lon1, lat2, lon2) => {
   let R = 6371; // km
   let dLat = toRad(lat2-lat1);
   let dLon = toRad(lon2-lon1);
   lat1 = toRad(lat1);
   lat2 = toRad(lat2);
   
   let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
   let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
   let d = R * c;
   return d;
}
const toRad = (value) => {
   return value * Math.PI / 180;
}
export default LocationList;