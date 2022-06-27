module.exports = {
  isEmptyOrNull(object) {
    if (object === undefined || object === null) {
      return true;
    }

    return Object.keys(object).length === 0;
  }
}