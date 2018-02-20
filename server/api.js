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


const getNameAndIndex = (req, res, next) => {
  req.arrayName = req.path.split('/').filter(segment => segment)[0];

  switch (req.arrayName) {
    case 'minions':
      req.index = req.params.minionId;
      break;
    case 'ideas':
      req.index = req.params.ideaId;
      break;
    default:
  }
  next();
};

//This checks if the id is valid for which ever path is cheked
const checkValidId = (req, res, next) => {

  req.itemById = Helper.getFromDatabaseById(req.arrayName, req.index);

  if (req.itemById === -1 || req.itemById === undefined) {
    return res.status(404).send(`${req.arrayName} does not exist`);
  }
  next();
};


// ------ Routing Minions -----


apiRouter.get('/minions', getNameAndIndex, (req, res, next) => {
  const allMinions = Helper.getAllFromDatabase(req.arrayName);
  res.send(allMinions);
});

apiRouter.get('/minions/:minionId', getNameAndIndex, checkValidId, (req, res, next) => {
  res.send(req.itemById);
});

apiRouter.put('/minions/:minionId', getNameAndIndex, checkValidId, (req, res, next) => {
    const minionUpdate = Helper.updateInstanceInDatabase(req.arrayName, req.body);
    res.send(minionUpdate);
});

apiRouter.post('/minions', getNameAndIndex, (req, res, next) => {
    const newMinion = Helper.addToDatabase(req.arrayName, req.body);
    res.status(201).send(newMinion);
});

apiRouter.delete('/minions/:minionId', getNameAndIndex, checkValidId, (req, res, next) => {
    Helper.deleteFromDatabasebyId(req.arrayName, req.index);
    res.status(204).send('No content');
});

// ------ Routing Ideas -----

apiRouter.get('/ideas',  getNameAndIndex, (req, res, next) => {
  const allMinions = Helper.getAllFromDatabase(req.arrayName);
  res.send(allMinions);
});

apiRouter.get('/ideas/:ideaId', getNameAndIndex, checkValidId, (req, res, next) => {
    res.send(req.itemById);
});

apiRouter.put('/ideas/:ideaId', getNameAndIndex, checkValidId, (req, res, next) => {
    const ideaUpdate = Helper.updateInstanceInDatabase(req.arrayName, req.body);
    res.send(ideaUpdate);
});

apiRouter.post('/ideas', checkMillionDollarIdea, getNameAndIndex, (req, res, next) => {
    const newIdea = Helper.addToDatabase(req.arrayName, req.body);
    res.status(201).send(newIdea);
});

apiRouter.delete('/ideas/:ideaId', getNameAndIndex, checkValidId, (req, res, next) => {
    const minionDelete = Helper.deleteFromDatabasebyId(req.arrayName, req.index);
    res.status(204).send('No content');
});

// ------ Routing Meetings -----

apiRouter.get('/meetings', getNameAndIndex, (req, res, next) => {
  const allmeetings = Helper.getAllFromDatabase(req.arrayName);
  res.send(allmeetings);
});

apiRouter.post('/meetings', getNameAndIndex, (req, res, next) => {
    const newMeeting = Helper.addToDatabase(req.arrayName, Helper.createMeeting());
    res.status(201).send(newMeeting);
});

apiRouter.delete('/meetings', getNameAndIndex, (req, res, next) => {

  const deletedMeetings = Helper.deleteAllFromDatabase(req.arrayName);

  res.status(204).send();

});

// ------ Routing Minion Work -----

apiRouter.get('/minions/:minionId/work', getNameAndIndex, checkValidId, (req, res, next) => {


    //this is to find the work for a minion id
  const allWork = Helper.getAllFromDatabase('work');

  const allWorkByMinion = allWork.filter(work => {return work.minionId === req.index;});

  res.send(allWorkByMinion);

});

apiRouter.put('/minions/:minionId/work/:workId', getNameAndIndex, checkValidId, (req, res, next) => {

    if (req.itemById.id !== req.body.minionId) {
      return res.status(400).send();
    }

    const workUpdate = Helper.updateInstanceInDatabase('work', req.body);
    res.send(workUpdate);

});

apiRouter.post('/minions/:minionId/work', getNameAndIndex, checkValidId, (req, res, next) => {
    const newWork = Helper.addToDatabase('work', req.body);
    res.status(201).send(newWork);
});

apiRouter.delete('/minions/:minionId/work/:workId', getNameAndIndex, checkValidId, (req, res, next) => {

    const workDelete = Helper.deleteFromDatabasebyId('work', req.params.workId);
    res.status(204).send('No content');
});
