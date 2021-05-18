const testValidation = (obj) => {
  return new Promise((res, rej) => {
    obj.validate((err) => {
      if (err) {
        console.log("faile validation " + err);
        return rej("error - " + err);
      }
      console.log("passed validation");
      res(obj);
    });
  });
};

module.exports.testValidation = testValidation;
