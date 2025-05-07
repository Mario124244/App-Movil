import React from 'react';
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
  FlatList,
  Linking,
  Modal,
  Share
} from 'react-native';

const { width, height } = Dimensions.get('window');

const TeamCoverScreen = () => {
  const [selectedMember, setSelectedMember] = React.useState(null);
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const teamMembers = [
    {
      id: 1,
      name: 'Jesus Mario Bazaldua Bustos',
      role: 'Ingenieria en Tecnologia de Software',
      bio: 'Estudiante de Ingenieria en Tecnologia de Software, apasionado por la programacion y el desarrollo de software',
      image: require('../../assets/a8.jpg'),
      skills: ['2014834', '009', 'SISTEMAS OPERATIVOS'],
      social: {
        github: 'https://www.linkedin.com/in/jmbb2004/',
        linkedin: 'https://linkedin.com/in/ana'
      }
    },
    {
      id: 2,
      name: 'Ricardo López reyna',
      role: 'Ingenieria en Sistemas',
      bio: '',
      image: require('../../assets/a10.jpg'),
      skills: ['1971559', '009', 'SISTEMAS OPERATIVOS'],
      social: {
        github: 'https://github.com/carlos',
        twitter: 'https://twitter.com/carlos'
      }
    },
    
    
  ];

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [height * 0.5, 100],
    extrapolate: 'clamp'
  });

  const MemberCard = ({ member }) => (
    <TouchableOpacity 
      style={styles.memberCard}
      onPress={() => setSelectedMember(member)}
      activeOpacity={0.9}>
      <Image source={member.image} style={styles.memberImage} />
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{member.name}</Text>
        <Text style={styles.memberRole}>{member.role}</Text>
        <View style={styles.skillsContainer}>
          {member.skills.map((skill, index) => (
            <View key={index} style={styles.skillPill}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <ImageBackground
          source={require('../../assets/a6.png')}
          style={styles.headerBackground}
          resizeMode="cover">
          <View style={styles.headerOverlay}>
            <Text style={styles.teamTitle}>Sistemas Operativos</Text>
            <Text style={styles.teamSubtitle}>Ing.NORMA EDITH MARIN MARTINEZ</Text>
          </View>
        </ImageBackground>
      </Animated.View>

      <ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nuestros Expertos</Text>
          <FlatList
            data={teamMembers}
            renderItem={({ item }) => <MemberCard member={item} />}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.memberGrid}
            scrollEnabled={false}
          />
        </View>

        <View style={styles.aboutSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>🚀</Text>
            <Text style={styles.aboutTitle}>Quiénes Somos</Text>
          </View>
          <Text style={styles.aboutText}>
            Somos el equipo 4 de la materia de Sistemas Operativos, un grupo de estudiantes, este proyecto tiene como objetivo exponer los temas  y sus conceptos mas importantes acerca de el sistema operativo linux.
          </Text>
          <View style={styles.statsContainer}>
            
          </View>
        </View>
      </ScrollView>



        
        
      <Modal visible={!!selectedMember} animationType="slide">
        <View style={styles.modalContainer}>
          {selectedMember && (
            <>
              <Image source={selectedMember.image} style={styles.modalImage} />
              <ScrollView style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalName}>{selectedMember.name}</Text>
                  <Text style={styles.modalRole}>{selectedMember.role}</Text>
                </View>
                
                <View style={styles.modalSection}>
                  <Text style={styles.sectionTitle}>Biografía</Text>
                  <Text style={styles.modalBio}>{selectedMember.bio}</Text>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.sectionTitle}>Habilidades Clave</Text>
                  <View style={styles.skillsContainer}>
                    {selectedMember.skills.map((skill, index) => (
                      <View key={index} style={styles.skillPillLarge}>
                        <Text style={styles.skillText}>{skill}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.sectionTitle}>Contacto</Text>
                  <View style={styles.socialContainer}>
                    {Object.entries(selectedMember.social).map(([platform, url]) => (
                      <TouchableOpacity
                        key={platform}
                        onPress={() => Linking.openURL(url)}
                        style={styles.socialButton}>
                        <Text style={styles.socialText}>{platform}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setSelectedMember(null)}>
                  <Text style={styles.closeText}>Cerrar Perfil</Text>
                </TouchableOpacity>
              </ScrollView>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a'
  },
  header: {
    width: '100%',
    overflow: 'hidden',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  headerBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  headerOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.57)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  teamTitle: {
    fontSize: 36,
    color: 'white',
    fontWeight: '800',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.5
  },
  teamSubtitle: {
    fontSize: 18,
    color: '#00ff88',
    textAlign: 'center',
    marginTop: 12,
    fontWeight: '600'
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 30
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    marginBottom: 24,
    textAlign: 'center'
  },
  memberGrid: {
    paddingBottom: 20
  },
  columnWrapper: {
    justifyContent: 'space-between'
  },
  memberCard: {
    width: width * 0.43,
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6
  },
  memberImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover'
  },
  memberInfo: {
    padding: 16
  },
  memberName: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4
  },
  memberRole: {
    fontSize: 12,
    color: '#00ff88',
    marginBottom: 8,
    fontWeight: '500'
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8
  },
  skillPill: {
    backgroundColor: '#3a3a3a',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 6,
    marginBottom: 6
  },
  skillText: {
    color: '#00ff88',
    fontSize: 10,
    fontWeight: '600'
  },
  aboutSection: {
    backgroundColor: '#2a2a2a',
    borderRadius: 30,
    padding: 24,
    margin: 16,
    marginTop: 0
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 12
  },
  aboutTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white'
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#cccccc',
    marginBottom: 20
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  },
  statItem: {
    alignItems: 'center'
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: '#00ff88',
    marginBottom: 4
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    maxWidth: 100
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a'
  },
  modalImage: {
    width: '100%',
    height: 300,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  modalContent: {
    padding: 24
  },
  modalHeader: {
    marginBottom: 24,
    alignItems: 'center'
  },
  modalName: {
    fontSize: 32,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center'
  },
  modalRole: {
    fontSize: 18,
    color: '#00ff88',
    fontWeight: '600',
    marginTop: 8
  },
  modalSection: {
    marginBottom: 30
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginBottom: 16
  },
  modalBio: {
    fontSize: 16,
    lineHeight: 24,
    color: '#cccccc'
  },
  skillPillLarge: {
    backgroundColor: '#3a3a3a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  socialButton: {
    backgroundColor: '#3a3a3a',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  socialText: {
    color: '#00ff88',
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  closeButton: {
    backgroundColor: '#00ff88',
    padding: 16,
    borderRadius: 25,
    marginTop: 24,
    alignSelf: 'center'
  },
  closeText: {
    color: '#1a1a1a',
    fontWeight: '800',
    fontSize: 16
  }
});

export default TeamCoverScreen;