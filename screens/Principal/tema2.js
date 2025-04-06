import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';

const Tema2Screen = () => {
  const [expanded, setExpanded] = useState(false); // Estado para controlar si está expandido

  //  Función para alternar entre expandido y colapsado
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/*  Encabezado Deslizable */}
      <View style={styles.headerContainer}>
        <ImageBackground
          source={require('../../assets/t6.png')} // Verifica ruta correcta
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          <View style={styles.overlay} />
          <Text style={styles.title}>Arquitectura y Desempeño en Linux</Text>
        </ImageBackground>
      </View>

      {/*  Sección 1: Tarjetas Animadas */}
      <View style={styles.card}>
        <TouchableOpacity onPress={toggleExpand} style={styles.cardTouchable}>
          {/*  Mostrar la imagen solo si NO está expandido */}
          {!expanded && (
            <Image
              source={require('../../assets/t2.png')} // Ruta correcta
              style={styles.cardImage}
            />
          )}
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>¿Qué es Linux?</Text>
            {/*  Mostrar el texto solo si está expandido */}
            {expanded && (
              <Text style={styles.cardDescription}>
                Linux es un sistema operativo de código abierto basado en el sistema Unix, desarrollado inicialmente por Linus Torvalds en 1991. A diferencia de los sistemas operativos propietarios como Windows o macOS, Linux es distribuido bajo la Licencia Pública General de GNU (GPL), lo que significa que cualquier persona puede utilizarlo, modificarlo y distribuirlo libremente.

El núcleo de Linux, conocido como Kernel, es el encargado de gestionar los recursos del hardware del sistema, como la memoria, el procesador y los dispositivos de entrada y salida. Este núcleo proporciona una base sólida sobre la que se ejecutan aplicaciones y servicios, permitiendo a los usuarios interactuar con el sistema a través de una interfaz gráfica o mediante una interfaz de línea de comandos.

A lo largo de los años, Linux ha evolucionado y ha dado lugar a una gran variedad de distribuciones (o distros), que son versiones del sistema adaptadas para diferentes necesidades y entornos. Estas distribuciones combinan el kernel de Linux con herramientas y aplicaciones que facilitan su uso y administración. Algunas de las distribuciones más conocidas incluyen Ubuntu, Debian, Fedora, CentOS y Arch Linux.

Linux se utiliza ampliamente en entornos empresariales, servidores web, sistemas embebidos y dispositivos móviles debido a su robustez, seguridad y flexibilidad. De hecho, una gran parte de la infraestructura de Internet, incluyendo servidores de grandes compañías como Google, Facebook y Amazon, funciona sobre sistemas Linux.

Una de las principales razones del éxito de Linux es su modelo colaborativo de desarrollo. Miles de programadores de todo el mundo contribuyen al código del sistema, mejorando constantemente su rendimiento, seguridad y funcionalidad. Esto ha permitido que Linux se adapte a una amplia variedad de plataformas y arquitecturas de hardware, desde computadoras personales hasta supercomputadoras y dispositivos móviles.

En el ámbito de los dispositivos móviles, Android, el sistema operativo más utilizado en el mundo, está basado en el kernel de Linux. Esto significa que millones de dispositivos móviles utilizan una versión modificada de Linux para gestionar sus recursos y ejecutar aplicaciones.

Linux también es muy valorado en entornos académicos y de investigación, donde su capacidad para personalizar el sistema operativo y adaptarlo a proyectos específicos lo convierte en una herramienta ideal para la experimentación y el desarrollo de nuevas tecnologías.
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>



      {/*  Sección 2: Sección Visual Dividida */}
      <View style={styles.splitSection}>
        <View style={styles.splitLeft}>
          <Image source={require('../../assets/tema1.png')} style={styles.splitImage} />
        </View>
        <View style={styles.splitRight}>
          <Text style={styles.splitTitle}>El Kernel</Text>
          <Text style={styles.splitDescription}>Corazón del sistema operativo Linux.</Text>
        </View>
      </View>

      {/*  Sección 3: Tarjeta de Estilo Diferente */}
      <View style={styles.highlightCard}>
        <Text style={styles.highlightTitle}>⚡️ Desempeño en Linux</Text>
        <Text style={styles.highlightText}>
          El manejo de procesos y memoria garantiza velocidad y estabilidad.
        </Text>
      </View>

      {/*  Sección 4: Galería de Distribuciones */}
      {/*  Sección de Distribuciones */}
      <View style={styles.galleryContainer}>
    <Text style={styles.sectionTitle}> Tipos de Distribuciones de Linux</Text>

    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryScroll}>
        {/* Tarjeta 1: Ubuntu */}
        <TouchableOpacity style={styles.galleryCard}>
        <Image source={require('../../assets/t7.png')} style={styles.galleryImage} />
        <Text style={styles.galleryTitle}>Ubuntu</Text>
        
        {/* Scroll interno para descripción larga */}
        <ScrollView style={styles.descriptionScroll} nestedScrollEnabled={true}>
            <Text style={styles.galleryDescription}>
            Ubuntu es una distribución de Linux basada en Debian, desarrollada y mantenida por Canonical Ltd., una empresa británica fundada por Mark Shuttleworth en 2004. Ubuntu es uno de los sistemas operativos basados en Linux más populares del mundo, conocido por su simplicidad, facilidad de uso y enfoque en la accesibilidad para usuarios nuevos y experimentados.

            El objetivo principal de Ubuntu es ofrecer un sistema operativo gratuito, de código abierto y fácil de utilizar para cualquier persona, independientemente de su nivel de experiencia técnica. A diferencia de otras distribuciones de Linux más orientadas a usuarios avanzados, Ubuntu está diseñado para ser intuitivo y accesible, proporcionando una interfaz gráfica amigable y una amplia variedad de aplicaciones preinstaladas que permiten realizar tareas cotidianas sin complicaciones.

            Ubuntu utiliza el entorno de escritorio GNOME como su interfaz predeterminada, aunque también ofrece variantes con otros entornos como Kubuntu (con KDE Plasma), Xubuntu (con XFCE) y Lubuntu (con LXQt), adaptándose así a diferentes preferencias y necesidades de los usuarios.
            </Text>
        </ScrollView>
        </TouchableOpacity>

        {/* Tarjeta 2: CentOS */}
        <TouchableOpacity style={styles.galleryCard}>
        <Image source={require('../../assets/t8.png')} style={styles.galleryImage} />
        <Text style={styles.galleryTitle}>CentOS</Text>

        {/* Scroll interno para descripción */}
        <ScrollView style={styles.descriptionScroll} nestedScrollEnabled={true}>
            <Text style={styles.galleryDescription}>
            Estable para entornos empresariales y servidores.
            </Text>
        </ScrollView>
        </TouchableOpacity>

        {/* Tarjeta 3: Kali Linux */}
        <TouchableOpacity style={styles.galleryCard}>
        <Image source={require('../../assets/t9.png')} style={styles.galleryImage} />
        <Text style={styles.galleryTitle}>Kali Linux</Text>

        {/* Scroll interno para descripción */}
        <ScrollView style={styles.descriptionScroll} nestedScrollEnabled={true}>
            <Text style={styles.galleryDescription}>
            Enfocada en pentesting y análisis de seguridad.
            </Text>
        </ScrollView>
        </TouchableOpacity>

        {/* Tarjeta 4: Raspbian */}
        <TouchableOpacity style={styles.galleryCard}>
        <Image source={require('../../assets/t10.png')} style={styles.galleryImage} />
        <Text style={styles.galleryTitle}>Raspbian</Text>

        {/* Scroll interno para descripción */}
        <ScrollView style={styles.descriptionScroll} nestedScrollEnabled={true}>
            <Text style={styles.galleryDescription}>
            Sistema para dispositivos Raspberry Pi.
            </Text>
        </ScrollView>
        </TouchableOpacity>
    </ScrollView>
    </View>



      {/*  Pie de Página Dinámico */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>🚀 Prepárate para explorar más sobre cyberseguridad.</Text>
      </View>
    </ScrollView>
  );
};

