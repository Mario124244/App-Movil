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

// Datos de las distribuciones de Linux con enfoque en arquitectura
const distributions = [
  {
    id: 1,
    name: 'Ubuntu',
    image: require('../../assets/t7.png'),
    description: 'Utiliza el kernel Linux con modificaciones para mejor compatibilidad. Emplea systemd como sistema de init, Snap para gestión de paquetes, y ofrece soporte para arquitecturas x86, ARM, y RISC-V.'
  },
  {
    id: 2,
    name: 'CentOS',
    image: require('../../assets/t8.png'),
    description: 'Basado en Red Hat Enterprise Linux, usa el kernel Linux con parches de estabilidad. Optimizado para servidores con soporte para SELinux, systemd, y gestión avanzada de paquetes RPM.'
  },
  {
    id: 3,
    name: 'Kali Linux',
    image: require('../../assets/t9.png'),
    description: 'Incluye kernel Linux con parches para pentesting, soporte para inyección de paquetes 802.11, y herramientas compiladas con opciones de seguridad como PIE y RELRO.'
  },
  {
    id: 4,
    name: 'Arch Linux',
    image: require('../../assets/t10.png'),
    description: 'Sistema rolling-release con kernel vanilla Linux, optimizado para rendimiento. Usa pacman para gestión de paquetes y systemd para gestión de servicios.'
  }
];

const COLORS = {
  primary: '#1E1E1E',
  secondary: '#2E2E2E',
  accent: '#FFD700',
  text: '#FFFFFF',
  darkText: '#333333',
};

