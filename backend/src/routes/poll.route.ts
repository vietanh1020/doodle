import express from 'express';
const router = express.Router()

const pollController = require('../controllers/poll.controller')

router.post('/create-poll', pollController.createPoll )
router.get('/', pollController.index)

module.exports = router