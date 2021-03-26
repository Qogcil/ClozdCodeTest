require('dotenv').config();

// Express App Setup
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid/v4');
const format = require('pg-format');
const axios = require('axios');

// Config
const config = require('./config');

// Initialization
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres client
const { Pool } = require('pg');
const { SSL_OP_EPHEMERAL_RSA } = require('constants');
const pgClient = new Pool({
  user: config.pgUser,
  host: config.pgHost,
  database: config.pgDatabase,
  password: config.pgPassword,
  port: config.pgPort
});
pgClient.on('error', () => console.log('Lost Postgres connection'));

pgClient
  .query(
    `
  CREATE TABLE IF NOT EXISTS employees (
    id uuid,
    full_name TEXT,
    email TEXT,
    city TEXT,
    country TEXT,
    full_address TEXT,
    date_of_birth TEXT,
    photo TEXT,
    phone TEXT,
    PRIMARY KEY (id)
  )
`
  )
  .catch(err => console.log(err));

// Express route handlers
app.get('/test', (req, res) => {
  res.send('Working!');
});

app.get('/v1/employees', async (req, res) => {
  const items = await pgClient.query('SELECT * FROM employees ORDER BY id asc');
  res.status(200).send(items.rows);
});

app.post('/v1/details', async (req, res) => {
  const { id } = req.body
  console.log(req.body)

  console.log(format('SELECT * FROM employees WHERE id = %L', id))
  const items = await pgClient
    .query(format('SELECT * FROM employees WHERE id = %L', id))

    .catch(e => {
      res
        .status(500)
        .send(`Encountered an internal error when fetching item with ID`);
    });

  res.status(200).send(items.rows);
});

app.post('/v1/employees', async (req, res) => {
  const { column, order } = req.body
  // const column = req.body.column;
  // const order = req.bdoy.order;
  console.log(format('SELECT * FROM employees ORDER BY %I %s', column, order))
  const items = await pgClient
    .query(format('SELECT * FROM employees ORDER BY %I %s', column, order))

    .catch(e => {
      res
        .status(500)
        .send(`Encountered an internal error when fetching item with ID`);
    });

    //ORDER BY $1 $2`, [column, order]

  res.status(200).send(items.rows);
});

app.post('/v1/newemployees', async (req, res) => {
  //const { item_name } = req.body;

  const deleteemployee = pgClient
  .query(`DELETE FROM employees`)
  .catch(e => {
    //res
    //  .status(500)
    //  .send('Encountered an internal error when creating an item');
  });
  deleteemployee

  for (i = 0; i < 2; i++) {

  function freeze(time) {
      const stop = new Date().getTime() + time;
      while(new Date().getTime() < stop);       
  }
  
  //console.log("freeze 3s");
  freeze(3000);
  //console.log(pgClient);

  await axios.get('https://randomuser.me/api/?results=3500')
  .then((response) => {
    //console.log(response.data);
  
    var jemployeees = [];
    for (let item of response.data.results) {
      //console.log(item);
      jemployeees.push({id: uuid(), full_name: item.name.first + ' ' + item.name.last, email: item.email, city: item.location.city, country: item.location.country, full_address: String(item.location.street.number) + ' ' + item.location.street.name, date_of_birth: item.dob.date.substring(0,10), photo: item.picture.large, phone: item.phone})
    }

    var output = jemployeees.map(function(obj) {
      return Object.keys(obj).map(function(key) { 
        return obj[key];
      });
    });

    const employee = pgClient
    .query(format(
      `INSERT INTO employees (id, full_name, email, city, country, full_address, date_of_birth, photo, phone) VALUES %L`, output
    ))
    .catch(e => {
    });

    employee
  
  }, (error) => {
    console.log(error);
  });
  }

  const testid = 5

  const newitems = await pgClient.query('SELECT * FROM employees ORDER BY id asc');

res.status(200).send(newitems.rows);



});

// Server
const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port, () => console.log(`Server running on port ${port}`));

