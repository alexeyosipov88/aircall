const getTime = (timestamp) => {
  timestamp = new Date(timestamp);
  let hours = timestamp.getHours();
  let minutes = timestamp.getMinutes();
  const amPm = hours >= 12 ? "PM" : "AM";
  hours = hours ? hours : 12;
  hours = hours < 10 ? "0" + hours : hours + "";
  minutes = minutes < 10 ? "0" + minutes : minutes + "";
  const result = `${hours}:${minutes} ${amPm}`;
  return result;
};

export default getTime;