const express = require('express');
const { parse } = require('csv-parse')
const fs = require('fs');

const PORT = 3000;
const app = express();
let data;

// парсинг csv
const parser = parse({
  columns: header =>
    header.map((column, i) => {
      if (i < 5) {
        return column;
      }
    })
}, function (err, records) {
  if (err) {
    console.log(err);
  }
  // console.log(records)
  data = records;
  // console.log(data)
})

fs.createReadStream(__dirname + '/data.csv').pipe(parser);

//CORS-миддлвар
const allowedCors = [
  'http://127.0.0.1:8085',
  'http://localhost:8085'
]

app.use(function (req, res, next) {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');

  next();
});

// обработка запроса на полуение данных
app.get('/', (req, res) => {
  const { offset = 0, limit = 10 } = req.query;

  const offsetNumber = parseInt(offset);
  const limitNumber = parseInt(limit);

  const paginatedData = data.slice(offsetNumber, offsetNumber + limitNumber);

  res.json({
    offset: offsetNumber,
    limit: limitNumber,
    totalItems: data.length,
    data: paginatedData,
  })
})

app.listen(PORT, () => console.log('Server is working.'))