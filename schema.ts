export const schema = `#graphql

type Pokemon{

    id: Int!
    name: String!
    height: Int
    weight: Int
    base_experience: Int
    types: [Type]
    abilities: [Ability]
    moves: [Moves]

}

type Ability{

    name: String
    ability: Data
    effect: String
    is_hidden: Boolean
    slot: Int
    pokemon: [Pokemon]

}

type Moves{

    name: String
    move: Data
    power: Int
    accuracy: Int
    pp: Int
    priority: Int
    type: String
    damage_class: String
    pokemon: [Pokemon]

}

type Type {
    name: String
    slot: Int
}

type Data{
    name: String
    url: String
}

type Query{

    pokemon (id: Int, name: String): Pokemon

}

`