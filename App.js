import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator'; // Root Navigator decides between Auth and App flows

const App = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;
