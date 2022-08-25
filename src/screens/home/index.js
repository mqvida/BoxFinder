import React, { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';

import api from '../../services/api';
import strings from '../../resources/values/strings.json';

import InputBox from '../../components/inputBox';
import Spinner from '../../components/spinner';
import { DefaultButton } from '../../components/button';

import { styles as generalStyles } from '../../styles/general';

export default function Home( props ) {
    
    const [ orderCode, setOrderCode ] = useState( '5063285183' );
    const [ showLoading, setShowLoading ] = useState( false );

    const searchRegisters = async () => {

        setShowLoading( true );
        
        try {

            const response = await api.get( `/api.php?order=${orderCode}` );

            response.data.length !== 0 ?
                goToScan( response.data )
            :
                alert( strings.registers_not_found )
            ;

            setShowLoading( false );
            
        } catch ( error ) {
        
            console.error( error );

            alert( strings.api_connection_error );
        
            setShowLoading( false );
    
        }
        
    }

    const handlerInput = ( value ) => {

        setOrderCode( value.toUpperCase() );

    }

    const goToScan = ( registersFound ) => {

        props.navigation?.navigate( 'Scan', { orderRegisters : registersFound } );

    }
 
    return (
            
        <SafeAreaView style={ generalStyles.container }>
            <View style={ generalStyles.orderSearchContainer }>
                <Text style={ generalStyles.label }>{ strings.order_label }</Text>

                <InputBox

                    placeholder={ strings.insert_order_placeholder }
                    onChangeText={ handlerInput }
                    maxLength={ 20 }
                    autoFocus={ true }
                    clearTextOnFocus={ true }
                    keyboardType={ "number-pad" }
                    value={ orderCode }

                />
                
                {
                    showLoading ?
                        <Spinner />
                    :
        
                        <DefaultButton
        
                            onPress={ searchRegisters }
                            title={ strings.search_order_button }
        
                        />
                }
            </View>
        </SafeAreaView>

    );

};