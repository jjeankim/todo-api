function asyncHandler(handler) {
  return async function (req, res) {
    try {
      await handler(req, res);
    } catch (error) {
      if (error.name === "ValidationError") {
        res.status(400).send({ message: error.message });
      } else if (error.name === "CastError") {
        res.status(404).send({ message: error.message });
      } else {
        res.status(500).send({ message: error.message });
      }
    }
  };
}

export default asyncHandler;
