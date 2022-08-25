import React from 'react';
import { TextInput } from 'react-native';

import styles from './style';
import colors from '../../resources/values/colors.json';

export default function InputBox( props ) {

    return (

        <TextInput

            { ...props }
            style={ styles.inputBox }
            placeholderTextColor={ colors.text }

        />

    );

}