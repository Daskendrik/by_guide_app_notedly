const express = require('express'); //установили зависимость экспресса (подклюили)
const {ApolloServer, gql} = require('apollo-server-express'); //включили пакет 
const app = express(); //создали объект
const port = process.env.port || 4000; // переменная отвечает за порт, если его нет, то локально

// app.get('/', (req,res) => res.send('Privetiki! =)')); //используем метод гет объекта эп, чтобы отправить ответ
// app.listen(port, () => console.log(`Прослушиваем порт http://localhost:${port}!`)) // приложение слушает порт из константы

//типо заглушки временной
let notes = [
    {id: '1', content: 'This is a note 1', author: 'Adam 1'},
    {id: '2', content: 'This is a note 2', author: 'Adam 2'},
    {id: '3', content: 'This is a note 3', author: 'Adam 3'}
];




//Построение схемы с использованием языка схем GraphQL стр 43
const typeDefs = gql`
    type Query {
        hello: String!
        notes: [Note!]!
        note(id:ID!): Note!
    }
    type Pizza {
        id: ID!
        size: String!
        clices: Int!
        toppings: [String]
    }
    type Note {
        id: ID!
        content: String!
        author: String!
    }
    type Mutation {
        newNote(content: String!): Note!
    } 
`;
//Добавили распознователь
const resolvers = {
 Query: {
    hello: () => 'Hello world!',
    notes: () => notes,
    note: (parent, args) => {
        return notes.find(note => note.id === args.id);
    }
 },
 Mutation: {
     newNote: (parent, args) => {
         let noteValue = {
             id: String(notes.length + 1),
             content: args.content, 
             author: 'Anna'
         };
         notes.push(noteValue);
         return noteValue;
     }
 }
};

//Настройка Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

//Применяем промежуточное ПО Apollo GraphQL и указываем путь к /api
server.applyMiddleware({ app, path: '/api' });

app.listen({port}, () =>
    console.log(`Мы запсутили GraphQL Server на нашем порте`)
);

