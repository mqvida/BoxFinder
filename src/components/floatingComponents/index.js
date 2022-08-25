import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';

import { DefaultButton } from '../../components/button';
import strings from '../../resources/values/strings.json';
import styles from './style';

export default function FloatingComponents( props ) {

  return(

    <SafeAreaView style={styles.scanFloatingComponentsContainer}>
      <View style={ styles.scanFloatingProgressIndicatorContainer } >
        <Text style={ styles.progressIndicatorBubble }>{ props.indicatorValue ? props.indicatorValue : "Indicator value" }</Text>
      </View>

      <View style={ styles.scanFloatingButtonContainer }>
        <DefaultButton styles={ styles.button } textStyles={ styles.buttonText } title={ strings.scan_done } onPress={ () => props.buttonOnPress() } />
      </View>
    </SafeAreaView>

  )

}