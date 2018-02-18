const express = require('express');
const apiRouter = express.Router();




/* all functions from db.js
createMeeting, getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase
*/

//this imports all functions from db.js
const Helper = require('./db.js');

module.exports = apiRouter;

// ------ Start of routing ------

// later put each part, minions, ideas, meetings in its own file and link from here

/* test to see the click
apiRouter.use((req, res, next) => {
  console.log('some click to call the router!');
  next()
})

*/

// ------ Routing Minions -----


/*
GET /api/minions to get an array of all minions.
POST /api/minions to create a new minion and save it to the database.
GET /api/minions/:minionId to get a single minion by id.
PUT /api/minions/:minionId to update a single minion by id.
DELETE /api/minions/:minionId to delete a single minion by id.
*/

apiRouter.get('/minions', (req, res, next) => {
  const allMinions = Helper.getAllFromDatabase('minions');
  res.send(allMinions);
});


apiRouter.get('/minions/:minionId', (req, res, next) => {

  const minionById = Helper.getFromDatabaseById('minions', req.params.minionId);

  if (minionById === -1 || minionById === undefined) {
    res.status(404).send('Minion does not exist');
  } else {
    res.send(minionById);
  }

});

apiRouter.put('/minions/:minionId', (req, res, next) => {

  const minionById = Helper.getFromDatabaseById('minions', req.params.minionId);

  if (minionById === -1 || minionById === undefined) {
    res.status(404).send('Minion does not exist');
  } else {
    const minionUpdate = Helper.updateInstanceInDatabase('minions', req.body);

    res.send(minionUpdate);
  }


});



apiRouter.post('/minions', (req, res, next) => {

    const newMinion = Helper.addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

apiRouter.delete('/minions/:minionId', (req, res, next) => {
  
  const minionById = Helper.getFromDatabaseById('minions', req.params.minionId);

  if (minionById === -1 || minionById === undefined) {
    res.status(404).send('Minion does not exist');
  } else {
    const minionDelete = Helper.deleteFromDatabasebyId('minions', req.params.minionId);
    res.status(204).send('No content');
  }


});
