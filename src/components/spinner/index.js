import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

export default function Spinner( props ) {
    
    const[ color, setColor ] = useState( 'blue' );

    useEffect( () => {

        const verificaCor = () => {

            if( props.color !== undefined ) {
    
                setColor( props.color );
    
            }
    
        }
        
        verificaCor();

    }, [ props ] )
 
    return (

        <ActivityIndicator size="large" color={ color }/>

    );
    
}