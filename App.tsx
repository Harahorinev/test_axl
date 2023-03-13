import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';
import 'react-native-gesture-handler';

import MyStack from './navigation/navigation';

export default function App() {
  return (
    <NavigationContainer>
      <RootSiblingParent>
        <View style={styles.container}>
          <MyStack />
        </View>
      </RootSiblingParent>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'green',
  },
});
