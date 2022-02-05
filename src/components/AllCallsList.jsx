import axios from "axios";
import React, { useState, useEffect } from "react";
// import AllCallsListItem from "/home/alexey/lighthouse/aircall/src/components/AllCallsListItem.jsx";
import AllCallsListItem from "../components/AllCallsListItem.jsx";

import checkForSameDate from "../helpers/check-same-date";
import iconsObject from "../icons/icons-object";

const AllCallsList = () => {
  const [calls, setCalls] = useState([]);
  const [allClicked, setAllClicked] = useState(false);
  const [updatePage, setUpdatePage] = useState(false);

  useEffect(() => {
    const getAllCalls = () => {
      axios
        .get("https://aircall-job.herokuapp.com/activities")
        .then((result) => {
          let notArchived = result.data.filter((elem) => !elem.is_archived);
          checkForSameDate(notArchived);
          notArchived.sort((a, b) => a.created - b.created);
          setCalls(notArchived);
        });
    };
    if (!allClicked && !updatePage) {
      getAllCalls();
    }

    if (allClicked) {
      const archiveAllPromises = () => {
        return new Promise((resolve) => {
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
            resolve();
          });
        });
      };
      archiveAllPromises().then(() => {
        console.log("START");
        setUpdatePage(true);
      });
    }
    return () => {
      setAllClicked(false);
      setUpdatePage(false);
    };
  }, [updatePage, allClicked]);

  const archBtn = iconsObject.archive;

  const allCalls = calls.map((elem) => {
    const icon = iconsObject[elem.call_type];
    const props = {
      icon: icon,
      sameDate: elem.sameDate,
      is_archived: false,
      id: elem.id,
      from: elem.from,
      via: elem.via,
      created: elem.created_at,
    };
    return (
      <AllCallsListItem
        setUpdatePage={setUpdatePage}
        key={elem.id}
        {...props}
      />
    );
  });
  const archiveAll = () => {
    setAllClicked(true);
  };

  return (
    <div className="all-calls">
      <div className="archive-all" onClick={archiveAll}>
        <div className="icon">
          <img src={archBtn} alt="" />
        </div>
        <div className="arch-all-text">Archive all calls</div>
      </div>
      <div>{allCalls}</div>
    </div>
  );
};

export default AllCallsList;
