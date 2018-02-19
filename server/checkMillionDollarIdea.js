//const express = require('express');

const checkMillionDollarIdea = (req, res, next) => {

  const weeks = req.body.numWeeks;
  const revenue = req.body.weeklyRevenue;
  const millionWorth = weeks * revenue;

  if((millionWorth < 1000000) || !Number(weeks) || !Number(revenue)) {
    return res.status(400).send();
  }
  next()
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
