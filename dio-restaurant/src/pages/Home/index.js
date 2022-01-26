import { useState } from 'react';
import { useSelector } from 'react-redux';
import {TextField, Input, InputAdornment} from '@mui/material';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { Wrapper, Container, Search, Logo, CarouselTitle, Carousel, ModalTitle, ModalContent } from "./styles";
import logo from './../../assets/logo.svg';
import restaurante from './../../assets/restaurante-fake.png';
import { Card, RestaurantCard, Modal, Map, Loader, Skeleton } from './../../components';

const Home = () => {
    const [inputValue, setInputValue] = useState('');
    const [query, setQuery] = useState(null);
    const [placeId, setPlaceId] = useState(null);
    const [modalOpened, setModalOpened] = useState(false);
    const { restaurants, restaurantSelected } = useSelector((state) => state.restaurants);

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        adaptiveHeight: true,
    };

    function handlKeyPress(e) {
        if(e.key === 'Enter'){
            setQuery(inputValue);
        }

    };

    function handleOpenModal(placeId){
        setPlaceId(placeId);
        setModalOpened(true);
    };


    return (
        <Wrapper>
            <Container>
                <Search>
                   <Logo src={logo} alt="Logo do restaurante" />
                   <TextField 
                        label="Pesquisar" 
                        InputProps={{endAdornment:
                            <InputAdornment position="end">
                                <IconButton type="submit" sx={{ fontSize: 'small'}} aria-label="search">
                                   <SearchIcon />
                                </IconButton>
                            </InputAdornment>}}>                       
                        <Input 
                            value={inputValue} 
                            onKeyPress={handlKeyPress} 
                            onChange={(e) => setInputValue(e.target.value)}
                        />                   
                    </TextField>
                    {restaurants.length > 0 ? (
                        <>
                            <CarouselTitle>Na sua Área</CarouselTitle>
                            <Carousel {...settings}>
                                {restaurants.map((restaurant) => (
                                    <Card 
                                        key={restaurant.places_id}
                                        photo={restaurant.photos ? restaurant.photos[0].getUrl() : restaurante} 
                                        tiltle={restaurant.name}
                                    />
                                ))}
                            </Carousel> 
                        </>
                    ) : (
                        <Loader />
                    )}                    
                </Search>
                {restaurants.map((restaurant) => ( 
                    <RestaurantCard onCLick={() => handleOpenModal(restaurant.place_id)} restaurant={restaurant}/>
                ))}
            </Container>
            <Map query={query} placeId={placeId}/>
            <Modal open={modalOpened} onClose={() => setModalOpened(!modalOpened)}>
                {restaurantSelected ? (
                    <>
                        <ModalTitle>{restaurantSelected?.name}</ModalTitle>
                        <ModalContent>{restaurantSelected?.formatted_phone_number}</ModalContent>
                        <ModalContent>{restaurantSelected?.formatted_address}</ModalContent>
                        <ModalContent>{restaurantSelected?.opening_hours?.open_now ? 'Aberto Agora!!' : 'Fechado neste momento...'}</ModalContent>
                    </>
                ) : (
                    <>
                        <Skeleton width="10px" height="10px" />
                        <Skeleton width="10px" height="10px" />
                        <Skeleton width="10px" height="10px" />
                        <Skeleton width="10px" height="10px" />
                    </>
                )}
            </Modal>
        </Wrapper>
    )
}


export default Home;

