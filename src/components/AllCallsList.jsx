import axios from "axios";
import React, { useState, useEffect } from "react";
import AllCallsListItem from "/home/alexey/lighthouse/aircall/src/components/AllCallsListItem.jsx";
import checkForSameDate from "../helpers/check-same-date";
const AllCallsList = () => {
  const [calls, setCalls] = useState([]);
  // listen for archive clicks on children
  // const [archived, setArchived] = useState(false);
  const [allClicked, setAllClicked] = useState(false);
  const [updatePage, setUpdatePage] = useState(false);

  // const checkForSameDate = (arr) => { 
  //   let previousDateChecker;
  //   arr.forEach((elem, index) => {
  //     const timestamp = new Date(elem.created_at);
  //     const year = timestamp.getFullYear();
  //     const month = timestamp.getMonth();
  //     const day = timestamp.getDay();
  //     const dateChecker = year + month + day;
  //     if(index === 0) {
  //       previousDateChecker = dateChecker;
  //       elem.sameDate = false;
  //     } else {
  //       if(dateChecker === previousDateChecker) {
  //         elem.sameDate = true;
  //       } else {
  //         previousDateChecker = dateChecker;
  //         elem.sameDate = false;
  //       }
  //     }
  //   });


  // }


  useEffect(() => {
    const getAllCalls = () => {
      axios
        .get("https://aircall-job.herokuapp.com/activities")
        .then((result) => {
          let notArchived = result.data.filter((elem) => !elem.is_archived);
          // let previousDateChecker;
          checkForSameDate(notArchived);

          // notArchived.forEach((elem, index) => {
          //   const timestamp = new Date(elem.created_at);
          //   const year = timestamp.getFullYear();
          //   const month = timestamp.getMonth();
          //   const day = timestamp.getDay();
          //   const dateChecker = year + month + day;

          //   if(index === 0) {
          //     previousDateChecker = dateChecker;
          //     elem.sameDate = false;
          //   } else {
          //     if(dateChecker === previousDateChecker) {
          //       elem.sameDate = true;
          //     } else {
          //       previousDateChecker = dateChecker;
          //       elem.sameDate = false;
          //     }
          //   }

          // });

          setCalls(notArchived);
        });
    };
    if (!allClicked) {
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
            resolve(true);
          });
        });
      };

      archiveAllPromises().then(() => {
        setUpdatePage(true);
      });
    }

    return () => {
      // setArchived(false);
      setAllClicked(false);
      setUpdatePage(false);
    };
  }, [allClicked, updatePage]);

  // sort calls by timestamp

  calls.sort((a, b) => a.created - b.created);

  const allCalls = calls.map((elem) => {
    const props = {
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
      <div>
        <button onClick={archiveAll}>Archive all calls</button>
      </div>
      <div>{allCalls}</div>
    </div>
  );
};

export default AllCallsList;
