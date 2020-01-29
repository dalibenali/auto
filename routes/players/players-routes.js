'use strict';

const express = require("express");
const request = require("request");
const router  = express.Router();
const BASE_URI = 'https://eurosportdigital.github.io/eurosport-node-developer-recruitment/headtohead.json';
const byId = (a, b) => (a.id - b.id); // asc sort function
const whereIdEquals = id => player => player.id === id;

// Static version : Get all players
router.get("/", async (req, res) => await request({ uri: BASE_URI, json: true }, (error, response, body) => {
  const sortedPlayers = body.players.sort(byId);
  return res.status(200).json({ players: sortedPlayers });
}));

// MongoDb version
// router.get("/", async (req, res) => {
//   try {
//       const players = await Players.find().sort({ playerId: 'asc' });
//       res.status(200).json({ players: players });
//     } catch (error) {
//       // Passes errors into the error handler
//       return next(error)
//     }
// }));

// Static version : Get one player by id
router.get("/:id", async (req, res) => await request({ uri: BASE_URI, json: true }, (error, response, body) => {
  const id = parseInt(req.params.id, 10);
  const player = body.players.find(whereIdEquals(id));
  return player
    ? res.status(200).json(player)
    : res.status(404).json('Player not found');
}));

// MongoDb version : Players is a model
// router.get("/:id", async (req, res, next) => {
//   try {
//     const player = await Players.findOne({ playerId: req.params.id });
//     res.status(200).json({ players: players });
//   } catch (error) {
//     return next(error)
//   }
// }));


// TODO
// router.post("/", async (req, res) => {}));
// router.put("/:id", async (req, res) => {}));
// router.delete("/:id", async (req, res) => {}));

module.exports = router;
