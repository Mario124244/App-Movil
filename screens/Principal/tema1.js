import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager
} from 'react-native';



// Datos de las distribuciones de Linux
const distributions = [
  {
    id: 1,
    name: 'Ubuntu',
    image: require('../../assets/t7.png'),
    description: 'Ubuntu es una distribución de Linux basada en Debian, desarrollada y mantenida por Canonical Ltd. Popular por su facilidad de uso y gran comunidad.'
  },
  {
    id: 2,
    name: 'CentOS',
    image: require('../../assets/t8.png'),
    description: 'Estable para entornos empresariales y servidores.'
  },
  {
    id: 3,
    name: 'Kali Linux',
    image: require('../../assets/t9.png'),
    description: 'Enfocada en pentesting y análisis de seguridad.'
  },
  {
    id: 4,
    name: 'Raspbian',
    image: require('../../assets/t10.png'),
    description: 'Sistema para dispositivos Raspberry Pi.'
  }
];


const COLORS = {
  primary: '#1E1E1E',
  secondary: '#2E2E2E',
  accent: '#FFD700',
  text: '#FFFFFF',
  darkText: '#333333',
};


const DistributionCard = ({ name, image, description, resaltarPalabra }) => (
  <TouchableOpacity style={styles.galleryCard}>
    <Image source={image} style={styles.galleryImage} accessibilityLabel={`Logo de ${name}`} />
    <Text style={styles.galleryTitle}>{resaltarPalabra(name)}</Text>
    <ScrollView style={styles.descriptionScroll} nestedScrollEnabled>
      <Text style={styles.galleryDescription}>
        {resaltarPalabra(description)}
      </Text>
    </ScrollView>
  </TouchableOpacity>
);

