import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './styles';

export const DefaultButton = ( props ) => {

    const Container = props.disabled ? View : TouchableOpacity;
    const containerStyles = { ...( styles.defaultButton ), ...props.styles, ...( props.disabled ? { backgroundColor: 'grey' } : {} ) };
    const textStyles = { ...props.textStyles, ...( styles.defaultButtonText ) }

    return (

        <Container style={ containerStyles } onPress={ props.onPress }>
            <Text style={ textStyles }>{ props.title }</Text>
        </Container>

    )
    
}