function getReadableCurrentDate() {
  let date = new Date();
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

module.exports = { getReadableCurrentDate };
