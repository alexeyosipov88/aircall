import axios from "axios";
import React, { useState, useEffect } from "react";
import ArichivedListItem from "/home/alexey/lighthouse/aircall/src/components/AllCallsListItem.jsx";

const ArchivedList = () => {
  const [calls, setCalls] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [archived, setArchived] = useState(false);


  useEffect(() => {
    axios.get("https://aircall-job.herokuapp.com/activities")
        .then((result) => {
          // filter all calls to only archived ones
          const archivedCalls = result.data.filter((elem) => elem.is_archived);
          setCalls(archivedCalls);
        });
    if (clicked) {
      console.log('hello')
      axios.get(`https://aircall-job.herokuapp.com/reset`).then(
        () => {
          // getArchivedCalls();
        },
        (error) => {
          console.log(error);
        }
      );
    }
    return () => {
      setArchived(false);
      setClicked(false);
    }
  }, [clicked, archived]);

  // sort calls by timestamp

  // setCalls(archivedCalls);
  calls.sort((a, b) => a.created - b.created);

  const allCalls = calls.map((elem) => {
    const props = {
      is_archived: true,
      id: elem.id,
      from: elem.from,
      via: elem.via,
      created: elem.created_at,
    };
    return <ArichivedListItem setArchived={setArchived} key={elem.id} {...props} />;
  });

  const unarchiveAll = () => {
    console.log('wht')
    setClicked(true);
  };

  return (
    <div>
      <div>{allCalls}</div>
      <button onClick={unarchiveAll}>Unarchive all</button>
    </div>
  );
};

export default ArchivedList;
