import { StyleSheet } from 'react-native';

import colors from '../../resources/values/colors.json';

export const styles = StyleSheet.create({

  container: {

    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },

  resultsContainer: {

    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',

  },

  scrollContainer: {
  
    backgroundColor: colors.defaultBackground,
  
  },

  orderSearchContainer: {
    
    flex: 1,
    width: "100%",
    paddingHorizontal: "5%",
    backgroundColor: colors.defaultBackground,
    alignSelf: 'center',

    paddingTop: "20%"

  },

  listContainer: {

    flex: 1,
    alignSelf: 'stretch',
    marginBottom: 68,

  },

  label: {

    fontSize: 20,
    marginTop: 5,
    marginBottom: 5,
    color: colors.text

  },

  result: {

    alignSelf: 'stretch',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderColor: 'transparent',
    borderBottomColor: 'lightgrey',
    borderWidth: 1,
    borderStyle: 'solid',

  },

  resultData: {

    fontSize: 16,

  },

  resultSymbology: {

    color: '#2EC1CE',
    fontSize: 12,
    
  },

});
