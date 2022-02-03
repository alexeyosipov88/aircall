import axios from "axios";
import React, { useState, useEffect } from "react";
import ArichivedListItem from "/home/alexey/lighthouse/aircall/src/components/AllCallsListItem.jsx";

const ArchivedList = () => {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    axios.get("https://aircall-job.herokuapp.com/activities").then((result) => {
      // filter all calls to only archived ones
      console.log(result.data)
      const archivedCalls = result.data.filter(elem => elem.is_archived);
      setCalls(archivedCalls);

      console.log(archivedCalls, 'what happened')
    });
  }, []);

  // sort calls by timestamp

  // setCalls(archivedCalls);
  calls.sort((a, b) => a.created - b.created);

  const allCalls = calls.map((elem) => {
    const props = {
      from: elem.from,
      via: elem.via,
      created: elem.created_at,
    };
    return <ArichivedListItem key={elem.id} {...props} />;
  });

  return <div>{allCalls}</div>;
};

export default ArchivedList;
