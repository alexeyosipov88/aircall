import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const AllCallsListItem = (props) => {
  const [clicked, setClicked] = useState(false)
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

  useEffect(() => {
    const JSON = { is_archived: true };

    if(clicked) {
      axios.post(`https://aircall-job.herokuapp.com/activities/${props.id}`, JSON);
      
    }
    return () => setClicked(false);

  }, [clicked])
  
  const time = convertToAMPM(hours, minutes);

  const archiveCall = () => {
    setClicked(true);


  }

  
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
      <div><Link to={`/calls/${props.id}`}>Details</Link></div>
      <div><button onClick={archiveCall}>Archive</button></div>
    </div>
  );
};

export default AllCallsListItem;
