import { registerRootComponent } from 'expo';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Importa tus pantallas principales
import HomeScreen from './screens/Principal/inicio';
import Tema1Screen from './screens/Principal/tema1';
import Tema4Screen from './screens/Principal/tema4';
import Tema3Screen from './screens/Principal/tema3';
import BuscarScreen from './screens/Principal/Buscar';
import PortadaScreen from './screens/Principal/portada';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack solo para Home + Temas
function LearningStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Tema1" component={Tema1Screen} />
      <Stack.Screen name="Tema4" component={Tema4Screen} />
      <Stack.Screen name="Tema3" component={Tema3Screen} />
    </Stack.Navigator>
  );
}

// Stack para Buscar + Temas (comparten las mismas pantallas)
function BuscarStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Buscar" component={BuscarScreen} />
      <Stack.Screen name="Tema1" component={Tema1Screen} />
      <Stack.Screen name="Tema4" component={Tema4Screen} />
      <Stack.Screen name="Tema3" component={Tema3Screen} />
    </Stack.Navigator>
  );
}

// Stack para Ajustes
function AjustesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Ajustes" component={Tema4Screen} />
    </Stack.Navigator>
  );
}

// Tab principal
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000',
          paddingVertical: 10,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#aaa',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Buscar') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Ajustes') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'Portada') {
            iconName = focused ? 'book' : 'book-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={LearningStack} />
      <Tab.Screen name="Buscar" component={BuscarStack} />
      <Tab.Screen name="Portada" component={PortadaScreen} />
      <Tab.Screen name="Ajustes" component={AjustesStack} />
    </Tab.Navigator>
  );
}

// App Principal
function MainApp() {
  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
}

registerRootComponent(MainApp);
