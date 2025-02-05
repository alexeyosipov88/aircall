import axios from "axios";
import React, { useState, useEffect } from "react";
import ArichivedListItem from "../components/AllCallsListItem.jsx";
import checkForSameDate from "../helpers/check-same-date";
import iconsObject from "../icons/icons-object";

const ArchivedList = () => {
  const [calls, setCalls] = useState([]);
  const [updatePage, setUpdatePage] = useState(false);
  const [allClicked, setAllClicked] = useState(false);
  useEffect(() => {
    axios.get("https://aircall-job.herokuapp.com/activities").then((result) => {
      const archivedCalls = result.data.filter((elem) => elem.is_archived);
      checkForSameDate(archivedCalls);
      archivedCalls.sort((a, b) => a.created - b.created);
      setCalls(archivedCalls);
    });
    if (allClicked) {
      axios.get(`https://aircall-job.herokuapp.com/reset`)
      .then(() => {
          setUpdatePage(true);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    return () => {
      setUpdatePage(false);
      setAllClicked(false);
    };
  }, [allClicked, updatePage]);

  const allCalls = calls.map((elem) => {
    const icon = iconsObject[elem.call_type];
    const props = {
      icon: icon,
      sameDate: elem.sameDate,
      is_archived: true,
      id: elem.id,
      from: elem.from,
      via: elem.via,
      created: elem.created_at,
    };
    return (
      <ArichivedListItem
        setUpdatePage={setUpdatePage}
        key={elem.id}
        {...props}
      />
    );
  });

  const unarchiveAll = () => {
    setAllClicked(true);
  };
  
  const archBtn = iconsObject.unarchive;

  return (
    <div className="all-calls">
      <div className="archive-all" onClick={unarchiveAll}>
        <div className="icon">
          <img src={archBtn} alt="" />
        </div>
        <div className="arch-all-text">Unarchive all calls</div>
      </div>
      <div>{allCalls}</div>
    </div>
  );
};

export default ArchivedList;
