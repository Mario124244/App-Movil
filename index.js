import { registerRootComponent } from 'expo';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Importa tus pantallas principales
import HomeScreen from './screens/Principal/inicio';
import Tema1Screen from './screens/Principal/tema1';
import Tema2Screen from './screens/Principal/tema2';

// Crear navegadores
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

//  Stack de Pantallas de Aprendizaje
function LearningStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Tema1" component={Tema1Screen} />
      <Stack.Screen name="Tema2" component={Tema2Screen} /> 
      <Stack.Screen name="Tema3" component={Tema1Screen} />
      <Stack.Screen name="Tema4" component={Tema1Screen} />
    </Stack.Navigator>
  );
}

//  Navegador de Pestañas Inferior
function MainTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#000', // Fondo del menú
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
            }
  
            // Retorna el icono correspondiente
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Inicio" component={LearningStack} />
        <Tab.Screen name="Buscar" component={Tema1Screen} />
        <Tab.Screen name="Ajustes" component={Tema1Screen} />
      </Tab.Navigator>
    );
  }
  

//  App Principal con Menú Inferior
function MainApp() {
  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
}

// Registra la app principal
registerRootComponent(MainApp);
