
export type Pokemon = {

    id: number,
    name: string,
    height: number,
    weight: number,
    base_experience: number,
    types: Type [],
    abilities: Ability [],
    moves: Moves [],

}

export type Ability = {

    name: string,
    ability: {name: string, url: string},
    effect: string,
    is_hidden: boolean,
    slot: number,
    pokemon: Pokemon [],

}

export type Moves = {

    name: string,
    power: number,
    accuracy: number,
    pp: number,
    priority: number,
    type: string,
    damage_class: string,
    move: {name: string, url: string},
    pokemon: Pokemon [],

}

export type Type = {
    name: string,
    slot: number,
}