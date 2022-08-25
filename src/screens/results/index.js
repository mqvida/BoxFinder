import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';

import BarcodeCard from '../../components/barcodeCard';

import { styles as generalStyles } from '../../styles/general';

export default function ResultsScreen( { route } ) {

  const { orderRegistersFound, orderRegistersNotFound, places } = route.params;

  const renderItem = ( { item } ) => (

    <BarcodeCard registersData={ item }/>

  );

  return (

    <SafeAreaView style={ generalStyles.resultsContainer }>
      <FlatList
        style={ generalStyles.scrollContainer }
        data={[
          {
            "id" : 1,
            "title" : "Endereços",
            "theme" : "address",
            "type" : "address",
            "registers" : places
          },
          {
            "id" : 2,
            "title" : "Encontrados",
            "theme" : "found",
            "type" : "barcode",
            "registers" : orderRegistersFound
          },
          {
            "id" : 3,
            "title" : "Não Encontrados",
            "theme" : "notFound",
            "type" : "barcode",
            "registers" : orderRegistersNotFound 
          }
        ]}
        renderItem={ renderItem }
        keyExtractor={ item => item.id }
      />
    </SafeAreaView>

  );

}