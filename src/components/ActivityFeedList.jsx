import axios from "axios";
import React, { useState, useEffect } from "react";
import ActivityFeedListItem from "/home/alexey/lighthouse/aircall/src/components/ActivityFeedListItem.jsx";

const ActivityFeedList = () => {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    axios.get('https://aircall-job.herokuapp.com/activities').
      then((result) => {
        setCalls(result.data)
      })
  }, []);

  const allCalls = calls.map(elem => {
    const props = {
      from: elem.from,
      via: elem.via,
      created: elem.created_at
    }
    return (<ActivityFeedListItem key={elem.id} {... props}/>)
  })

  return <div>{allCalls}</div>;
};

export default ActivityFeedList;
