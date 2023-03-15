const { gql } = require('apollo-server-lambda');

const typeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    description: String
  }

  type Query {
    todos: [Todo]
    todoById(id: ID!): Todo
  }

  type Mutation {
    createTodo(title: String!, description: String): Todo
    updateTodo(id: ID!, title: String!, description: String): Todo
    deleteTodo(id: ID!): ID
    deleteAllTodos: String
  }
`;

module.exports = typeDefs;
