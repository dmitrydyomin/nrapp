const dateReviver = (key, value) => {
  if (typeof value === 'string' && value.length >= 10) {
    if (value.match(/^\d{4}-\d{2}-\d{2}/)) {
      return new Date(value);
    }
  }
  return value;
};

module.exports = {
  dateReviver,
};
