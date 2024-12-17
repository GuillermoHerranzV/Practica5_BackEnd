import { OptionalId, ObjectId } from "mongodb";

export type Pokemon = {

    id: number,
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