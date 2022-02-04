import axios from "axios";
import React, { useState, useEffect } from "react";
import AllCallsListItem from "/home/alexey/lighthouse/aircall/src/components/AllCallsListItem.jsx";

const AllCallsList = () => {
  const [calls, setCalls] = useState([]);
  // listen for archive clicks on children
  const [archived, setArchived] = useState(false);
  const [allClicked, setAllClicked] = useState(false);
  const [updatePage, setUpdatePage] = useState(false);

  useEffect(() => {
    axios.get("https://aircall-job.herokuapp.com/activities").then((result) => {
      const notArchived = result.data.filter((elem) => !elem.is_archived);
      console.log(notArchived.length)
      setCalls(notArchived);
    });
    console.log(allClicked)
    if (allClicked) {
      console.log('promise')
      const archiveAllPromises = () => {
        return new Promise((resolve, reject) => {
          const promises = [];
          calls.forEach((elem) => {
            const JSON = { is_archived: true };
            const promise = axios.post(
              `https://aircall-job.herokuapp.com/activities/${elem.id}`,
              JSON
            );
            promises.push(promise);
          });
          Promise.all(promises).then(() => {
            resolve(true);
          });
        });
      };

      archiveAllPromises().then(() => {
        setUpdatePage(true);
      });
    }

    return () => {
      setArchived(false);
      setAllClicked(false);
      setUpdatePage(false);
    };
  }, [archived, allClicked, updatePage]);

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
    return (
      <AllCallsListItem setArchived={setArchived} key={elem.id} {...props} />
    );
  });
  const archiveAll = () => {
    console.log('clicked')
    
    setAllClicked(true)

  };

  return (
    <div>
      <div>
      <button onClick={archiveAll}>Archive all</button>

      </div>
      <div>{allCalls}</div>

    </div>
  );
};

export default AllCallsList;
