import { NextFunction, Request, RequestHandler, Response } from "express";

function asyncHandler(
  handler: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler {
  return async function (req, res, next) {
    try {
      await handler(req, res, next);
    } catch (error) {
      if (error instanceof Error && error.name === "ValidationError") {
        res.status(400).send({ message: error.message });
      } else if (error instanceof Error && error.name === "CastError") {
        res.status(404).send({ message: error.message });
      } else {
        res
          .status(500)
          .send({
            message: error instanceof Error ? error.message : "Unknown error",
          });
      }
    }
  };
}

export default asyncHandler;
