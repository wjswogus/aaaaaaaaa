import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PaymentIcon from '@material-ui/icons/Payment';
import { Link } from "react-router-dom";



const CardDivStyle = styled.div`
  display:grid;
  grid-template-columns: auto auto ;
  grid-gap : 10px;
  width : 45%;
  margin : 70px 30px 190px 30px;
  height: 100%;
`;

const useStyles = makeStyles({
  media: {
    height: 140
  }
});

 
const CardBox =styled.div`
  margin : 20px;
`;


export default function MediaCard() {
  const classes = useStyles();

  const [card , setCard] = useState([]);

  useEffect(()=> {
    fetch("http://10.100.102.27:8000/ptList"
      
    )
    .then(res => res.json()).then(
      res =>{
        console.log(res)
            setCard(res.content)
      }
    )
  },[])

  return (
    
    <CardDivStyle>  
      {card.map( (cards) => (
    <Card>
    <Link shop={cards} to={`/shop/${cards.ptNo}`}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={cards.pt_img}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {cards.pt_name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {cards.pt_address}
          </Typography>
        </CardContent>
      </CardActionArea>
      </Link>
      <CardActions>
        <Button size="small" color="primary">
          <FavoriteBorderIcon/>
        </Button>
        <Button size="small" color="primary">
          <PaymentIcon/>
        </Button>
      </CardActions>
    </Card>
    ))}
    </CardDivStyle>


  );
}