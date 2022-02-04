import axios from "axios";
import React, { useState, useEffect } from "react";
import AllCallsListItem from "/home/alexey/lighthouse/aircall/src/components/AllCallsListItem.jsx";

const AllCallsList = () => {
  const [calls, setCalls] = useState([]);
  const [test, setTest] = useState(false);

  useEffect(() => {
    axios.get("https://aircall-job.herokuapp.com/activities").then((result) => {
      setCalls(result.data);
    });
    if(test) {
      console.log(`effect`)
    }
    return () => {setTest(false)}
  }, [test]);

  // sort calls by timestamp

  calls.sort((a, b) => a.created - b.created);

  const allCalls = calls.map((elem) => {
    const props = {
      id: elem.id,
      from: elem.from,
      via: elem.via,
      created: elem.created_at,
    };
    return <AllCallsListItem test={setTest} key={elem.id} {...props} />;
  });

  return <div>{allCalls}</div>;
};

export default AllCallsList;
