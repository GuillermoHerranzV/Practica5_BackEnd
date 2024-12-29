import {  Pokemon } from "./types.ts";

type QueryPokemonNameArgs = {
    id: number,
    name: string,
};

export const resolvers = {

    Pokemon: {

        id: (parent:Pokemon) => {

            return parent.id;

        },

        name: (parent: Pokemon) => {

            return parent.name;

        },

        height: (parent: Pokemon) => {
            return parent.height;
        },

        weight: (parent: Pokemon) => {
            return parent.weight;
        },

        base_experience: (parent: Pokemon) => {
            return parent.base_experience;
        },

        types: (parent: Pokemon) => {
            return parent.types.map ((type:any) => {
                return {
                    name: type.type.name,
                    slot: type.slot,
                }
            });
        },

        abilities: async (parent:Pokemon) => {

            //Sacar todas las habilidades con sus datos
            const abilityPromises = await Promise.all (parent.abilities.map (async (ability) => {
                
                const response = await fetch (ability.ability.url);
                if (!response.ok){
                    return null;
                }
                const data = await response.json();

                //Sacar el array de pokemon que pueden aprender cada una de esas habilidades para encadenar mas querys
                const pokemonArray = await Promise.all (data.pokemon.map (async (poke:any) => {
                    const pkmnResponse = await fetch (poke.pokemon.url);
                    if (!pkmnResponse.ok){return null;}
                    const pkmnData = await pkmnResponse.json ();
                    return pkmnData;
                }))

                return {
                    name: ability.ability.name,
                    effect: data.effect_entries.find ((entry: any) => entry.language.name === "en")?.effect || "No description",
                    is_hidden: ability.is_hidden,
                    slot: ability.slot,
                    pokemon: pokemonArray,
                };

            }))
            return Promise.all (abilityPromises);
        },

        moves: async (parent: Pokemon) => {
            
            //Sacar todos los movimientos que aprende el pokemon
            const MovePromises = await Promise.all (parent.moves.map (async (move) => {
                const response = await fetch (move.move.url);
                if (!response.ok){return null;}
                const data = await response.json();

                //Sacar los pokemon que aprenden cada uno de los movimientos. Limitado a 10 porque hay tantos pokemon y tantos movimientos que si no falla la query.
                const pokemonArray = await Promise.all (data.learned_by_pokemon.slice(0,10).map (async (poke:any) => {
                    const pkmnResponse = await fetch (poke.url);
                    if (!pkmnResponse.ok){return null;}
                    const pkmnData = await pkmnResponse.json ();
                    return pkmnData;
                }))

                return {
                    name: move.move.name,
                    power: data.power,
                    accuracy: data.accuracy,
                    pp: data.pp,
                    priority: data.priority,
                    type: data.type.name,
                    damage_class: data.damage_class.name,
                    pokemon: pokemonArray,
                };
            }))
            return Promise.all (MovePromises);
        }

    },

    Query: {

        pokemon: async (_:unknown, args: QueryPokemonNameArgs) => {

            if (args.id){
                const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${args.id}`);

                if (!response.ok){
                    throw new Error ("Error al obtener el pokemon");
                }
    
                const pokemonData = await response.json();
    
                return pokemonData;

            }else if (args.name){
                const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${args.name.toLowerCase()}`);

                if (!response.ok){
                    throw new Error ("Error al obtener el pokemon");
                }
    
                const pokemonData = await response.json();
    
                return pokemonData;

            }else {
                throw new Error("Debes proporcionar un id o un nombre");
            }

        },

    },

}