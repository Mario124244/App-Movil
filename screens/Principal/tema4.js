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
  Platform, // Corregido de "Plataform" a "Platform"
  Linking,
  Modal,
  
  Share
} from 'react-native';

// Elimina esta línea duplicada:
// import { Platform, StyleSheet } from 'react-native';



// Luego, donde usas Platform en los estilos, cámbialo de:


const { width, height } = Dimensions.get('window');

const Tema4Screen = () => {
  const [expanded, setExpanded] = useState(false);
  const [rotateAnim] = useState(new Animated.Value(0));
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTech, setSelectedTech] = useState(null);
  const [expandedSecurity, setExpandedSecurity] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState(null);

  
  const scrollY = useRef(new Animated.Value(0)).current;

  // Datos para las secciones
  const distributedTechs = [
    {
      id: 1,
      name: 'Docker',
      image: require('../../assets/t7.png'),
      description: 'Plataforma para contenedores que permite empaquetar aplicaciones y sus dependencias en entornos aislados.',
      commands: [
        'docker run -it ubuntu',
        'docker ps',
        'docker build -t myapp .'
      ],
      docs: 'https://docs.docker.com'
    },
    {
      id: 2,
      name: 'Kubernetes',
      image: require('../../assets/t8.png'),
      description: 'Sistema de orquestación de contenedores para gestionar aplicaciones distribuidas.',
      commands: [
        'kubectl get pods',
        'kubectl apply -f deployment.yaml',
        'kubectl scale deployment myapp --replicas=3'
      ],
      docs: 'https://kubernetes.io/docs'
    },
    {
      id: 3,
      name: 'Ansible',
      image: require('../../assets/t8.png'),
      description: 'Herramienta de automatización para configuración, implementación y orquestación de sistemas.',
      commands: [
        'ansible-playbook playbook.yml',
        'ansible all -m ping',
        'ansible-vault encrypt file.yml'
      ],
      docs: 'https://docs.ansible.com'
    },
    {
      id: 4,
      name: 'Hadoop',
      image: require('../../assets/t9.png'),
      description: 'Framework para procesamiento distribuido de grandes volúmenes de datos en clusters.',
      commands: [
        'hadoop fs -ls /',
        'hadoop jar myjob.jar input output',
        'hdfs dfs -put localfile /user/hadoop'
      ],
      docs: 'https://hadoop.apache.org/docs'
    }
  ];

  const securityFeatures = [
    { name: 'SELinux', description: 'Mecanismo de control de acceso obligatorio para proteger el sistema.' },
    { name: 'AppArmor', description: 'Sistema de seguridad basado en perfiles para aplicaciones.' },
    { name: 'UFW', description: 'Firewall sencillo para gestionar reglas de red.' },
    { name: 'OpenSSH', description: 'Protocolo para conexiones seguras mediante SSH.' },
    { name: 'GPG', description: 'Herramienta para cifrado y firma digital de datos.' }
  ];

  // Animaciones
  const toggleExpand = () => {
    Animated.timing(rotateAnim, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
    setExpanded(!expanded);
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [250, 100],
    extrapolate: 'clamp'
  });

  // Funciones utilitarias
  const openDocs = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  };

  const shareTechInfo = (tech) => {
    Share.share({
      title: `Información sobre ${tech.name}`,
      message: `${tech.name}: ${tech.description}\n\nComandos básicos:\n${tech.commands.join('\n')}\n\nDocumentación: ${tech.docs}`,
      url: tech.docs
    });
  };

  

  // Componentes reutilizables
  const TechCard = ({ tech }) => (
    <TouchableOpacity 
      style={[styles.galleryCard, styles.elevatedCard]}
      onPress={() => {
        setSelectedTech(tech);
        setModalVisible(true);
      }}
      activeOpacity={0.7}
    >
      <View style={styles.galleryImageContainer}>
        <Image source={tech.image} style={styles.galleryImage} />
      </View>
      <View style={styles.galleryContent}>
        <Text style={styles.galleryTitle}>{tech.name}</Text>
        <Text style={styles.galleryDescription} numberOfLines={2}>
          {tech.description}
        </Text>
        <TouchableOpacity 
          style={styles.smallButton}
          onPress={() => openDocs(tech.docs)}
        >
          <Text style={styles.smallButtonText}>Documentación</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const FeaturePill = ({ feature }) => (
    <TouchableOpacity style={styles.featurePill}>
      <Text style={styles.featureText}>{feature.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.headerContainer, { height: headerHeight }]}>
        <ImageBackground
          source={require('../../assets/t6.png')}
          style={styles.headerBackground}
          imageStyle={styles.headerImageStyle}
        >
          <View style={styles.headerOverlay}>
            <Text style={styles.headerTitle}>Redes y Seguridad:</Text>
            <Text style={styles.headerSubtitle}>Sistemas Distribuidos</Text>
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
        

        <TouchableOpacity 
          onPress={toggleExpand} 
          activeOpacity={0.9}
          style={[styles.card, styles.elevatedCard]}
        >
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Image source={require('../../assets/a11.jpg')} style={styles.cardIcon} />
            </View>
            <Text style={styles.cardTitle}>Multitarea en Linux</Text>
            <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
              <Text style={styles.expandIcon}>▼</Text>
            </Animated.View>
          </View>

          {expanded && (
            <View style={styles.cardBody}>
              <Text style={styles.cardDescription}>
                Linux utiliza el Completely Fair Scheduler (CFS) para gestionar múltiples procesos de manera eficiente. Este algoritmo asigna tiempo de CPU de forma equitativa.
              </Text>
              
              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Herramientas clave:</Text>
                <View style={styles.toolList}>
                  <Text style={styles.toolItem}>• top: Monitor de procesos en tiempo real</Text>
                  <Text style={styles.toolItem}>• htop: Versión mejorada con interfaz amigable</Text>
                  <Text style={styles.toolItem}>• ps: Reporte de procesos actuales</Text>
                  <Text style={styles.toolItem}>• nice/renice: Ajustar prioridades</Text>
                </View>
              </View>

              <View style={styles.codeBlock}>
                <Text style={styles.codeComment}># Comandos básicos</Text>
                <Text style={styles.codeText}>$ top</Text>
                <Text style={styles.codeText}>$ htop</Text>
                <Text style={styles.codeText}>$ ps aux | grep proceso</Text>
                <Text style={styles.codeText}>$ renice -n 5 -p 1234</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity 
  onPress={() => setExpandedSecurity(!expandedSecurity)} 
  activeOpacity={0.9}
  style={[styles.card, styles.elevatedCard]}
>
  <View style={styles.cardHeader}>
    <View style={styles.iconContainer}>
      <Image source={require('../../assets/a12.jpg')} style={styles.cardIcon} />
    </View>
    <Text style={styles.cardTitle}>Amenazas, Intrusos y Herramientas</Text>
    <Animated.View style={{ transform: [{ rotate: expandedSecurity ? '180deg' : '0deg' }] }}>
      <Text style={styles.expandIcon}>▼</Text>
    </Animated.View>
  </View>

  {expandedSecurity && (
    <View style={styles.cardBody}>
      <Text style={styles.cardDescription}>
        En Linux, la seguridad abarca múltiples capas desde el sistema operativo hasta las aplicaciones. Es esencial conocer los distintos tipos de amenazas y cómo protegernos de ellas.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Amenazas comunes:</Text>
        <View style={styles.toolList}>
          <Text style={styles.toolItem}>• Virus, Gusanos, Malware</Text>
          <Text style={styles.toolItem}>• Troyanos, Spyware, Adware</Text>
          <Text style={styles.toolItem}>• Ransomware, Keyloggers</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Tipos de Intrusos:</Text>
        <View style={styles.toolList}>
          <Text style={styles.toolItem}>• Script Kiddies</Text>
          <Text style={styles.toolItem}>• Hacktivistas</Text>
          <Text style={styles.toolItem}>• Amenazas internas (Insiders)</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Herramientas y medidas:</Text>
        <View style={styles.toolList}>
          <Text style={styles.toolItem}>• Antivirus para Linux: ClamAV</Text>
          <Text style={styles.toolItem}>• Firewall: UFW, iptables</Text>
          <Text style={styles.toolItem}>• Autenticación: SSH con claves, 2FA</Text>
        </View>
      </View>

      <View style={styles.codeBlock}>
        <Text style={styles.codeComment}># Comandos útiles de seguridad</Text>
        <Text style={styles.codeText}>$ sudo ufw enable</Text>
        <Text style={styles.codeText}>$ sudo clamscan -r /home</Text>
        <Text style={styles.codeText}>$ sudo fail2ban-client status</Text>
      </View>
    </View>
  )}
</TouchableOpacity>


        <View style={[styles.splitSection, styles.elevatedCard]}>
          <View style={styles.splitImageContainer}>
            <Image source={require('../../assets/a13.jpg')} style={styles.splitImage} />
          </View>
          <View style={styles.splitContent}>
            <View style={styles.sectionTag}>
              <Text style={styles.tagText}>Redes</Text>
            </View>
            <Text style={styles.splitTitle}>Redes en Linux</Text>
            <Text style={styles.splitDescription}>
              Linux incluye una pila de red robusta con soporte para múltiples protocolos. Herramientas como `ip` y `ss` son esenciales para la configuración y monitoreo.
            </Text>
            
            <View style={styles.networkTools}>
              <View style={styles.toolPill}>
                <Text style={styles.toolText}>ip</Text>
              </View>
              <View style={styles.toolPill}>
                <Text style={styles.toolText}>ss</Text>
              </View>
              <View style={styles.toolPill}>
                <Text style={styles.toolText}>ping</Text>
              </View>
              <View style={styles.toolPill}>
                <Text style={styles.toolText}>traceroute</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.learnMoreButton}
              onPress={() => Linking.openURL('https://networking.ringofsaturn.com/Linux/')}
            >
              <Text style={styles.learnMoreText}>Guía Completa de Redes →</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.highlightCard, styles.elevatedCard]}>
          <View style={styles.highlightHeader}>
            <View style={styles.securityIcon}>
              <Text style={styles.securityIconText}>🔒</Text>
            </View>
            <Text style={styles.highlightTitle}>Seguridad en Linux</Text>
          </View>
          <Text style={styles.highlightText}>
            Linux ofrece múltiples capas de seguridad, desde el kernel hasta las aplicaciones. Sistemas como SELinux y AppArmor refuerzan la protección incluso para usuarios root.
          </Text>
          
          <View style={styles.securityFeatures}>
            {securityFeatures.map((feature, index) => (
              <FeaturePill key={index} feature={feature} />
            ))}
          </View>

          <View style={styles.securityTips}>
            <Text style={styles.tipsTitle}>Mejores Prácticas:</Text>
            <Text style={styles.tipItem}>• Mantener el sistema actualizado</Text>
            <Text style={styles.tipItem}>• Usar autenticación por clave en SSH</Text>
            <Text style={styles.tipItem}>• Configurar firewalls (iptables/nftables)</Text>
            <Text style={styles.tipItem}>• Implementar SELinux/AppArmor</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Sistemas Distribuidos</Text>
          <Text style={styles.sectionSubtitle}>Tecnologías clave para computación distribuida</Text>
        </View>

        <FlatList
          data={distributedTechs}
          renderItem={({ item }) => <TechCard tech={item} />}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.galleryScroll}
          style={styles.galleryContainer}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Virtualización</Text>
          <Text style={styles.sectionSubtitle}>Tecnologías para crear entornos aislados</Text>
        </View>

        <View style={[styles.virtualizationCard, styles.elevatedCard]}>
          <View style={styles.virtualizationTypes}>
            <View style={styles.virtType}>
              <Text style={styles.virtTypeTitle}>Contenedores</Text>
              <Text style={styles.virtTypeDesc}>Ligero, comparte kernel del host</Text>
              <Text style={styles.virtTypeExample}>Docker, LXC, Podman</Text>
            </View>
            
            <View style={styles.virtType}>
              <Text style={styles.virtTypeTitle}>Máquinas Virtuales</Text>
              <Text style={styles.virtTypeDesc}>Aislamiento completo, propio kernel</Text>
              <Text style={styles.virtTypeExample}>KVM, VirtualBox, VMware</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerQuote}>
            "Linux impulsa el 90% de la nube pública, el 75% de los smartphones y es el sistema operativo preferido para desarrolladores."
          </Text>
          <View style={styles.footerDivider} />
          <Text style={styles.footerText}>
            © {new Date().getFullYear()} Linux Advanced Guide | Todos los derechos reservados.
          </Text>
          <TouchableOpacity 
            style={styles.footerButton}
            onPress={() => Linking.openURL('https://www.linux.org/')}
          >
            <Text style={styles.footerButtonText}>Visitar Linux</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal de detalle de tecnología */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {selectedTech && (
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedTech.name}</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
            
            <Image source={selectedTech.image} style={styles.modalImage} />
            
            <ScrollView style={styles.modalContent}>
              <Text style={styles.modalDescription}>{selectedTech.description}</Text>
              
              <Text style={styles.modalSectionTitle}>Comandos Básicos</Text>
              <View style={styles.modalCodeBlock}>
                {selectedTech.commands.map((cmd, index) => (
                  <Text key={index} style={styles.modalCodeText}>{cmd}</Text>
                ))}
              </View>
              
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={() => openDocs(selectedTech.docs)}
              >
                <Text style={styles.modalButtonText}>Ver Documentación Completa</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.shareButton]}
                onPress={() => shareTechInfo(selectedTech)}
              >
                <Text style={styles.modalButtonText}>Compartir Información</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
      </Modal>

      {/* Modal de detalle de comando */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  headerContainer: {
    width: '100%',
    overflow: 'hidden'
  },
  headerBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerImageStyle: {
    resizeMode: 'cover'
  },
  headerOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textAlign: 'center'
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center'
  },
  scrollContainer: {
    paddingBottom: 40,
    paddingTop: 20
  },
 
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    overflow: 'hidden'
  },
  elevatedCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa'
  },
  iconContainer: {
    marginRight: 15
  },
  cardIcon: {
    width: 40,
    height: 40
  },
  cardTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#333'
  },
  expandIcon: {
    fontSize: 18,
    color: '#666',
    padding: 5
  },
  cardBody: {
    padding: 15
  },
  cardDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
    marginBottom: 15
  },
  section: {
    marginBottom: 15
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8
  },
  toolList: {
    marginLeft: 10
  },
  toolItem: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5
  },
  codeBlock: {
    backgroundColor: '#282c34',
    borderRadius: 8,
    padding: 15,
    marginTop: 10
  },
  codeComment: {
    color: '#5c6370',
    fontStyle: 'italic',
    marginBottom: 5
  },
  codeText: {
    color: '#abb2bf',
    fontFamily: Platform.select({
      ios: 'Courier New',
      android: 'monospace',
      default: 'monospace'
    }),
    marginBottom: 3
  },
  splitSection: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    overflow: 'hidden'
  },
  splitImageContainer: {
    width: '30%',
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  },
  splitImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain'
  },
  splitContent: {
    width: '70%',
    padding: 15
  },
  sectionTag: {
    backgroundColor: '#0d6efd',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 8
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600'
  },
  splitTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8
  },
  splitDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 12
  },
  networkTools: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12
  },
  toolPill: {
    backgroundColor: '#e9ecef',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 8
  },
  toolText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500'
  },
  learnMoreButton: {
    alignSelf: 'flex-start'
  },
  learnMoreText: {
    color: '#0d6efd',
    fontWeight: '600'
  },
  highlightCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20
  },
  highlightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  securityIcon: {
    marginRight: 12
  },
  securityIconText: {
    fontSize: 24
  },
  highlightTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333'
  },
  highlightText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
    marginBottom: 15
  },
  securityFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15
  },
  featurePill: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8
  },
  featureText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333'
  },
  securityTips: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15
  },
  tipsTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8
  },
  tipItem: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    marginLeft: 5
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 15
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333'
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666'
  },
  galleryContainer: {
    height: 280,
    marginBottom: 20
  },
  galleryScroll: {
    paddingHorizontal: 20
  },
  galleryCard: {
    width: 220,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 15,
    overflow: 'hidden'
  },
  galleryImageContainer: {
    height: 120,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center'
  },
  galleryImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain'
  },
  galleryContent: {
    padding: 15
  },
  galleryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8
  },
  galleryDescription: {
    fontSize: 13,
    color: '#555',
    marginBottom: 12,
    lineHeight: 18
  },
  smallButton: {
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
    padding: 6,
    alignSelf: 'flex-start'
  },
  smallButtonText: {
    fontSize: 12,
    color: '#0d6efd',
    fontWeight: '500'
  },
  virtualizationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20
  },
  virtualizationTypes: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  virtType: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15
  },
  virtTypeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8
  },
  virtTypeDesc: {
    fontSize: 13,
    color: '#555',
    marginBottom: 8
  },
  virtTypeExample: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic'
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center'
  },
  footerQuote: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 20,
    lineHeight: 24
  },
  footerDivider: {
    height: 1,
    backgroundColor: '#dee2e6',
    width: '80%',
    marginBottom: 20
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 15
  },
  footerButton: {
    backgroundColor: '#0d6efd',
    borderRadius: 6,
    padding: 10,
    paddingHorizontal: 20
  },
  footerButtonText: {
    color: '#fff',
    fontWeight: '500'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333'
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeButtonText: {
    fontSize: 20,
    color: '#333'
  },
  modalImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    backgroundColor: '#f8f9fa'
  },
  modalContent: {
    padding: 20
  },
  modalDescription: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 20
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10
  },
  modalCodeBlock: {
    backgroundColor: '#282c34',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20
  },
  modalCodeText: {
    color: '#abb2bf',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    marginBottom: 5
  },
  modalButton: {
    backgroundColor: '#0d6efd',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10
  },
  shareButton: {
    backgroundColor: '#6c757d'
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '500'
  },
  modalOutput: {
    color: '#abb2bf',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    marginTop: 5
  },
  modalOptions: {
    marginBottom: 20
  },
  modalOption: {
    fontSize: 16,
    color: '#444',
    marginBottom: 5
  }
});

export default Tema4Screen;