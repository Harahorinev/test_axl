import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import MyStack from './navigation/navigation';
import { NavigationContainer } from '@react-navigation/native';

// pate4IqnDlD2a4IMT.15a3e1e2d20481f6c091a425d48ccaf8079deb217c95870320681fa7c9c1538a
// appnT8fmhN91cS3Ff



export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <MyStack />
      </View>
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