const PerformanceMetric = ({ title, value, description }) => (
  <View style={styles.metricContainer}>
    <Text style={styles.metricTitle}>{title}</Text>
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricDescription}>{description}</Text>
  </View>
);

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
    memoria: useRef(null),
    filesystem: useRef(null),
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

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

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
      accessibilityLabel="Pantalla de información sobre arquitectura y desempeño de Linux"
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

      {/* Sección 1: Arquitectura de Linux */}
      <View style={styles.card} ref={refs.sistema}>
        <TouchableOpacity 
          onPress={toggleExpand}
          style={styles.cardTouchable}
          accessible
          accessibilityLabel={expanded ? "Contraer información sobre arquitectura de Linux" : "Expandir información sobre arquitectura de Linux"}
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
              {resaltarPalabra('Arquitectura de Linux')}
            </Text>
            {expanded && (
              <View>
                <Text style={styles.cardDescription}>
                  {resaltarPalabra(
                    'Linux sigue una arquitectura modular basada en el diseño monolítico del kernel, donde todos los subsistemas principales (gestión de procesos, memoria, sistemas de archivos, red, etc.) se ejecutan en espacio de kernel con privilegios elevados. Sin embargo, utiliza módulos cargables dinámicamente (LKM - Loadable Kernel Modules) para extender funcionalidad sin necesidad de recompilar el kernel.'
                  )}
                </Text>
                <Text style={styles.cardDescription}>
                  {resaltarPalabra(
                    'La arquitectura se divide en:'
                  )}
                </Text>
                <Text style={styles.listItem}>• <Text style={styles.bold}>Espacio de usuario</Text>: Aplicaciones y bibliotecas (GNU C library, etc.)</Text>
                <Text style={styles.listItem}>• <Text style={styles.bold}>System Call Interface</Text>: Interfaz entre espacio usuario y kernel (≈300 syscalls en x86)</Text>
                <Text style={styles.listItem}>• <Text style={styles.bold}>Kernel</Text>: Subsistemas principales (planificador, gestión de memoria, VFS, etc.)</Text>
                <Text style={styles.listItem}>• <Text style={styles.bold}>Controladores de dispositivo</Text>: Interfaz con hardware</Text>
              </View>
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
            {resaltarPalabra('El Kernel Linux')}
          </Text>
          <Text style={styles.splitDescription}>
            {resaltarPalabra('El kernel Linux (actualmente en la serie 6.x) implementa características avanzadas:')}
          </Text>
          <Text style={styles.listItem}>• <Text style={styles.bold}>Planificador CFS</Text>: Completely Fair Scheduler desde 2.6.23 (time slices basados en pesos)</Text>
          <Text style={styles.listItem}>• <Text style={styles.bold}>O(1) scheduler</Text>: Tiempo constante para planificación</Text>
          <Text style={styles.listItem}>• <Text style={styles.bold}>Namespaces y cgroups</Text>: Aislamiento de procesos (base para contenedores)</Text>
          <Text style={styles.listItem}>• <Text style={styles.bold}>Kernel preemptivo</Text>: Mejor latencia para aplicaciones en tiempo real</Text>
          <Text style={styles.listItem}>• <Text style={styles.bold}>eBPF</Text>: Mecanismo para ejecución segura de bytecode en el kernel</Text>
        </View>
      </View>

      {/* Sección 3: Gestión de Memoria */}
      <View style={styles.highlightCard} ref={refs.memoria}>
        <Text style={styles.highlightTitle}>
          {resaltarPalabra('🧠 Gestión de Memoria')}
        </Text>
        <Text style={styles.highlightText}>
          {resaltarPalabra('Linux implementa un sistema de memoria virtual sofisticado:')}
        </Text>
        <Text style={styles.listItem}>• <Text style={styles.bold}>Paginación</Text>: Tamaño de página típico de 4KB (2MB/1GB para huellas grandes)</Text>
        <Text style={styles.listItem}>• <Text style={styles.bold}>Swap</Text>: Área de intercambio con políticas LRU mejorado</Text>
        <Text style={styles.listItem}>• <Text style={styles.bold}>Overcommit</Text>: Asignación de memoria más allá de la física disponible</Text>
        <Text style={styles.listItem}>• <Text style={styles.bold}>HugeTLB</Text>: Soporte para páginas de memoria grandes (mejor rendimiento)</Text>
        <Text style={styles.listItem}>• <Text style={styles.bold}>OOM Killer</Text>: Termina procesos cuando la memoria se agota</Text>
      </View>

      {/* Sección 4: Sistemas de Archivos */}
      <View style={styles.card} ref={refs.filesystem}>
        <Text style={styles.cardTitle}>
          {resaltarPalabra('📂 Sistemas de Archivos')}
        </Text>
        <Text style={styles.cardDescription}>
          {resaltarPalabra('Linux soporta múltiples sistemas de archivos a través de su capa VFS (Virtual File System):')}
        </Text>
        <View style={styles.metricsRow}>
          <PerformanceMetric 
            title="Ext4" 
            value="~500K IOPS" 
            description="Journaling, asignación retardada, sistema por defecto en muchas distros" 
          />
          <PerformanceMetric 
            title="XFS" 
            value="~1M IOPS" 
            description="Alto rendimiento para grandes archivos, escalabilidad" 
          />
        </View>
        <View style={styles.metricsRow}>
          <PerformanceMetric 
            title="Btrfs" 
            value="~300K IOPS" 
            description="Copy-on-write, snapshots, compresión integrada" 
          />
          <PerformanceMetric 
            title="ZFS" 
            value="~700K IOPS" 
            description="Pool de almacenamiento, checksumming, compresión" 
          />
        </View>
      </View>

      {/* Sección 5: Desempeño */}
      <View style={styles.highlightCard} ref={refs.procesos}>
        <Text style={styles.highlightTitle}>
          {resaltarPalabra('⚡️ Métricas de Desempeño')}
        </Text>
        <Text style={styles.highlightText}>
          {resaltarPalabra('Linux sobresale en benchmarks de desempeño:')}
        </Text>
        <View style={styles.metricsRow}>
          <PerformanceMetric 
            title="Latencia syscall" 
            value="<100ns" 
            description="Llamadas al kernel mínimas" 
          />
          <PerformanceMetric 
            title="Context Switch" 
            value="~1μs" 
            description="Cambio rápido entre procesos" 
          />
        </View>
        <View style={styles.metricsRow}>
          <PerformanceMetric 
            title="Throughput red" 
            value="100Gbps+" 
            description="Con NICs modernas y tuning" 
          />
          <PerformanceMetric 
            title="IOPS disco" 
            value="Millones" 
            description="Con NVMe y sistemas optimizados" 
          />
        </View>
        <Text style={styles.highlightText}>
          {resaltarPalabra('Factores clave del desempeño:')}
        </Text>
        <Text style={styles.listItem}>• <Text style={styles.bold}>CFS</Text>: Planificador justo para cargas mixtas</Text>
        <Text style={styles.listItem}>• <Text style={styles.bold}>I/O Schedulers</Text>: Kyber, BFQ, mq-deadline para diferentes cargas</Text>
        <Text style={styles.listItem}>• <Text style={styles.bold}>TCP/IP Stack</Text>: Alto rendimiento con soporte para aceleración hardware</Text>
        <Text style={styles.listItem}>• <Text style={styles.bold}>RCU</Text>: Read-Copy-Update para sincronización escalable</Text>
      </View>

      {/* Sección 6: Distribuciones de Linux */}
      <View style={styles.galleryContainer} ref={refs.distribuciones}>
        <Text style={styles.sectionTitle}>
          {resaltarPalabra('Distribuciones y su Arquitectura')}
        </Text>
        <Text style={styles.sectionSubtitle}>
          Comparación de enfoques arquitectónicos en distribuciones populares
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
          {resaltarPalabra('Linux continúa evolucionando con mejoras en: rendimiento (io_uring, DAMON), seguridad (Landlock, Kernel Lockdown), y soporte hardware (ARM, RISC-V).')}
        </Text>
      </View>
    </ScrollView>
  );
};
// Estilos
const styles = StyleSheet.create({
  // Estilos existentes
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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

  // Nuevos estilos añadidos
  bold: {
    fontWeight: 'bold',
    color: COLORS.accent
  },
  listItem: {
    color: COLORS.text,
    marginBottom: 8,
    lineHeight: 22,
    fontSize: 14,
    paddingLeft: 10, // Espaciado adicional para alineación
  },
  metricContainer: {
    backgroundColor: COLORS.secondary,
    padding: 15,
    borderRadius: 8,
    margin: 5,
    flex: 1,
    minWidth: 150,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  metricTitle: {
    color: COLORS.accent,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5
  },
  metricValue: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5
  },
  metricDescription: {
    color: COLORS.text,
    fontSize: 12,
    lineHeight: 16
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingHorizontal: 10
  },
  sectionSubtitle: {
    color: COLORS.text,
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
    opacity: 0.8,
    paddingHorizontal: 20
  },
  // Estilo adicional para mejorar la legibilidad de las listas
  listContainer: {
    marginTop: 10,
    marginBottom: 5,
    paddingLeft: 15
  },
  // Estilo para código técnico
  codeText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 3,
    borderRadius: 3,
    color: COLORS.text
  }
});

export default Tema1Screen;