export const schema = `

type Pokemon{

    id: Int!
    name: String!
    abilities: [Abilities!]!
    moves: [Moves!]!

}

type Abilities{

    name: String!
    effect: String!

}

type Moves{

    name: String!
    power: Int!

}

type Query{

    pokemon (name: String!): Pokemon
    pokemon (id: ID!): Pokemon

}

`