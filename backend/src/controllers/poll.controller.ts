import { Response, NextFunction, Request } from "express";
import multer from "multer";
import path from "path";
import { PollDto } from "../dto/PollDto";
import { ResponseDto } from "../dto/ResponseDto";
import { PollService } from "../services/poll.service";
import { HttpException } from "../utils/exceptions/HttpException";

export class PollController {
  static async index(req: Request, res: Response) {
    let polls = await PollService.getPollByUserId(req.user);

    res.status(200).json(new ResponseDto({ data: polls }));
  }

  static async getOnePoll(req: Request, res: Response) {
    const { id } = req.params;
    let poll = await PollService.getOnePoll(id);

    if (!poll) {
      throw new HttpException(404, "Not Found");
    }

    res.status(200).json(new ResponseDto({ data: poll }));
  }

  static async saveImage(req: any, res: any) {
    console.log(req.body);
    
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./src/public/images");
      },

      filename: function (req, file, cb) {
        cb(
          null,
          file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
      },
    });

    const imageFilter = function (req: any, file, cb: Function) {
      // Accept images only
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = "Only image files are allowed!";
        return cb(new Error("Only image files are allowed!"), false);
      }
      cb(null, true);
    };

    const upload = multer({ storage: storage, fileFilter: imageFilter }).single(
      "image"
    );

    upload(req, res, function (err: any) {
      if (req.fileValidationError) {
        return new HttpException(400, req.fileValidationError);
      } else if (!req.file) {
        return new HttpException(400, "Please select an image to upload");
      } else if (err instanceof multer.MulterError) {
        return new HttpException(500, "MulterError");
      } else if (err) {
        return new HttpException(500, "Server Error");
      }
    
      return res.status(200).json(req.file.filename);
    });
  }

  static async createPoll(req: any, res: any) {
    const poll = await PollService.createPoll(new PollDto(req));

    res.status(201).json(new ResponseDto({ data: poll }));
  }

  static async updatePoll(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    let poll = await PollService.getOnePoll(id);

    if (!poll) {
      throw new HttpException(404, "Not Found");
    }

    poll = await PollService.updatePoll(id, new PollDto(req));

    res.status(200).json(new ResponseDto({ data: poll }));
  }

  static async deletePoll(req: Request, res: Response) {
    const { id } = req.params;

    let poll = await PollService.getOnePoll(id);

    if (!poll) {
      throw new HttpException(404, "Not Found");
    }

    await PollService.deletePoll(id);

    res.status(204).json(new ResponseDto({ data: null }));
  }
}
