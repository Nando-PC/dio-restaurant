import { useState } from "react";
import { Rating } from "@mui/material";

import Skeleton from './../Skeleton';
import { Restaurant, RestaurantInfo, RestaurantPhoto, Title, Address } from "./styles";
import restaurante from './../../assets/restaurante-fake.png';


const RestaurantCard = (restaurant, onClick) => {

    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <Restaurant onClick={onClick}>
            <RestaurantInfo>
                <Title>{restaurant.name}</Title>
                <Rating value={restaurant.rating} readOnly precisio={0.5} max={5} />
                <Address>{restaurant.vicinity || restaurant.formatted_address}</Address>
            </RestaurantInfo>
            <RestaurantPhoto 
                imageLoaded={imageLoaded}
                src={restaurant.photos ? restaurant.photos[0].getUrl() : restaurante} 
                alt="Foto do restaurante" 
                onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && <Skeleton width="100%" height="100%" />}
        </Restaurant>
    );
}
    

export default RestaurantCard;

