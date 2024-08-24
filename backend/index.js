const express = require('express');
const { parse } = require('csv-parse')
const fs = require('fs');

const PORT = 3000;
const app = express();
let data;

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