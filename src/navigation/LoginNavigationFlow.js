import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/login/Login';
import SignupScreen from '../screens/login/Signup';
import ResetPasswordScreen from '../screens/login/ResetPassword';
import SignupValidation from '../screens/login/SignupValidation';
import CustomHeaderBackArrow from '../components/ui/CustomHeaderBackArrow';

const LoginFlow = createNativeStackNavigator();

export default function LoginNavigationFlow() {
  return (
    <LoginFlow.Navigator initialRouteName="Login">
      <LoginFlow.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTitle: '',
          headerBackButtonMenuEnabled: false,
          headerBackTitleVisible: false,
          headerShadowVisible: false,
        }}
      />
      <LoginFlow.Screen
        name="Signup"
        component={SignupScreen}
        options={({ navigation }) => ({
          headerLeft: () => <CustomHeaderBackArrow navigation={navigation} />,
          headerTitle: 'Create New Account',
        })}
      />
      <LoginFlow.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={({ navigation }) => ({
          headerLeft: () => <CustomHeaderBackArrow navigation={navigation} />,
          headerTitle: 'Reset Password',
        })}
      />
      <LoginFlow.Screen
        name="SignupValidation"
        component={SignupValidation}
        options={{
          headerTitle: '',
          headerBackButtonMenuEnabled: false,
          headerBackTitleVisible: false,
          headerShadowVisible: false,
        }}
      />
    </LoginFlow.Navigator>
  );
}
