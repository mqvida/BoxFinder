import { StyleSheet } from 'react-native';
import colors from '../../resources/values/colors.json';
import fonts from '../../resources/values/fonts.json';

const styles = StyleSheet.create({

    inputBox: {
        
        width: "100%",
        height: 50,
        color: colors.text,
        backgroundColor: colors.inputBackground,
        borderRadius: 5,
        alignSelf: 'center',
        paddingHorizontal: 10,
        fontSize: fonts.defaultInputFontSize,
        
        marginBottom: 10

    },

    inputPlaceholder: {

        color : colors.text

    }

});  

export default styles;