//function that returns a fucntion weith req,res next
//thanks to closure we are able to use the seconde function
//this function is the replacemnt function for try/catch block

const cactchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
};
module.exports = cactchAsync;
