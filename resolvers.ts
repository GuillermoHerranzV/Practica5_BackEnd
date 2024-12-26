import {  Pokemon, Ability, Moves } from "./types.ts";
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

        abilities: async (parent:Pokemon): Promise <Ability[]> => {
            console.log (parent.abilities);

            const abilityPromises = await Promise.all (parent.abilities.map (async (ability) => {
                console.log (ability.ability.url);
                const response = await fetch (ability.ability.url);
                if (!response.ok){
                    return null;
                }
                const data = await response.json();
                return {
                    name: ability.ability.name,
                    effect: data.effect_entries.find ((entry: any) => entry.language.name === "en")?.effect || "No description",
                    is_hidden: ability.is_hidden,
                    pokemon: data.pokemon.pokemon,
                };

            }))
            return Promise.all (abilityPromises);
        },

        moves: async (parent: Pokemon): Promise <Moves []> => {
            //console.log (parent.moves);
            
            const MovePromises = await Promise.all (parent.moves.map (async (move) => {
                const response = await fetch (move.move.url);
                if (!response.ok){return null;}
                const data = await response.json();
                return {
                    name: move.move.name,
                    power: data.power,
                    accuracy: data.accuracy,
                    pp: data.pp,
                    priority: data.priority,
                    damage_class: data.damage_class.name,
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