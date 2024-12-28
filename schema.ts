export const schema = `#graphql

type Pokemon{

    id: Int!
    name: String!
    abilities: [Ability]
    moves: [Moves]

}

type Ability{

    name: String
    ability: Data
    effect: String
    is_hidden: Boolean
    pokemon: [Pokemon]

}

type Moves{

    name: String
    move: Data
    power: Int
    accuracy: Int
    pp: Int
    priority: Int
    damage_class: String
    pokemon: [Pokemon]

}

type Data{
    name: String
    url: String
}

type Query{

    pokemon (id: Int, name: String): Pokemon

}

`