import { OptionalId, ObjectId } from "mongodb";

export type PokemonModel = OptionalId <{

    name: string,
    abilities: Abilities [],
    moves: Moves [],

}>

export type Pokemon = {

    id: string,
    name: string,
    abilities: Abilities [],
    moves: Moves [],

}

export type Abilities = {

    name: string,
    effect: string,

}

export type Moves = {

    name: string,
    power: number,

}