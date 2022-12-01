/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect, useState } from 'react';
 import type {Node} from 'react';
 import Axios from './api/axios';
 import { PokemonsFetch } from './api/services/pokemon';
 import logo from './logo.svg';

import { Input } from 'react-native-elements';

import {
  SafeAreaView,
  ScrollView,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const App: () => Node = () => {

  const [pokemons, setPokemons] = useState([]);
  const [pokemonType, setPokemonType] = useState('');
  const [pokemonWeight, setPokemonWeight] = useState('');
  const [pokemonHeight, setPokemonHeight] = useState('');
  const [pokemonId, setPokemonId] = useState('');
  const [pokemonDetailsName, setPokemonDetailsName] = useState('');

  const [pokemonSearched, setPokemonSearched] = useState('');

  const [open, setOpen] = React.useState(false);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
//  const filteredPokemons =  pokemon.filter((pokemon) => pokemon.pokemon_species.name.startsWith(pokemonSearched));
function filterPokemon(pokemon) {
  const pokemonName = pokemon.pokemon_species.name;
  const pokemonNameLowCase = pokemonName.toLowerCase();
  const pokemonSearchedLowerCase = pokemonSearched.toLowerCase();
  return pokemonNameLowCase.startsWith(pokemonSearchedLowerCase);
}
const filteredPokemons = pokemons.filter(filterPokemon);

  useEffect(() => {
    async function getPokemons() {
       try {
         const resultPokemons = await PokemonsFetch();
         console.log((resultPokemons.pokemons).flat());
         const flatResultPokemon = (resultPokemons.pokemons).flat();
         setPokemons(flatResultPokemon);
       } catch(error) {
         console.log(error)
       }
     }
     getPokemons();
   },[]); 

  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
          
          <Text style={styles.pokedex}>Pokedex</Text>  

          <TextInput style={styles.searchInput}
          placeholder='Procure um Pokemon...' 
          onChangeText={(text) => setPokemonSearched(text)} 
          value={pokemonSearched}  
          />
          
          <View style={styles.container}>
            {filteredPokemons.map((pokemonLoop) => (
            <View>
              <Image 
                source={{uri:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonLoop.entry_number}.png`}}
                style={{width: 150, height: 150}} 
              />
              <Text style={styles.pokemonName}>
              {pokemonLoop.pokemon_species.name}
              </Text>
            </View>
            ))}
          </View>
       </ScrollView>   
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
  },
  card: {
    flex: '0.3'
  },
  pokedex: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: '700',
  },
  searchInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  pokemonName: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '500',
  },
  pokeball: {
    height: 12,
    margin: 12,
  }
});

export default App;
