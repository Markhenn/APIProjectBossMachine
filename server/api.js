const express = require('express');
const apiRouter = express.Router();


/* all functions from db.js
createMeeting, getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase
*/

//this imports all functions from db.js
const Helper = require('./db.js');

const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');

module.exports = apiRouter;

// ------ Start of routing ------

// later put each part, minions, ideas, meetings in its own file and link from here

//This checks if the id is valid for which ever path is cheked
const checkValidId = (req, res, next) => {

  const name = req.path.split('/').filter(segment => segment)[0];
  console.log(name);

  //index has to be a string
  let index;
  console.log(typeof index);

  switch (name) {
    case 'minions':
      index = String(req.params.minionId);
      console.log(index);
    case 'ideas':
      index = req.params.ideaId;
    case 'work':
      index = req.params.workId;
    default:

  }

  const itemById = Helper.getFromDatabaseById('minions', index);
  console.log(itemById);

  if (req.itemById === -1 || req.itemById === undefined) {
    return res.status(404).send(`${name} does not exist`);
  }

  next();
};


// ------ Routing Minions -----


apiRouter.get('/minions', (req, res, next) => {
  const allMinions = Helper.getAllFromDatabase('minions');
  res.send(allMinions);
});

apiRouter.get('/minions/:minionId', checkValidId, (req, res, next) => {

  res.send(req.itemById);

  //  res.send(minionById);

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

apiRouter.get('/ideas', (req, res, next) => {
  const allMinions = Helper.getAllFromDatabase('ideas');
  res.send(allMinions);
});

apiRouter.get('/ideas/:ideaId', (req, res, next) => {

  const ideaById = Helper.getFromDatabaseById('ideas', req.params.ideaId);

  if (ideaById === -1 || ideaById === undefined) {
    res.status(404).send('Idea does not exist');
  } else {
    res.send(ideaById);
  }
});

apiRouter.put('/ideas/:ideaId', (req, res, next) => {

  const minionById = Helper.getFromDatabaseById('ideas', req.params.ideaId);

  if (minionById === -1 || minionById === undefined) {
    res.status(404).send('Idea does not exist');
  } else {
    const ideaUpdate = Helper.updateInstanceInDatabase('ideas', req.body);
    res.send(ideaUpdate);
  }
});

apiRouter.post('/ideas', checkMillionDollarIdea, (req, res, next) => {

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

// ------ Routing Minion Work -----

apiRouter.get('/minions/:minionId/work', (req, res, next) => {

  const minionById = Helper.getFromDatabaseById('minions', req.params.minionId);

  if (minionById === -1 || minionById === undefined) {
    res.status(404).send('Minion does not exist');

  } else {

    //this is to find the work for a minion id
    const allWork = Helper.getAllFromDatabase('work');
    const allWorkByMinion = allWork.filter(work => {
      return work.minionId === req.params.minionId;
    });
    res.send(allWorkByMinion);
  }
});

apiRouter.put('/minions/:minionId/work/:workId', (req, res, next) => {

  const minionById = Helper.getFromDatabaseById('minions', req.params.minionId);

  if (minionById === -1 || minionById === undefined) {
    res.status(404).send('Minion does not exist');
  } else {

    if (minionById.id !== req.body.minionId) {
      return res.status(400).send();
    }
    const workUpdate = Helper.updateInstanceInDatabase('work', req.body);

    res.send(workUpdate);
  }
});

apiRouter.post('/minions/:minionId/work', (req, res, next) => {
    const newWork = Helper.addToDatabase('work', req.body);
    res.status(201).send(newWork);
});

apiRouter.delete('/minions/:minionId/work/:workId', (req, res, next) => {

  const minionById = Helper.getFromDatabaseById('work', req.params.minionId);

  if (minionById === -1 || minionById === undefined) {
    res.status(404).send('Minion does not exist');

  } else {

    const workDelete = Helper.deleteFromDatabasebyId('work', req.params.workId);

    res.status(204).send('No content');
  }
});
