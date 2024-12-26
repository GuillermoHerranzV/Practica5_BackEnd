
export type Pokemon = {

    id: number,
    name: string,
    abilities: Ability [],
    moves: Moves [],

}

export type Ability = {

    name: string,
    ability: {name: string, url: string},
    effect: string,
    is_hidden: boolean,
    pokemon: Pokemon [],

}

export type Moves = {

    name: string,
    power: number,
    accuracy: number,
    pp: number,
    priority: number,
    damage_class: string,
    move: {name: string, url: string},
    pokemon: Pokemon [],

}