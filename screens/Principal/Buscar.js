import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { keywords } from '../../data/keywords';

const BuscarScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredKeywords, setFilteredKeywords] = useState([]);

  const handleSearch = (text) => {
    setSearchText(text);
    const queryWords = text.toLowerCase().trim().split(' ');

    const filtered = [];

    keywords.forEach((item) => {
      const allMatches = [];

      // Coincidencias en tags
      item.tags?.forEach(tag => {
        if (queryWords.every(word => tag.toLowerCase().includes(word))) {
          allMatches.push(tag);
        }
      });

      // Coincidencias en keyword principal
      if (queryWords.every(word => item.keyword.toLowerCase().includes(word))) {
        allMatches.push(item.keyword);
      }

      if (allMatches.length > 0) {
        filtered.push({
          ...item,
          match: allMatches[0], // Solo mostramos la primera coincidencia
        });
      }
    });

    setFilteredKeywords(filtered);
  };

  // Navega al tema y pasa la palabra como parámetro
  const handleNavigate = (ruta, palabra) => {
    navigation.navigate(ruta, { palabra });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar..."
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredKeywords}
        keyExtractor={(item) => item.keyword + '-' + item.match}
        renderItem={({ item }) => {
          const input = searchText.trim().toLowerCase();

          const highlightText = (text) => {
            const start = text.toLowerCase().indexOf(input);
            if (start === -1 || input === '') return <Text style={styles.itemText}>{text}</Text>;

            const end = start + input.length;

            return (
              <Text style={styles.itemText}>
                {text.substring(0, start)}
                <Text style={styles.highlight}>{text.substring(start, end)}</Text>
                {text.substring(end)}
              </Text>
            );
          };

          return (
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleNavigate(item.ruta, item.match)}
            >
              {highlightText(item.match)}
              <Text style={styles.itemTema}>Tema: {item.temaVisible}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 16,
  },
  highlight: {
    backgroundColor: 'yellow',
    fontWeight: 'bold',
  },
  itemTema: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

export default BuscarScreen;
