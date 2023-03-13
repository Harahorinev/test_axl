import { createStackNavigator } from '@react-navigation/stack';
import AuthorizationScreen from '../screens/AuthorizationScreen';
import GoogleScreen from '../screens/GoogleScreen';

const Stack = createStackNavigator<RootStackParamList>();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Authorization" component={AuthorizationScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Google" component={GoogleScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

export default MyStack