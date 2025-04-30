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
import { styles } from './estilos/inicio.module'; // Importa los estilos
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
      descripcion: 'Descripcion 1 ', 
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



export default HomeScreen;