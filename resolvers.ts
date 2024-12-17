import { ClientSession, Collection, ObjectId } from "mongodb";
import { PokemonModel, Pokemon } from "./types.ts";
import { GraphQLError } from "graphql";

type QueryPokemonNameArgs = {
    name: string;
};

export const resolvers = {

    Pokemon: {
        abilities: async (parent:Pokemon) => {
            const abilityPromises = parent.abilities.map (async (abilities) => {

                const response = await fetch (abilities.ability.url);
                const data = await response.json();
                return {
                    name: abilities.ability.name;
                    effect: data.effect_entries.find ((entry) => entry.language.name === "en")?.effect || "No description",
                };

            });
            return Promise.all (abilityPromises);
        } 

    },

    Query: {

        pokemon: async (_:unknown, args: QueryPokemonNameArgs): Promise <Pokemon|null> => {

            const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${args.name}`);

            if (!response.ok){
                throw new Error ("Error al obtener el pokemon");
            }

            const datosPokemon = response.json();

            return {
                id: datosPokemon.id,
                name: datosPokemon.name,
                abilities: datosPokemon.abilities,
                moves: datosPokemon.moves,
            }

        },

    },

}