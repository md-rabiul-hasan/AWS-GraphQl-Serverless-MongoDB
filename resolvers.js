const { ObjectId } = require('mongodb');

const resolvers = {
  Query: {
    todos: async (_, __, { db }) => {
      const todos = await db.collection('todos').find().toArray();
      return todos.map(todo => ({
        id: todo._id.toString(),
        title: todo.title,
        description: todo.description
      }));
    },
    todoById: async (_, { id }, { db }) => {
      const todo = await db.collection('todos').findOne({ _id: new ObjectId(id) });
      return {
        id: todo._id.toString(), // convert ObjectId to string
        title: todo.title,
        description: todo.description
      };
    },
  },

  Mutation: {
    createTodo: async (_, { title, description }, { db }) => {
      const result = await db.collection('todos').insertOne({ title, description });
      return { id: result.insertedId, title, description };
    },
    updateTodo: async (_, { id, title, description }, { db }) => {
      const result = await db.collection('todos').updateOne({ _id: new ObjectId(id) }, { $set: { title, description } });
      if (result.modifiedCount === 1) {
        return { id, title, description };
      } else {
        throw new Error(`Todo with ID: ${id} not found.`);
      }
    },
    deleteTodo: async (_, { id }, { db }) => {
      const result = await db.collection('todos').deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount){
        return id;
      }        
    },
    deleteAllTodos: async (_, __, { db }) => {
      const result = await db.collection('todos').deleteMany({});
      return `Deleted ${result.deletedCount} todos.`;
    },
  },
};

module.exports = resolvers;