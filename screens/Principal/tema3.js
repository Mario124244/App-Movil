import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  Easing,
  FlatList,
  Linking,
  Modal,
  Share,
  Platform // Agregado aquí
} from 'react-native';

const { width, height } = Dimensions.get('window');

const TemaAlmacenaje = () => {
  // Estados para las secciones expandibles
  const [expandedSections, setExpandedSections] = useState({
    jerarquia: false,
    memoria: false,
    discos: false,
    comandos: false,
    herramientas: false
  });
  
  // Animaciones para las flechas
  const rotateAnims = {
    jerarquia: useRef(new Animated.Value(0)).current,
    memoria: useRef(new Animated.Value(0)).current,
    discos: useRef(new Animated.Value(0)).current,
    comandos: useRef(new Animated.Value(0)).current,
    herramientas: useRef(new Animated.Value(0)).current
  };
  
  const [selectedCommand, setSelectedCommand] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  // Datos técnicos
  const filesystemTypes = [
    { name: 'ext4', description: 'Sistema de archivos journaling, predeterminado en muchas distribuciones', features: 'Soporte para archivos hasta 16TB, límite de sistema de archivos de 1EB' },
    { name: 'XFS', description: 'Sistema de archivos de alto rendimiento para grandes cantidades de datos', features: 'Escalabilidad masiva, óptimo para servidores de archivos' },
    { name: 'Btrfs', description: 'Sistema de archivos moderno con características avanzadas', features: 'Snapshots, compresión transparente, checksumming de datos' },
    { name: 'ZFS', description: 'Sistema de archivos avanzado con gestión integrada de volúmenes', features: 'Deduplicación, snapshots, checksums, auto-reparación' }
  ];

  const memoryCommands = [
    { command: 'free -h', description: 'Muestra memoria física y swap disponible y usada' },
    { command: 'vmstat 1', description: 'Estadísticas de memoria virtual cada segundo' },
    { command: 'top', description: 'Monitor interactivo de procesos y uso de memoria' },
    { command: 'htop', description: 'Versión mejorada de top con interfaz más amigable' },
    { command: 'pmap -x [PID]', description: 'Detalle del uso de memoria de un proceso específico' }
  ];

  const storageCommands = [
    { command: 'df -h', description: 'Espacio usado y disponible en sistemas de archivos montados' },
    { command: 'du -sh [directorio]', description: 'Resumen del espacio usado por un directorio' },
    { command: 'lsblk', description: 'Lista información sobre dispositivos de bloque' },
    { command: 'fdisk -l', description: 'Muestra información detallada de particiones' },
    { command: 'smartctl -a /dev/sda', description: 'Información SMART de un disco (requiere smartmontools)' }
  ];

  const monitoringTools = [
    { name: 'iotop', description: 'Monitor de E/S de disco en tiempo real', usage: 'sudo iotop' },
    { name: 'ncdu', description: 'Analizador de uso de disco con interfaz NCurses', usage: 'ncdu /path/to/directory' },
    { name: 'glances', description: 'Monitor de sistema todo-en-uno', usage: 'glances' },
    { name: 'dstat', description: 'Herramienta versátil para estadísticas del sistema', usage: 'dstat -cdngy' }
  ];

  // Animaciones
  const toggleSection = (section) => {
    Animated.timing(rotateAnims[section], {
      toValue: expandedSections[section] ? 0 : 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
    
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  const rotateInterpolate = (anim) => anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg']
  });

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [200, 80],
    extrapolate: 'clamp'
  });

  // Componentes reutilizables
  const CommandCard = ({ cmd }) => (
    <TouchableOpacity 
      style={styles.commandCard}
      onPress={() => {
        setSelectedCommand(cmd);
      }}
      activeOpacity={0.7}
    >
      <View style={styles.commandHeader}>
        <Text style={styles.commandText}>$ {cmd.command}</Text>
      </View>
      <Text style={styles.commandDescription}>{cmd.description}</Text>
    </TouchableOpacity>
  );

  const FilesystemCard = ({ fs }) => (
    <View style={styles.fsCard}>
      <View style={styles.fsHeader}>
        <Text style={styles.fsName}>{fs.name}</Text>
        <View style={styles.fsBadge}>
          <Text style={styles.fsBadgeText}>FS</Text>
        </View>
      </View>
      <Text style={styles.fsDescription}>{fs.description}</Text>
      <Text style={styles.fsFeatures}>{fs.features}</Text>
    </View>
  );

  const ToolCard = ({ tool }) => (
    <View style={styles.toolCard}>
      <Text style={styles.toolName}>{tool.name}</Text>
      <Text style={styles.toolDescription}>{tool.description}</Text>
      <View style={styles.toolUsage}>
        <Text style={styles.toolUsageText}>Uso: {tool.usage}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.headerContainer, { height: headerHeight }]}>
        <ImageBackground
          source={require('../../assets/a1.png')} // Imagen de fondo
          style={styles.headerBackground}
          imageStyle={styles.headerImageStyle}
        >
          <View style={styles.headerOverlay}>
            <Text style={styles.headerTitle}>Almacenaje y Memoria en Linux</Text>
            <Text style={styles.headerSubtitle}>Gestión avanzada de recursos del sistema</Text>
          </View>
        </ImageBackground>
      </Animated.View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Sección de Jerarquía de Archivos */}
        <TouchableOpacity 
          onPress={() => toggleSection('jerarquia')} 
          activeOpacity={0.9}
          style={[styles.sectionCard, styles.elevatedCard]}
        >
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Image source={require('../../assets/t7.png')} style={styles.cardIcon} /> {/* Icono de carpeta */}
            </View>
            <Text style={styles.cardTitle}>Jerarquía del Sistema de Archivos</Text>
            <Animated.View style={{ transform: [{ rotate: rotateInterpolate(rotateAnims.jerarquia) }] }}>
              <Text style={styles.expandIcon}>›</Text>
            </Animated.View>
          </View>

          {expandedSections.jerarquia && (
            <View style={styles.cardBody}>
              <Text style={styles.cardDescription}>
                Linux sigue el estándar de jerarquía del sistema de archivos (FHS) que define la estructura de directorios y su propósito. Esta organización es fundamental para la interoperabilidad entre distribuciones.
              </Text>
              
              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Directorios clave:</Text>
                <View style={styles.directoryList}>
                  <View style={styles.directoryItem}>
                    <Text style={styles.directoryPath}>/bin</Text>
                    <Text style={styles.directoryDesc}>Binarios esenciales para todos los usuarios</Text>
                  </View>
                  <View style={styles.directoryItem}>
                    <Text style={styles.directoryPath}>/etc</Text>
                    <Text style={styles.directoryDesc}>Archivos de configuración del sistema</Text>
                  </View>
                  <View style={styles.directoryItem}>
                    <Text style={styles.directoryPath}>/var</Text>
                    <Text style={styles.directoryDesc}>Datos variables (logs, caché, etc.)</Text>
                  </View>
                  <View style={styles.directoryItem}>
                    <Text style={styles.directoryPath}>/dev</Text>
                    <Text style={styles.directoryDesc}>Dispositivos del sistema</Text>
                  </View>
                  <View style={styles.directoryItem}>
                    <Text style={styles.directoryPath}>/proc</Text>
                    <Text style={styles.directoryDesc}>Sistema de archivos virtual para información del kernel</Text>
                  </View>
                </View>
              </View>

              <View style={styles.codeBlock}>
                <Text style={styles.codeComment}># Explorar la jerarquía</Text>
                <Text style={styles.codeText}>$ ls -l /</Text>
                <Text style={styles.codeText}>$ tree -L 1 /</Text>
                <Text style={styles.codeText}>$ man hier</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* Sección de Gestión de Memoria */}
        <TouchableOpacity 
          onPress={() => toggleSection('memoria')} 
          activeOpacity={0.9}
          style={[styles.sectionCard, styles.elevatedCard]}
        >
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Image source={require('../../assets/t8.png')} style={styles.cardIcon} /> {/* Icono de memoria */}
            </View>
            <Text style={styles.cardTitle}>Gestión de Memoria en Linux</Text>
            <Animated.View style={{ transform: [{ rotate: rotateInterpolate(rotateAnims.memoria) }] }}>
              <Text style={styles.expandIcon}>›</Text>
            </Animated.View>
          </View>

          {expandedSections.memoria && (
            <View style={styles.cardBody}>
              <Text style={styles.cardDescription}>
                Linux utiliza un sofisticado sistema de gestión de memoria que incluye paginación, swapping, caché de disco y técnicas avanzadas de asignación. El kernel optimiza automáticamente el uso de memoria física y swap.
              </Text>
              
              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Conceptos clave:</Text>
                <View style={styles.conceptList}>
                  <View style={styles.conceptItem}>
                    <Text style={styles.conceptTitle}>Memoria Virtual</Text>
                    <Text style={styles.conceptDesc}>Espacio de direcciones de 4GB (32-bit) o mucho mayor (64-bit) por proceso</Text>
                  </View>
                  <View style={styles.conceptItem}>
                    <Text style={styles.conceptTitle}>Swappiness</Text>
                    <Text style={styles.conceptDesc}>Parámetro (0-100) que controla la tendencia a usar swap (vm.swappiness)</Text>
                  </View>
                  <View style={styles.conceptItem}>
                    <Text style={styles.conceptTitle}>OOM Killer</Text>
                    <Text style={styles.conceptDesc}>Mecanismo que termina procesos cuando el sistema se queda sin memoria</Text>
                  </View>
                  <View style={styles.conceptItem}>
                    <Text style={styles.conceptTitle}>Huge Pages</Text>
                    <Text style={styles.conceptDesc}>Páginas de memoria más grandes (2MB o 1GB) para mejorar TLB hits</Text>
                  </View>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Comandos útiles:</Text>
                <FlatList
                  data={memoryCommands}
                  renderItem={({ item }) => <CommandCard cmd={item} />}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.commandsScroll}
                />
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* Sección de Gestión de Discos */}
        <TouchableOpacity 
          onPress={() => toggleSection('discos')} 
          activeOpacity={0.9}
          style={[styles.sectionCard, styles.elevatedCard]}
        >
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Image source={require('../../assets/t9.png')} style={styles.cardIcon} /> {/* Icono de disco */}
            </View>
            <Text style={styles.cardTitle}>Gestión de Discos y Particiones</Text>
            <Animated.View style={{ transform: [{ rotate: rotateInterpolate(rotateAnims.discos) }] }}>
              <Text style={styles.expandIcon}>›</Text>
            </Animated.View>
          </View>

          {expandedSections.discos && (
            <View style={styles.cardBody}>
              <Text style={styles.cardDescription}>
                Linux soporta una amplia variedad de tecnologías de almacenamiento, desde discos tradicionales hasta sistemas avanzados como LVM, RAID y dispositivos NVMe. El subsistema de bloques del kernel gestiona eficientemente estos dispositivos.
              </Text>
              
              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Tecnologías clave:</Text>
                <View style={styles.techGrid}>
                  <View style={styles.techItem}>
                    <Text style={styles.techTitle}>LVM</Text>
                    <Text style={styles.techDesc}>Gestión lógica de volúmenes para flexibilidad en almacenamiento</Text>
                  </View>
                  <View style={styles.techItem}>
                    <Text style={styles.techTitle}>RAID</Text>
                    <Text style={styles.techDesc}>Redundancia y/o rendimiento mediante múltiples discos</Text>
                  </View>
                  <View style={styles.techItem}>
                    <Text style={styles.techTitle}>Btrfs/ZFS</Text>
                    <Text style={styles.techDesc}>Sistemas de archivos modernos con características avanzadas</Text>
                  </View>
                  <View style={styles.techItem}>
                    <Text style={styles.techTitle}>iSCSI</Text>
                    <Text style={styles.techDesc}>Protocolo para acceso a almacenamiento en red</Text>
                  </View>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Sistemas de archivos:</Text>
                <FlatList
                  data={filesystemTypes}
                  renderItem={({ item }) => <FilesystemCard fs={item} />}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.fsScroll}
                />
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Comandos esenciales:</Text>
                <FlatList
                  data={storageCommands}
                  renderItem={({ item }) => <CommandCard cmd={item} />}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.commandsScroll}
                />
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* Sección de Herramientas de Monitoreo */}
        <TouchableOpacity 
          onPress={() => toggleSection('herramientas')} 
          activeOpacity={0.9}
          style={[styles.sectionCard, styles.elevatedCard]}
        >
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Image source={require('../../assets/t10.png')} style={styles.cardIcon} /> {/* Icono de herramientas */}
            </View>
            <Text style={styles.cardTitle}>Herramientas de Monitoreo</Text>
            <Animated.View style={{ transform: [{ rotate: rotateInterpolate(rotateAnims.herramientas) }] }}>
              <Text style={styles.expandIcon}>›</Text>
            </Animated.View>
          </View>

          {expandedSections.herramientas && (
            <View style={styles.cardBody}>
              <Text style={styles.cardDescription}>
                Linux ofrece una amplia gama de herramientas para monitorear el uso de memoria, disco y E/S. Estas herramientas son esenciales para administradores de sistemas y desarrolladores que necesitan optimizar el rendimiento.
              </Text>
              
              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Herramientas recomendadas:</Text>
                <FlatList
                  data={monitoringTools}
                  renderItem={({ item }) => <ToolCard tool={item} />}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.toolsScroll}
                />
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Archivos importantes:</Text>
                <View style={styles.fileList}>
                  <View style={styles.fileItem}>
                    <Text style={styles.filePath}>/proc/meminfo</Text>
                    <Text style={styles.fileDesc}>Información detallada sobre memoria física y swap</Text>
                  </View>
                  <View style={styles.fileItem}>
                    <Text style={styles.filePath}>/proc/diskstats</Text>
                    <Text style={styles.fileDesc}>Estadísticas de actividad de discos</Text>
                  </View>
                  <View style={styles.fileItem}>
                    <Text style={styles.filePath}>/proc/[PID]/smaps</Text>
                    <Text style={styles.fileDesc}>Uso de memoria detallado por proceso</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* Sección de Rendimiento y Optimización */}
        <View style={[styles.performanceCard, styles.elevatedCard]}>
          <View style={styles.performanceHeader}>
            <Image source={require('../../assets/t2.png')} style={styles.performanceIcon} /> {/* Icono de rendimiento */}
            <Text style={styles.performanceTitle}>Optimización de Rendimiento</Text>
          </View>
          
          <View style={styles.tipContainer}>
            <View style={styles.tipItem}>
              <Text style={styles.tipNumber}>1</Text>
              <Text style={styles.tipText}>Ajustar swappiness según necesidades (vm.swappiness)</Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipNumber}>2</Text>
              <Text style={styles.tipText}>Usar I/O scheduler adecuado (deadline para SSD, bfq para HDD)</Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipNumber}>3</Text>
              <Text style={styles.tipText}>Implementar tmpfs para archivos temporales frecuentes</Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipNumber}>4</Text>
              <Text style={styles.tipText}>Monitorizar y limitar procesos con cgroups</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.learnMoreButton}
            onPress={() => Linking.openURL('https://www.kernel.org/doc/html/latest/admin-guide/sysctl/vm.html')}
          >
            <Text style={styles.learnMoreText}>Documentación del Kernel →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerQuote}>
            "En Linux, todo es un archivo - dispositivos, procesos, sockets. Esta filosofía unificada simplifica la gestión del sistema."
          </Text>
          <View style={styles.footerDivider} />
          <Text style={styles.footerText}>
            © {new Date().getFullYear()} Linux Storage Guide | v1.0
          </Text>
        </View>
      </ScrollView>

      {/* Modal de detalle de comando */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={selectedCommand !== null}
        onRequestClose={() => setSelectedCommand(null)}
      >
        {selectedCommand && (
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Comando: {selectedCommand.command}</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setSelectedCommand(null)}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalContent}>
              <Text style={styles.modalDescription}>{selectedCommand.description}</Text>
              
              <Text style={styles.modalSectionTitle}>Ejemplo de uso:</Text>
              <View style={styles.modalCodeBlock}>
                <Text style={styles.modalCodeText}>$ {selectedCommand.command}</Text>
                <Text style={styles.modalOutput}>[Salida del comando]</Text>
              </View>
              
              <Text style={styles.modalSectionTitle}>Opciones comunes:</Text>
              <View style={styles.modalOptions}>
                <Text style={styles.modalOption}>-h: Mostrar ayuda</Text>
                <Text style={styles.modalOption}>-v: Modo verbose</Text>
                <Text style={styles.modalOption}>-a: Mostrar toda la información</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={() => Linking.openURL(`https://man7.org/linux/man-pages/man1/${selectedCommand.command.split(' ')[0]}.1.html`)}
              >
                <Text style={styles.modalButtonText}>Ver Página del Manual</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
      </Modal>
    </View>
  );
};

