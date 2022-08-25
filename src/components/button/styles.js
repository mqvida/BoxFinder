import { StyleSheet } from 'react-native';
import colors from '../../resources/values/colors.json';
import fonts from '../../resources/values/fonts.json';

const styles = StyleSheet.create({

    button: {

        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        height: 42,
        width: '90%',
        maxHeight: 42,
        backgroundColor: '#2EC1CE',
        borderColor: 'transparent',
        borderRadius: 5,
        bottom: 24,
    
    },
    
    buttonText: {

        fontSize: 14,
        lineHeight: 42,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: 'white',
        textAlign: 'center',

    },
    
    defaultButton: {

        height: ( fonts.bigButtonFontSize * 2 ) + fonts.bigButtonFontSize * 0.2,
        paddingHorizontal: fonts.bigButtonFontSize,
        borderRadius: fonts.bigButtonFontSize * 0.3,
        backgroundColor: colors.primary,

        alignSelf: 'center',

        justifyContent: 'center',

        marginTop: 10,
        marginBottom: 10

    },

    defaultButtonText: {

        fontSize: fonts.bigButtonFontSize,
        width: "100%",
        color: colors.white,
        textAlign: 'center'

    },

});  

export default styles;