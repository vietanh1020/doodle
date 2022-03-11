import { NextFunction, Response, Request } from "express";
const db = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class pollService{
    
    // [POST] /poll/create-poll
    async createPoll(req: Request, res: Response, next: NextFunction){

        // const newUser = {
        //     question: req.body.question,
        //     image: req.body.image,
        //     description: req.body.description,
        //     address: req.body.address,
        //     map: req.body.map,
        //     startAt: req.body.startAt,
        //     endAt: req.body.endAt,
        //     answers: req.body.answers,
        //     multipleVote : req.body.multipleVote,
        //     // userId : 

        //     createdAt: Date.now(),
        //     updatedAt: Date.now()
        // }
        // db.Users.create(newUser)
        //     .then(res.status(200).json(newUser))
        //     .catch((err: Error) => {
        //         res.status(400).json('DATA ERROR')
        //     })
    
    }

    // [GET] /poll
    index(req: Request, res: Response, next: NextFunction){
        res.status(200).json('CREATE Poll Page')
    }
}

module.exports = new pollService