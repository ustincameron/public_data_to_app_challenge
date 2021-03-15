import React from "react";
import {Box, Card, Divider, Grid, IconButton, Tooltip, Typography} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Map, Phone, Public} from "@material-ui/icons";
import LocationReviews from "../LocationReviews";

const useStyles = makeStyles((theme) => ({
   cardContainer:{
      [theme.breakpoints.down(780)]: {
         marginTop:40,
         maxWidth: '100%',
         flexBasis: '100%',
      }
   },
   card:{
      borderRadius:12,
      padding:40,
      '& p':{
         lineHeight:'26px',
      },
      '& hr':{
         margin:'15px 0px 15px'
      },
      '& h1':{
         fontSize:22,
         fontWeight:500
      },
      '& h4':{
         textAlign:'center',
         fontWeight:500
      },
      '& ul':{
         padding:0,
      },
      '& li':{
         listStyle:'none',
         textAlign:'center',
      }
   },
   none:{
      textAlign:'center'
   },
}));
const LocationDetails = props => {
   const classes = useStyles();
   const { chosenLocation } = props;
   return(
      <Grid item xs={7} className={classes.cardContainer}>
         <Card className={classes.card}>
            <Box>
               {
                  chosenLocation ?
                     <>
                        <Grid container>
                           <Grid item xs={8}>
                              <Typography color={'textSecondary'}>Location Details</Typography>
                              <Typography component={'h1'}>{chosenLocation.name}</Typography>
                           </Grid>
                           <Grid item xs={4} container justify={'space-between'}>
                              <Tooltip title={`Visit Website`} placement={'top'}>
                                 <span>
                                 <IconButton onClick={() => window.location = chosenLocation.website} disabled={chosenLocation.website===undefined}>
                                    <Public/>
                                 </IconButton>
                                 </span>
                              </Tooltip>
                              <Tooltip title={`Call ${chosenLocation.name}`} placement={'top'}>
                                 <span>
                                 <IconButton onClick={() => window.location = `tel:${chosenLocation.formatted_phone_number}`} disabled={chosenLocation.formatted_phone_number===undefined}>
                                    <Phone/>
                                 </IconButton>
                                 </span>
                              </Tooltip>
                              <Tooltip title={`Get Directions for ${chosenLocation.name}`} placement={'top'}>
                                 <span>
                                 <IconButton onClick={() => window.open(chosenLocation.url, "_blank")} disabled={chosenLocation.url===undefined}>
                                    <Map/>
                                 </IconButton>
                                 </span>
                              </Tooltip>
                           </Grid>
                        </Grid>
                        <Divider/>
                        <Grid container>
                           <Grid item xs={7}>
                              <Typography color={'textSecondary'}>{chosenLocation.formatted_phone_number}</Typography>
                              <Typography color={'textSecondary'}>{chosenLocation.formatted_address}</Typography>
                              {chosenLocation.rating &&
                              <Typography color={'textSecondary'}>{`Average Rating: ${chosenLocation.rating}/5`}</Typography>}
                           </Grid>
                           <Grid item xs={5}>
                              <Typography component={'h4'}>Operating Hours</Typography>
                              {chosenLocation.opening_hours ?
                                 chosenLocation.opening_hours.weekday_text
                                    .toString()
                                    .split(',')
                                    .map((day,index)=>{
                                       return <Typography variant={'subtitle2'} color={'textSecondary'} key={`operatingHours_${index}`}>{day}</Typography>
                                    })
                                 :
                                 <Typography color={'textSecondary'} className={classes.none}>N/A</Typography>
                              }
                           </Grid>
                           <LocationReviews reviews={chosenLocation.reviews}/>
                        </Grid>
                     </>
                     :
                     <Typography color={'textSecondary'} className={classes.none}>Select a Location</Typography>
               }
            </Box>
         </Card>
      </Grid>
   )
}
export default LocationDetails;