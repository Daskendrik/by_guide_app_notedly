const express = require('express'); //установили зависимость экспресса (подклюили)
const {ApolloServer} = require('apollo-server-express'); //включили пакет 
const typeDefs = require('./schema');// импорт схемы
const app = express(); //создали объект
const port = process.env.port || 4000; // переменная отвечает за порт, если его нет, то локально

//испорт модели бд
const models = require('./models'); 
//подключаем базу данных
require('dotenv').config(); 
const db = require('./db');
const DB_HOST = process.env.DB_HOST; // Сохраняем значение DB_HOST в виде переменной
db.connect(DB_HOST);
// app.get('/', (req,res) => res.send('Privetiki! =)')); //используем метод гет объекта эп, чтобы отправить ответ
// app.listen(port, () => console.log(`Прослушиваем порт http://localhost:${port}!`)) // приложение слушает порт из константы

//типо заглушки временной
// let notes = [
//     {id: '1', content: 'This is a note 1', author: 'Adam 1'},
//     {id: '2', content: 'This is a note 2', author: 'Adam 2'},
//     {id: '3', content: 'This is a note 3', author: 'Adam 3'}
// ];

let allpizza = [
    {id: '1', size: 15, clices: 4, toppings: ['Помидоры']},
    {id: '1', size: 10, clices: 6, toppings: ['Помидоры']}
];




//Построение схемы с использованием языка схем GraphQL стр 43

//Добавили распознователь
const resolvers = {
 Query: {
    hello: () => 'Hello world!',
    notes: async () => {
        return await models.Note.find();
      },
    note: async (parent, args) => {
        return await models.Note.findById(args.id);
    },
   

    allpizza: () => allpizza,
    pizza: (parent, args) => {
        return allpizza.find(pizza => pizza.id === args.id);
    },
 },
 Mutation: {
     newNote: async (parent, args) => {
         return await models.Note.create ({
             content: args.content,
             author: 'Dashka'
         });
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

