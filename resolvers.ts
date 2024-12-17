import {  Pokemon } from "./types.ts";
import { GraphQLError } from "graphql";

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

        /*abilities: async (parent:Pokemon) => {
            const abilityPromises = parent.abilities.map (async (ability) => {

                const response = await fetch (ability.url);
                const data = await response.json();
                return {
                    name: ability.name,
                    //effect: data.effect_entries.find ((entry: any) => entry.language.name === "en")?.effect || "No description",
                    is_hidden: ability.is_hidden,
                    pokemon: ability.pokemon,
                };

            });
            return Promise.all (abilityPromises);
        }*/



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
                const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${args.name}`);

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