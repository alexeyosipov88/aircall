import React from "react";

const AllCallsListItem = (props) => {
  const timestamp = new Date(props.created);
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const date = timestamp.toLocaleDateString("en-CA", dateOptions);
  let hours = timestamp.getHours();
  let minutes = timestamp.getMinutes();

  // convert time to am / pm format
  
  const convertToAMPM = (hours, minutes) => {
    const amPm = hours >= 12 ? 'pm' : 'am';
    hours = hours ? hours : 12; 
    hours = hours < 10 ? '0' + hours : hours + '';
    minutes = minutes < 10 ? '0' + minutes : minutes + '';
    const result = {hours, minutes, amPm}
    return result;
  }

  
  const time = convertToAMPM(hours, minutes);
  
  return (
    <div>
      <div>{date}</div>
      <div>{props.from}</div>
      <div>{props.via}</div>
      <div>icon</div>
      <div>
        <span>{time.hours + " " + time.minutes}</span>
        <span>{time.amPm}</span>
      </div>
      <div><button>Details</button></div>
      <div>
</div>
    </div>
  );
};

export default AllCallsListItem;
