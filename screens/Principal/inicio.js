import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  Image,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground } from 'react-native';

//  Cambiar 'App' a 'HomeScreen' para recibir 'navigation'
const HomeScreen = ({ navigation }) => {
  const { width: screenWidth } = useWindowDimensions();

  // Calcular el ancho dinámico de las tarjetas (50% de la pantalla)
  const cardWidth = screenWidth * 0.5;

  // Datos de las tarjetas con imágenes y rutas correctas
  const tarjetas = [
    { titulo: 'Tema1', descripcion: 'Descripción 1', imagen: require('../../assets/tema1.png'), ruta: 'Tema1' },
    { titulo: 'Tema2', descripcion: 'Descripción 2', imagen: require('../../assets/tema2.png'), ruta: 'Tema2' }, // Asegúrate de que la ruta sea 'Tema2'
    { titulo: 'Tema3', descripcion: 'Descripción 3', imagen: require('../../assets/tema3.png'), ruta: 'Tema3' },
    { titulo: 'Tema4', descripcion: 'Descripción 4', imagen: require('../../assets/tema4.png'), ruta: 'Tema4' },
  ];

  return (
    <LinearGradient
    colors={['#000000', '#FFD700']}
      style={styles.container}
    >
      <View style={styles.mainContainer}>
        {/* Imagen Encima */}
        <View style={styles.header}>
          <Image
            source={require('../../assets/linux.png')}
            style={styles.imagenEncima}
          />
        </View>

        {/* Título */}
        <View style={[styles.titleContainer]}>
          <Text style={styles.text2}>SISTEMA OPERATIVO {'\n'} LINUX</Text>
        </View>

        {/* Tarjetas */}
        <View style={styles.cardArea}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.cardScroll,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
          >
            {tarjetas.map((tarjeta, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate(tarjeta.ruta)} //  Navegación correcta
                style={[styles.card, { width: cardWidth }]}
              >
                <ImageBackground
                  source={tarjeta.imagen}
                  style={styles.imageBackground}
                  imageStyle={{ borderRadius: 8 }}
                >
                  <View style={styles.overlay} />
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{tarjeta.titulo}</Text>
                    <Text style={styles.cardDescription}>{tarjeta.descripcion}</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {/* Menú Inferior */}
        

      </View>
      {/* Menú Inferior */}


    </LinearGradient>
  );
};

//  Exporta HomeScreen correctamente
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flex: 2, // Proporción flexible para la imagen
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text2: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  cardArea: {
    flex: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardScroll: {
    paddingVertical: 10,
    alignItems: 'center', // Alineación horizontal de las tarjetas
    justifyContent: 'center', // Alineación vertical si es necesario
    gap: 10, // Espacio entre tarjetas
  },
  
  card: {
    height: 300,
    
    marginHorizontal: 5,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 231, 14, 0.57)', // Tarjetas transparentes
    elevation: 4, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  imageBackground: {
    width: '100%', // Ancho completo de la tarjeta
    height: '100%', // Altura completa de la tarjeta
    justifyContent: 'center',
    borderRadius: 8,
    overflow: 'hidden', // Mantener bordes redondeados
  },
  
  
  overlay: {
    ...StyleSheet.absoluteFillObject, // Ocupa toda la tarjeta
    backgroundColor: 'rgba(81, 73, 30, 0.6)', // Capa blanca semi-transparente
    borderRadius: 8,
  },
  
  cardContent: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  
  cardDescription: {
    fontSize: 12,
    color: '#333',
  },
  
  imagenEncima: {
    width: '50%', // La mitad del ancho de la pantalla
    height: undefined,
    aspectRatio: 1, // Mantener proporción cuadrada
    resizeMode: 'contain',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  
  
});