//  Estilos para Diseño Avanzado
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#1E1E1E',
  },
  headerContainer: {
    height: 250, // Altura de la imagen superior
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Superposición oscura
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginVertical: 20,
    marginLeft: 10,
  },
  card: {
    backgroundColor: '#2E2E2E',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 12,
    margin: 20,
    elevation: 4,
  },
  cardTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: 60,
    height: 60,
    marginRight: 12,
    borderRadius: 8,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  cardDescription: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
    textAlign: 'justify',
  },
  
  splitSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E2E2E',
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 10,
    marginBottom: 20,
  },
  splitLeft: {
    flex: 1,
  },
  splitRight: {
    flex: 1,
    paddingLeft: 10,
  },
  splitImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  splitTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  splitDescription: {
    fontSize: 14,
    color: '#fff',
  },
  highlightCard: {
    backgroundColor: '#FFD700',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  highlightTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  highlightText: {
    fontSize: 14,
    color: '#333',
  },
  galleryContainer: {
    marginBottom: 20,
  },
  galleryScroll: {
    marginHorizontal: 10,
  },
  galleryCard: {
    backgroundColor: '#2E2E2E',
    width: 200,
    height: 300,
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  galleryImage: {
    width: '80%',
    height: '40%',
    margin: 22,
    borderRadius: 15,
  },
  galleryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 4,
  },
  galleryDescription: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  
  footerContainer: {
    backgroundColor: '#FFD700',
    paddingVertical: 12,
    marginTop: 20,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Tema2Screen;
