import { useLottie } from 'lottie-react';

import animationData from './../../assets/restaurants-loading.json';

export default () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData,        
    };

    const { View } = useLottie(defaultOptions);

    return View;
};

