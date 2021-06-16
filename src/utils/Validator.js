const validate = (doc) => {
  const err = doc.validateSync();
  if (err) throw err;
  else console.log("pass validate");
};
module.exports = {
  validate
};
