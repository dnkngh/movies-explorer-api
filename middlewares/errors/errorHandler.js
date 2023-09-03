module.exports = ((error, req, res, next) => {
  const { status = 500, message } = error;

  res.status(status).send({
    message: error,
  });
  next();
});
