import { StyleSheet } from 'react-native';
import colors from '../../resources/values/colors.json';
import fonts from '../../resources/values/fonts.json';

const styles = StyleSheet.create({

    scanFloatingComponentsContainer: {

        backgroundColor: 'transparent', // <- recover
        position: 'absolute',
        left: 0,
        right: 0,
        height: "100%",
    
        display: 'flex',
        
    },

    scanFloatingProgressIndicatorContainer: {

        height: "85%",
        alignItems: "flex-end",
        padding: "1%",

    },

    progressIndicatorBubble: {
        
        height: ( fonts.defaultInputFontSize * 2 ) + fonts.defaultInputFontSize * 0.2,
        paddingHorizontal: fonts.defaultInputFontSize,
        borderRadius: fonts.defaultInputFontSize * 2,
        color: colors.textLight,
        backgroundColor: colors.primary,
        textAlignVertical: 'center',
        paddingHorizontal: 10,

        fontSize: fonts.defaultInputFontSize,
        
    },

    scanFloatingButtonContainer: {

        // height: "10%",

    },
    
});  

export default styles;