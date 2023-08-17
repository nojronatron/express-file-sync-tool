function timeStamper() {
  const dateNow = new Date(Date.now());
  console.log('timeStamper returning', dateNow);
  return dateNow;
}

module.exports = timeStamper;
