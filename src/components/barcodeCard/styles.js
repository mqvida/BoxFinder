import { StyleSheet } from 'react-native';
import colors from '../../resources/values/colors.json';

const styles = StyleSheet.create({

    cardContainer: {

        width: "100%",
        height: 50,

        borderWidth: 0.5,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderColor: colors.black,

        paddingVertical: 0,

        paddingHorizontal: "2.5%",

    },

    cardButton: {

        width: "100%",
        height: 50,
        
        alignSelf: 'center',
        flexDirection: 'row',

        alignContent: 'space-between'

    },

    unityStatusIconContainer: {

        width: 50,
        height: 50,
        padding: 5,

    },

    unityStatusIcon: {

        width: "90%",
        height: "90%",

    },

    unityNameContainer: {

        flex: 1,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center'

    },

    unityName: {

        fontSize: 22,
        color: colors.textLight

    },

    listItem: {

        fontSize: 20,
        color: colors.textLight,
        backgroundColor: colors.grayLight,
        marginBottom: 2

    },

    blue: {

        backgroundColor: colors.blue,

    },

    red: {

        backgroundColor: colors.statusRed,

    },

    yellow: {

        backgroundColor: colors.statusYellow

    },

    green: {

        backgroundColor: colors.statusGreen

    },

});  

export default styles;