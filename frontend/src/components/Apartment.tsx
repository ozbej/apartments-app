import React from 'react';
import Carousel from 'better-react-carousel'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ApartmentProps from '../interfaces/ApartmentProps';

import '../styles/apartment.css'

const responsiveLayout = [
  {
    breakpoint: 768,
    cols: 1,
    rows: 1,
    gap: 10,
    loop: true,
  },
  {
    breakpoint: 992,
    cols: 2,
    rows: 1,
    gap: 10,
    loop: true,
  },
  {
    breakpoint: 1920,
    cols: 3,
    rows: 1,
    gap: 10,
    loop: true,
  },
  {
    breakpoint: 4000,
    cols: 5,
    rows: 1,
    gap: 10,
    loop: true,
  }
];

function Apartment({apartment}: ApartmentProps) {

  return (
    <Card sx={{ minWidth: 275, mb: 3 }} className="card-container">
      <Carousel 
      responsiveLayout={responsiveLayout}
      showDots
      hideArrow={false}
      dotColorActive="#3f50b5">
        {apartment.apartmentImages && apartment.apartmentImages.map((image: string, index: number) => (
          <Carousel.Item key={index}>
            <img width="100%" src={image} alt="apartment" />
          </Carousel.Item>
        ))}
      </Carousel>
      <CardContent>
        <Typography variant="h5" component="div">
          {apartment.title}
        </Typography>
        <Typography color="text.secondary">
          {apartment.location}
        </Typography>
        <Typography variant="h6">
          {apartment.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button href={`https://www.sreality.cz/${apartment.link}`} target="_blank" size="small" variant="outlined">Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default Apartment;