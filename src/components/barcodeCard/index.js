import React from 'react';
import { Image, View } from 'react-native';
import { List } from 'react-native-paper';

import styles from './styles';

const statusOkIcon = require('./icons/ok_white.png');
const statusNotOkIcon = require('./icons/not_ok_white.png');
const addressIcon = require('./icons/search_white.png');
const unknownIcon = require('./icons/question_quote_white.png');

export default function BarcodeCard( props ) {

    const getStyle = ( fixedStyle, theme ) => {

        let newStyle;

        switch( theme ) {
    
            case 'found':
            
                newStyle = [ fixedStyle, styles.green ];
            
            break;
            
            case 'notFound':
            
                newStyle = [ fixedStyle, styles.red ];
            
            break;
    
            case 'address':
            
                newStyle = [ fixedStyle, styles.blue ];
            
            break;
    
            default:
            
                newStyle = [ fixedStyle, styles.yellow ];
        
        }

        return newStyle;

    }

    const getIcon = ( theme ) => {

        let newIcon;

        switch( theme ) {
    
            case 'found':
            
                newIcon = statusOkIcon;    

            break;
            
            case 'notFound':
            
                newIcon = unknownIcon;
            
            break;
    
            case 'address':
            
                newIcon = addressIcon;
            
            break;
    
            default:
            
                newIcon = statusNotOkIcon;
        
        }

        return newIcon;

    }

    let registersListStyle = getStyle( styles.cardContainer, props.registersData.theme );

    let statusIcon = getIcon( props.registersData.theme );
    
    const listItem = ( item ) => {

        const label = props.registersData.theme === 'address' ? item.support : `${ item.box_id }    ${ item.box_type }  ${ item.box_state }`;

        return (

            <List.Item 
            
                key={ label + "_" + props.registersData.theme } 
                title={ label } 
                style={ styles.listItem }
                titleNumberOfLines={ 5 }
                left={ () => ( <></> ) }
                right={ () => ( <></> ) }

            />

        );

    }

    return (
        
        <>
            <List.AccordionGroup>
                <List.Accordion
                    title={ props.registersData.title + ": " + props.registersData.registers.length }
                    id={ props.registersData.id }
                    style={ registersListStyle }
                    left={ () => (

                        <View style={ styles.unityStatusIconContainer }>
                            <Image  style={ styles.unityStatusIcon } source={ statusIcon }/>
                        </View>

                    )}
                    right={ () => ( <></> ) }
                    titleStyle={ styles.unityName }
                >
                    {

                        props.registersData.registers.map( register => listItem( register ) )

                    }
                </List.Accordion>
            </List.AccordionGroup>
        </>

    );
    
}