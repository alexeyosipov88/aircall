import axios from "axios";
import React, { useState, useEffect } from "react";
import AllCallsListItem from "/home/alexey/lighthouse/aircall/src/components/AllCallsListItem.jsx";

const AllCallsList = () => {
  const [calls, setCalls] = useState([]);
  // listen for archive clicks on children
  const [archived, setArchived] = useState(false);

  useEffect(() => {
    axios.get("https://aircall-job.herokuapp.com/activities").then((result) => {
      const notArchived = result.data.filter((elem) => !elem.is_archived);
      setCalls(notArchived);
    });
    if(archived) {
      console.log(`effect`)
    }
    return () => {setArchived(false)}
  }, [archived]);

  // sort calls by timestamp

  calls.sort((a, b) => a.created - b.created);

  const allCalls = calls.map((elem) => {
    const props = {
      is_archived: false,
      id: elem.id,
      from: elem.from,
      via: elem.via,
      created: elem.created_at,

    };
    return <AllCallsListItem setArchived={setArchived} key={elem.id} {...props} />;
  });

  return <div>{allCalls}</div>;
};

export default AllCallsList;