// Estilos (deberías moverlos a un archivo aparte como estilosTemaAlmacenaje.js)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerContainer: {
    width: '100%',
    overflow: 'hidden',
  },
  headerBackground: {
    width: '100%',
    height: '100%',
  },
  headerImageStyle: {
    opacity: 0.9,
  },
  headerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
    textShadow: '1px 1px 3px rgba(0,0,0,0.5)', // Actualizado
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  elevatedCard: {
    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)', // Actualizado
  },
  sectionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f1f3f5',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4dabf7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  cardTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#343a40',
  },
  expandIcon: {
    fontSize: 20,
    color: '#495057',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  cardBody: {
    padding: 16,
  },
  cardDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: '#495057',
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#4dabf7',
    paddingLeft: 8,
  },
  directoryList: {
    marginBottom: 12,
  },
  directoryItem: {
    marginBottom: 10,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: '#e9ecef',
  },
  directoryPath: {
    fontSize: 15,
    fontWeight: '600',
    color: '#212529',
  },
  directoryDesc: {
    fontSize: 14,
    color: '#495057',
    marginTop: 2,
  },
  conceptList: {
    marginBottom: 12,
  },
  conceptItem: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  conceptTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  conceptDesc: {
    fontSize: 14,
    color: '#495057',
  },
  codeBlock: {
    backgroundColor: '#1e1e1e',
    borderRadius: 6,
    padding: 12,
    marginTop: 8,
  },
  codeComment: {
    color: '#6a9955',
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    marginBottom: 4,
  },
  codeText: {
    color: '#d4d4d4',
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    marginBottom: 4,
  },
  commandsScroll: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  commandCard: {
    width: 220,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  commandHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  commandText: {
    fontSize: 15,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    color: '#212529',
    fontWeight: '600',
  },
  commandDescription: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
  },
  fsScroll: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  fsCard: {
    width: 200,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  fsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  fsName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  fsBadge: {
    backgroundColor: '#4dabf7',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  fsBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  fsDescription: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 8,
  },
  fsFeatures: {
    fontSize: 13,
    color: '#868e96',
    fontStyle: 'italic',
  },
  techGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  techItem: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  techTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  techDesc: {
    fontSize: 13,
    color: '#495057',
  },
  toolsScroll: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  toolCard: {
    width: 220,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  toolName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 6,
  },
  toolDescription: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 10,
    lineHeight: 20,
  },
  toolUsage: {
    backgroundColor: '#f1f3f5',
    borderRadius: 4,
    padding: 8,
  },
  toolUsageText: {
    fontSize: 13,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    color: '#495057',
  },
  fileList: {
    marginBottom: 12,
  },
  fileItem: {
    marginBottom: 10,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: '#e9ecef',
  },
  filePath: {
    fontSize: 15,
    fontWeight: '600',
    color: '#212529',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  fileDesc: {
    fontSize: 14,
    color: '#495057',
    marginTop: 2,
  },
  performanceCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    overflow: 'hidden',
  },
  performanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f1f3f5',
  },
  performanceIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  performanceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#343a40',
  },
  tipContainer: {
    padding: 16,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tipNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4dabf7',
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '600',
    marginRight: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 15,
    color: '#495057',
    lineHeight: 22,
  },
  learnMoreButton: {
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 12,
    backgroundColor: '#f1f3f5',
    borderRadius: 8,
    alignItems: 'center',
  },
  learnMoreText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4dabf7',
  },
  footer: {
    marginTop: 30,
    paddingHorizontal: 16,
    paddingBottom: 30,
    alignItems: 'center',
  },
  footerQuote: {
    fontSize: 16,
    color: '#495057',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 16,
  },
  footerDivider: {
    height: 1,
    width: '50%',
    backgroundColor: '#e9ecef',
    marginBottom: 16,
  },
  footerText: {
    fontSize: 14,
    color: '#868e96',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  modalTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: '#212529',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f1f3f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: '#495057',
    lineHeight: 24,
  },
  modalContent: {
    padding: 16,
  },
  modalDescription: {
    fontSize: 16,
    color: '#495057',
    lineHeight: 24,
    marginBottom: 20,
  },
  modalSectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 12,
    marginTop: 16,
  },
  modalCodeBlock: {
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
  },
  modalCodeText: {
    fontSize: 15,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    color: '#212529',
    marginBottom: 4,
  },
  modalOutput: {
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    color: '#495057',
    marginTop: 8,
  },
  modalOptions: {
    marginBottom: 16,
  },
  modalOption: {
    fontSize: 15,
    color: '#495057',
    marginBottom: 6,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: '#e9ecef',
  },
  modalButton: {
    backgroundColor: '#4dabf7',
    borderRadius: 6,
    padding: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TemaAlmacenaje;