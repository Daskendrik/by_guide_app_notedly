const express = require('express'); //установили зависимость экспресса (подклюили)
const {ApolloServer, gql} = require('apollo-server-express'); //включили пакет 
const app = express(); //создали объект
const port = process.env.port || 4000; // переменная отвечает за порт, если его нет, то локально

// app.get('/', (req,res) => res.send('Privetiki! =)')); //используем метод гет объекта эп, чтобы отправить ответ
// app.listen(port, () => console.log(`Прослушиваем порт http://localhost:${port}!`)) // приложение слушает порт из константы

//Построение схемы с использованием языка схем GraphQL стр 43
const typeDefs = gql`
    type Query {
        hello: String
    }
    type Pizza {
        id: ID!
        size: String!
        clices: Int!
        toppings: [String]
    }
`;
//Добавили распознователь
const resolvers = {
 Query: {
    hello: () => 'Hello world!'
 }
 };

//Настройка Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

//Применяем промежуточное ПО Apollo GraphQL и указываем путь к /api
server.applyMiddleware({ app, path: '/api' });

app.listen({port}, () =>
    console.log(`Мы запсутили GraphQL Server на нашем порте`)
);

//47 стр