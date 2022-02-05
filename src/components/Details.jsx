import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getDate from "../helpers/get-date";
import getTime from "../helpers/get-time";

const Details = () => {
  const [details, setDetails] = useState();
  const id = useParams().id;

  useEffect(() => {
    axios
      .get(`https://aircall-job.herokuapp.com/activities/${id}`)
      .then((result) => {
        setDetails(result.data);
      });
  }, []);

  const direction = details && details.direction;
  const from = details && details.from;
  const to = details && details.to;
  const via = details && details.via;
  const duration = details && details.duration;
  const call_type = details && details.call_type;
  const date = details && getDate(details.created_at);
  const time = details && getTime(details.created_at)

  return (
    <div className="details">
      {details && (
        <div>
          <h3>Activity details:</h3>
          <div>
            <div>Date: {date}</div>
            <div>Time: {time}</div>
            <div>Direction: {direction}</div>
            <div>From: {from}</div>
            <div>To: {to}</div>
            <div>Via: {via}</div>
            <div>Duration: {duration + ` seconds`}</div>
            <div>Call type: {call_type}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
