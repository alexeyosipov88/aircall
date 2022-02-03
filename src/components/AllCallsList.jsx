import axios from "axios";
import React, { useState, useEffect } from "react";
import AllCallsListItem from "/home/alexey/lighthouse/aircall/src/components/AllCallsListItem.jsx";

const AllCallsList = () => {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    axios.get("https://aircall-job.herokuapp.com/activities").then((result) => {
      setCalls(result.data);
    });
  }, []);

  // sort calls by timestamp

  calls.sort((a, b) => a.created - b.created);

  const allCalls = calls.map((elem) => {
    const props = {
      from: elem.from,
      via: elem.via,
      created: elem.created_at,
    };
    return <AllCallsListItem key={elem.id} {...props} />;
  });

  return <div>{allCalls}</div>;
};

export default AllCallsList;
