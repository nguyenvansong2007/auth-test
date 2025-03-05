export const errorHandler = (err, req, res, next) => {
    err.statusCode = errorHandler || 500;
    // err.statusCode = err.statusCode || 500;
  
    // duplcation error 
    if (err.code === 11000) {
      err.statusCode = 400;
      for (let p in err.keyValue) {
        err.message = `${p} have to be unque`;
      }
    }
  
  
    // ID error
    if (err.kind === 'ObjectId') {
      err.statusCode = 404;
      err.message = `The ${req.originalUrl} is not found because of wrong ID`;
  
  
      // validation error
      if (err.errors) {
        err.message = [];
        for (let ip in err.errors) {
          err.message.push(err.errors[ip].properties.message);
        }
  
  
        res.status(err.statusCode).json({
          status: 'fail',
          message: err.message,
        })
      }
    }
  }
  
  