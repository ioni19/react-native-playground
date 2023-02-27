import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import Reanimated from './components/Animation';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <Reanimated />
      </View>
    </SafeAreaView>
  );
};

export default App;
