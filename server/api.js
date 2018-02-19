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


// ------ Routing Minions -----


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

// ------ Routing Ideas -----

/*
/api/ideas
GET /api/ideas to get an array of all ideas.
POST /api/ideas to create a new idea and save it to the database.
GET /api/ideas/:ideaId to get a single idea by id.
PUT /api/ideas/:ideaId to update a single idea by id.
DELETE /api/ideas/:ideaId to delete a single idea by id.
*/

apiRouter.get('/ideas', (req, res, next) => {
  const allMinions = Helper.getAllFromDatabase('ideas');
  res.send(allMinions);
});

apiRouter.get('/ideas/:ideaId', (req, res, next) => {

  const minionById = Helper.getFromDatabaseById('ideas', req.params.ideaId);

  if (minionById === -1 || minionById === undefined) {
    res.status(404).send('Idea does not exist');
  } else {
    res.send(minionById);
  }
});

apiRouter.put('/ideas/:ideaId', (req, res, next) => {

  const minionById = Helper.getFromDatabaseById('ideas', req.params.ideaId);

  if (minionById === -1 || minionById === undefined) {
    res.status(404).send('Idea does not exist');
  } else {
    const minionUpdate = Helper.updateInstanceInDatabase('ideas', req.body);
    res.send(minionUpdate);
  }
});

apiRouter.post('/ideas', (req, res, next) => {
    const newIdea = Helper.addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

apiRouter.delete('/ideas/:ideaId', (req, res, next) => {

  const minionById = Helper.getFromDatabaseById('ideas', req.params.ideaId);

  if (minionById === -1 || minionById === undefined) {
    res.status(404).send('Idea does not exist');
  } else {
    const minionDelete = Helper.deleteFromDatabasebyId('ideas', req.params.ideaId);
    res.status(204).send('No content');
  }
});

// ------ Routing Meetings -----

/*
/api/meetings
GET /api/meetings to get an array of all meetings.
POST /api/meetings to create a new meeting and save it to the database.
DELETE /api/meetings to delete all meetings from the database.
*/

apiRouter.get('/meetings', (req, res, next) => {
  const allmeetings = Helper.getAllFromDatabase('meetings');
  res.send(allmeetings);
});

apiRouter.post('/meetings', (req, res, next) => {
    const newMeeting = Helper.addToDatabase('meetings', Helper.createMeeting());
    res.status(201).send(newMeeting);
});

apiRouter.delete('/meetings', (req, res, next) => {

  const deletedMeetings = Helper.deleteAllFromDatabase('meetings');

  res.status(204).send();

});
