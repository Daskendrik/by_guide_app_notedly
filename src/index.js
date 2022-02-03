const express = require('express'); //установили зависимость экспресса (подклюили)
const app = express(); //создали объект
const port = process.env.port || 4000; // переменная отвечает за порт, если его нет, то локально

app.get('/', (req,res) => res.send('Privetiki! =)')); //используем метод гет объекта эп, чтобы отправить ответ
app.listen(port, () => console.log(`Прослушиваем порт http://localhost:${port}!`)) // приложение слушает порт из константы