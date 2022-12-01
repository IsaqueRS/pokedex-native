import Axios from '../axios';

export async function PokemonsFetch() {
    console.log('ProfileFetch | tokenAuthorization:', );
    const configRequest = {
      method: 'get',
      url: 'pokedex/kanto',
    };
  
    try {
      const response = await Axios[configRequest.method](
        configRequest.url,
      );
      console.log('ProfileFetch | response.data:', response.data);
        return {
          isSuccess: true,
          message: "deu certo",
          pokemons: response.data.pokemon_entries,
        };
   } catch (error) {
      console.log('ProfileFetch | error:', error.message);
  
        return {
            message: 'No momento esse recurso está indisponível, tente novamente mais tarde.',
            isSuccess: false,
        };
    }
  }