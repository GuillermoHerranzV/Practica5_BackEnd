export const schema = `#graphql

type Pokemon{

    id: Int!
    name: String!
    abilities: [Ability]
    moves: [Moves]

}

type Ability{

    name: String
    effect: String
    language: String
    url: String
    is_hidden: Boolean
    pokemon: [Pokemon]

}

type Language {

    name: String
    url: String

}

type Moves{

    name: String
    power: Int
    url: String

}

type Query{

    pokemon (id: Int, name: String): Pokemon

}

`