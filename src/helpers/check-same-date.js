const checkForSameDate = (arr) => { 
  let previousDateChecker;
  arr.forEach((elem, index) => {
    const timestamp = new Date(elem.created_at);
    const year = timestamp.getFullYear();
    const month = timestamp.getMonth();
    const day = timestamp.getDay();
    const dateChecker = year + month + day;
    if(index === 0) {
      previousDateChecker = dateChecker;
      elem.sameDate = false;
    } else {
      if(dateChecker === previousDateChecker) {
        elem.sameDate = true;
      } else {
        previousDateChecker = dateChecker;
        elem.sameDate = false;
      }
    }
  });


}


export default checkForSameDate;