import React from "react";
import {Avatar, Grid, List, ListItem, ListItemText, ListItemAvatar, Typography} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
   reviewsContainer:{
      maxHeight:370,
      overflowY:'auto',
      '& p, & span':{
         textAlign:'left'
      },
      '& h4':{
         textAlign:'left',
         fontWeight:500
      },
   },
}));
const LocationReviews = props => {
   const classes = useStyles();
   const { reviews } = props;
   return(<Grid item xs={12} className={classes.reviewsContainer} key={'reviews'}>
         <Typography component={'h4'}>Reviews</Typography>
               {
                  reviews ?
                     <List>
                        {reviews.map((review,index)=>{
                           return <ListItem key={`review_${review.place_id}_${index}`}>
                              <ListItemAvatar>
                                 <Avatar src={review.profile_photo_url}/>
                              </ListItemAvatar>
                              <ListItemText
                                 primary={<>{`${review.author_name}: `}<Rating value={review.rating} size={'small'} precision={0.5} readOnly={true} /></>}
                                 secondary={review.text}
                              />
                           </ListItem>
                        })}
                     </List>
                     :
                     <Typography color={'textSecondary'}>None Found</Typography>
               }
      </Grid>
   )
}
export default LocationReviews;