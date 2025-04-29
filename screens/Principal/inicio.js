import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = ({ navigation }) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  // Configuración adaptable basada en el tamaño de la pantalla
  const cardWidth = screenWidth * 0.45;
  const cardHeight = screenHeight * 0.3;
  const imageSize = screenWidth * 0.5;

  // Datos de las tarjetas
  const tarjetas = [
    { 
      titulo: 'Tema1', 
      descripcion: 'Descripción 1', 
      imagen: require('../../assets/tema1.png'), 
      ruta: 'Tema1' 
    },
    { 
      titulo: 'Tema2', 
      descripcion: 'Descripción 2', 
      imagen: require('../../assets/tema2.png'), 
      ruta: 'Tema2' 
    },
    { 
      titulo: 'Tema3', 
      descripcion: 'Descripción 3', 
      imagen: require('../../assets/tema3.png'), 
      ruta: 'Tema3' 
    },
    { 
      titulo: 'Tema4', 
      descripcion: 'Descripción 4', 
      imagen: require('../../assets/tema4.png'), 
      ruta: 'Tema4' 
    },
  ];

  return (
    <LinearGradient
      colors={['#0F2027', '#203A43', '#2C5364']} 
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        {/* Encabezado con imagen */}
        <View style={styles.header}>
          <Image
            source={require('../../assets/linux.png')} 
            style={[styles.logoImage, { width: imageSize, height: imageSize }]}
            resizeMode="contain" 
          />
        </View>

        {/* Título principal */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>SISTEMA OPERATIVO LINUX</Text> {/* Texto del título */}
        </View>

        {/* Contenedor de tarjetas scrollables */}
        <View style={styles.cardsContainer}>
          <ScrollView
            horizontal // Habilita el desplazamiento horizontal
            showsHorizontalScrollIndicator={false} // Oculta el indicador de desplazamiento
            contentContainerStyle={styles.cardsScrollContent} // Estilo del contenido scrollable
            decelerationRate={Platform.OS === 'ios' ? 'fast' : 'normal'} // Configuración de velocidad de desplazamiento
            snapToInterval={cardWidth + 20} // Ajusta el desplazamiento al tamaño de las tarjetas
            snapToAlignment="center"
          >
            {/* Mapeo de las tarjetas */}
            {tarjetas.map((tarjeta, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => navigation.navigate(tarjeta.ruta)}
                style={[styles.card, { width: cardWidth, height: cardHeight }]}
              >
                <ImageBackground
                  source={tarjeta.imagen}
                  style={styles.cardImageBackground}
                  imageStyle={styles.cardImageStyle}
                >
                  <View style={styles.cardOverlay} />
                  <View style={styles.cardContent}>
                    {/* Asegúrate de que los textos estén dentro de un <Text> */}
                    <Text style={styles.cardTitle}>{tarjeta.titulo}</Text>
                    <Text style={styles.cardDescription}>{tarjeta.descripcion}</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  logoImage: {
    aspectRatio: 1,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 30,
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardsScrollContent: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  card: {
    marginHorizontal: 10,
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  cardImageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardImageStyle: {
    borderRadius: 12,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(46, 45, 42, 0.6)',
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  cardDescription: {
    fontSize: 14,
    color: '#EEE',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default HomeScreen;