const Tema1Screen = ({ route }) => {
  const [expanded, setExpanded] = useState(false);
  const scrollViewRef = useRef(null);
  const palabraBuscada = route?.params?.palabra?.toLowerCase() || '';

  const refs = {
    sistema: useRef(null),
    kernel: useRef(null),
    procesos: useRef(null),
    distribuciones: useRef(null),
  };

  // Efecto para scroll a palabra buscada
  useEffect(() => {
    if (palabraBuscada && refs[palabraBuscada]?.current) {
      const timer = setTimeout(() => {
        refs[palabraBuscada].current?.measureLayout(
          scrollViewRef.current,
          (x, y) => {
            scrollViewRef.current?.scrollTo({ y: y - 50, animated: true });
          },
          () => console.warn('No se pudo ubicar la palabra buscada')
        );
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [palabraBuscada]);

  // Función para expandir/contraer con animación
  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  // Función memoizada para resaltar texto
  const resaltarPalabra = useCallback((texto) => {
    if (!palabraBuscada) return texto;

    const regex = new RegExp(`(${palabraBuscada})`, 'gi');
    const partes = texto.split(regex);

    return partes.map((parte, index) =>
      parte.toLowerCase() === palabraBuscada ? (
        <Text key={index} style={styles.highlightedText}>
          {parte}
        </Text>
      ) : (
        parte
      )
    );
  }, [palabraBuscada]);

  return (
    <ScrollView 
      ref={scrollViewRef} 
      contentContainerStyle={styles.scrollContainer}
      accessibilityLabel="Pantalla de información sobre Linux"
    >
      {/* Encabezado */}
      <View style={styles.headerContainer}>
        <ImageBackground
          source={require('../../assets/t6.png')}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
          accessibilityLabel="Imagen de fondo de Linux"
        >
          <View style={styles.overlay} />
          <Text style={styles.title} accessibilityRole="header">
            {resaltarPalabra('Arquitectura y Desempeño en Linux')}
          </Text>
        </ImageBackground>
      </View>

      {/* Sección 1: ¿Qué es Linux? */}
      <View style={styles.card} ref={refs.sistema}>
        <TouchableOpacity 
          onPress={toggleExpand}
          style={styles.cardTouchable}
          accessible
          accessibilityLabel={expanded ? "Contraer información sobre Linux" : "Expandir información sobre Linux"}
          accessibilityRole="button"
        >
          {!expanded && (
            <Image
              source={require('../../assets/t2.png')}
              style={styles.cardImage}
              accessibilityLabel="Icono de Linux"
            />
          )}
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              {resaltarPalabra('¿Qué es Linux?')}
            </Text>
            {expanded && (
              <Text style={styles.cardDescription}>
                {resaltarPalabra(
                  'Linux es un sistema operativo de código abierto basado en el sistema Unix, desarrollado inicialmente por Linus Torvalds en 1991. A diferencia de los sistemas operativos propietarios como Windows o macOS, Linux es distribuido bajo la Licencia Pública General de GNU (GPL), lo que significa que cualquier persona puede utilizarlo, modificarlo y distribuirlo libremente.'
                )}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Sección 2: El Kernel */}
      <View style={styles.splitSection} ref={refs.kernel}>
        <View style={styles.splitLeft}>
          <Image 
            source={require('../../assets/tema1.png')} 
            style={styles.splitImage} 
            accessibilityLabel="Diagrama del kernel de Linux"
          />
        </View>
        <View style={styles.splitRight}>
          <Text style={styles.splitTitle}>
            {resaltarPalabra('El Kernel')}
          </Text>
          <Text style={styles.splitDescription}>
            {resaltarPalabra('Corazón del sistema operativo Linux. Gestiona los recursos del sistema, proporciona una interfaz para la comunicación entre hardware y software, y asegura el funcionamiento eficiente de todo el sistema.')}
          </Text>
        </View>
      </View>

      {/* Sección 3: Desempeño en Linux */}
      <View style={styles.highlightCard} ref={refs.procesos}>
        <Text style={styles.highlightTitle}>
          {resaltarPalabra('⚡️ Desempeño en Linux')}
        </Text>
        <Text style={styles.highlightText}>
          {resaltarPalabra('El manejo de procesos y memoria en Linux garantiza velocidad y estabilidad. Su diseño modular permite un uso eficiente de recursos, incluso en hardware limitado. La planificación de procesos y el manejo de memoria virtual son clave en su excelente desempeño.')}
        </Text>
      </View>

      {/* Sección 4: Distribuciones de Linux */}
      <View style={styles.galleryContainer} ref={refs.distribuciones}>
        <Text style={styles.sectionTitle}>
          {resaltarPalabra('Tipos de Distribuciones de Linux')}
        </Text>
        
        <FlatList
          horizontal
          data={distributions}
          renderItem={({ item }) => (
            <DistributionCard 
              name={item.name}
              image={item.image}
              description={item.description}
              resaltarPalabra={resaltarPalabra}
            />
          )}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.galleryScroll}
          accessibilityLabel="Galería de distribuciones de Linux"
        />
      </View>

      {/* Pie de página */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          {resaltarPalabra('Prepárate para explorar más sobre Linux.')}
        </Text>
      </View>
    </ScrollView>
  );
};

// Estilos
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.primary,
    paddingBottom: 20,
  },
  headerContainer: {
    height: 250,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.accent,
    textAlign: 'center',
    paddingHorizontal: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  highlightedText: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: COLORS.accent,
  },
  card: {
    backgroundColor: COLORS.secondary,
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  cardTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 8,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.accent,
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
  splitSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    marginHorizontal: 20,
    padding: 15,
    marginVertical: 10,
  },
  splitLeft: {
    flex: 1,
    alignItems: 'center',
  },
  splitRight: {
    flex: 2,
    paddingLeft: 15,
  },
  splitImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  splitTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.accent,
    marginBottom: 8,
  },
  splitDescription: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
  highlightCard: {
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  highlightTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: COLORS.darkText,
  },
  highlightText: {
    fontSize: 14,
    color: COLORS.darkText,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.accent,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  galleryContainer: {
    marginBottom: 20,
  },
  galleryScroll: {
    paddingHorizontal: 10,
  },
  galleryCard: {
    backgroundColor: COLORS.secondary,
    width: 200,
    height: 300,
    padding: 15,
    borderRadius: 12,
    marginRight: 15,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  galleryImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 15,
  },
  galleryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.accent,
    marginBottom: 10,
    textAlign: 'center',
  },
  galleryDescription: {
    fontSize: 12,
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 18,
  },
  descriptionScroll: {
    maxHeight: 100,
    width: '100%',
  },
  footerContainer: {
    backgroundColor: COLORS.accent,
    paddingVertical: 15,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.darkText,
  },
});

export default Tema1Screen;