
export type Pokemon = {

    id: number,
    name: string,
    abilities: Ability [],
    moves: Moves [],

}

export type Ability = {

    name: string,
    effect: string,
    language: string,
    url: string,
    is_hidden: boolean,
    pokemon: Pokemon [],

}

export type Language = {

    name: string,
    url: string,

}

export type Moves = {

    name: string,
    url: string,

}