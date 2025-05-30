import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as FileSystem from 'expo-file-system';

import HomeScreen from './screens/HomeScreen';
import DirectoryScreen from './screens/DirectoryScreen';
import FileViewScreen from './screens/FileViewScreen';
import FileEditScreen from './screens/FileEditScreen';

const Stack = createNativeStackNavigator();
const APP_DATA_DIR = FileSystem.documentDirectory + 'AppData/';

export default function App() {
  useEffect(() => {
    (async () => {
      const dirInfo = await FileSystem.getInfoAsync(APP_DATA_DIR);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(APP_DATA_DIR, { intermediates: true });
        console.log('AppData directory created.');
      }
    })();
  }, []);

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Directory" component={DirectoryScreen} />
          <Stack.Screen name="FileView" component={FileViewScreen} />
          <Stack.Screen name="FileEdit" component={FileEditScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
