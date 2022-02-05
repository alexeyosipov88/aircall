const getDate = (timestamp) => {
  timestamp = new Date(timestamp);
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const date = timestamp.toLocaleDateString("en-CA", dateOptions);
  return date;
};

export default getDate;