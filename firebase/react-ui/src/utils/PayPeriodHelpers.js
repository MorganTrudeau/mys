import moment from "moment";

export function groupWorkDays(workDays, company) {
  workDays.sort((a, b) => {
    return a.date > b.date ? 1 : a.date < b.date ? -1 : 0;
  });
  let payPeriods = [];
  if (!company) {
    return payPeriods;
  }
  switch (company.payPeriod) {
    case "weekly":
      payPeriods = groupWeekly(workDays, company);
      break;
    case "biWeekly":
      payPeriods = groupBiWeekly(workDays, company);
      break;
    case "twiceMonthly":
      payPeriods = groupTwiceMonthly(workDays, company);
      break;
    case "monthly":
      payPeriods = groupMonthly(workDays, company);
      break;
    default:
      break;
  }
  return payPeriods;
}

function groupWeekly(workDays, company) {
  // Array holding workDays grouped into pay periods
  let payPeriods = [];
  // Counter to interate through workDays
  let counter = workDays.length - 1;
  while (counter >= 0) {
    // Last day in period
    let workDayDate = initiateZeroTimeDate(workDays[counter].date);
    // Difference in week days (0 - 6) between reference cut off and work day
    let differenceInDays = company.cutOffs[0] - workDayDate.getDay();
    // If differenceInDays is positive the closest possible endCutOffDate is in the same week
    // If differenceInDays is negative the closest possible endCutOffDate is in the next week
    let endCutOffDate = new Date(workDayDate);
    if (differenceInDays >= 0) {
      endCutOffDate.setDate(workDayDate.getDate() + differenceInDays);
    } else {
      endCutOffDate.setDate(workDayDate.getDate() + 7 + differenceInDays);
    }
    // Start cut off date is always 14 days behind
    let startCutOffDate = new Date(endCutOffDate);
    startCutOffDate.setDate(endCutOffDate.getDate() - 7);

    let a = new Date(endCutOffDate);
    a.setDate(endCutOffDate.getDate() - 6);
    // Pay period label construction
    let payPeriodName =
      moment(a).format("MMM Do") +
      " - " +
      moment(endCutOffDate).format("MMM Do");
    // Array holding workDays in pay period
    let payPeriodDays = [];
    // Add relevant workDays to current pay period
    while (
      counter >= 0 &&
      initiateZeroTimeDate(workDays[counter].date) > startCutOffDate &&
      initiateZeroTimeDate(workDays[counter].date) <= endCutOffDate
    ) {
      payPeriodDays.push(workDays[counter]);
      counter--;
    }
    // Construct pay period object
    let payPeriod = { title: payPeriodName, workDays: payPeriodDays };
    // Add pay period object to list of pay periods
    payPeriods.push(payPeriod);
  }
  return payPeriods;
}

function groupBiWeekly(workDays, company) {
  // Array holding workDays grouped into pay periods
  let payPeriods = [];
  // Counter to interate through workDays
  let counter = workDays.length - 1;
  // Reference cut off date provided by user
  let referenceCutOffDate = initiateZeroTimeDate(company.cutOffs[0]);
  while (counter >= 0) {
    // Last day in period
    let workDayDate = initiateZeroTimeDate(workDays[counter].date);
    // Difference in week days (0 - 6) between reference cut off and work day
    let differenceInDays = referenceCutOffDate.getDay() - workDayDate.getDay();
    // If differenceInDays is positive the closest possible endCutOffDate is in the same week
    // If differenceInDays is negative the closest possible endCutOffDate is in the next week
    let endCutOffDate = new Date(workDayDate);
    if (differenceInDays >= 0) {
      endCutOffDate.setDate(workDayDate.getDate() + differenceInDays);
    } else {
      endCutOffDate.setDate(workDayDate.getDate() + 7 + differenceInDays);
    }
    // Start cut off date is always 14 days behind
    let startCutOffDate = new Date(endCutOffDate);
    startCutOffDate.setDate(endCutOffDate.getDate() - 14);
    // The difference between the reference cut off date and
    // the calculated cut off date should be evenly divided by 14 days
    // If not they are the week after
    if (daysBetween(referenceCutOffDate, endCutOffDate) % 14 !== 0) {
      startCutOffDate.setDate(startCutOffDate.getDate() + 7);
      endCutOffDate.setDate(endCutOffDate.getDate() + 7);
    }
    // Pay period label construction
    let payPeriodName =
      moment(startCutOffDate).format("MMM Do") +
      " - " +
      moment(endCutOffDate).format("MMM Do");
    // Array holding workDays in pay period
    let payPeriodDays = [];
    // Add relevant workDays to current pay period
    while (
      counter >= 0 &&
      initiateZeroTimeDate(workDays[counter].date) > startCutOffDate &&
      initiateZeroTimeDate(workDays[counter].date) <= endCutOffDate
    ) {
      payPeriodDays.push(workDays[counter]);
      counter--;
    }
    // Construct pay period object
    let payPeriod = { title: payPeriodName, workDays: payPeriodDays };
    // Add pay period object to list of pay periods
    payPeriods.push(payPeriod);
  }
  return payPeriods;
}

function groupTwiceMonthly(workDays, company) {
  let payPeriods = [];
  let counter = workDays.length - 1;
  let maxCutOffDate = Math.max(company.cutOffs[0], company.cutOffs[1]);
  let minCutOffDate = Math.min(company.cutOffs[0], company.cutOffs[1]);
  let endCutOffDate;
  let startCutOffDate;
  while (counter >= 0) {
    let workDayDate = initiateZeroTimeDate(workDays[counter].date);
    // Determine start and end cut off bounds
    if (workDayDate.getDate() <= minCutOffDate + 1) {
      startCutOffDate = new Date(
        workDayDate.getFullYear(),
        workDayDate.getMonth() - 1,
        maxCutOffDate + 1
      );
      endCutOffDate = new Date(
        workDayDate.getFullYear(),
        workDayDate.getMonth(),
        minCutOffDate + 1
      );
    } else if (workDayDate.getDate() > maxCutOffDate + 1) {
      startCutOffDate = new Date(
        workDayDate.getFullYear(),
        workDayDate.getMonth(),
        maxCutOffDate + 1
      );
      endCutOffDate = new Date(
        workDayDate.getFullYear(),
        workDayDate.getMonth() + 1,
        minCutOffDate + 1
      );
    } else {
      startCutOffDate = new Date(
        workDayDate.getFullYear(),
        workDayDate.getMonth(),
        minCutOffDate + 1
      );
      endCutOffDate = new Date(
        workDayDate.getFullYear(),
        workDayDate.getMonth(),
        maxCutOffDate + 1
      );
    }
    // Pay period label construction
    let payPeriodName =
      moment(startCutOffDate).format("MMM Do") +
      " - " +
      moment(endCutOffDate).format("MMM Do");
    // Array holding workDays in pay period
    let payPeriodDays = [];
    // Add relevant workDays to current pay period
    while (
      counter >= 0 &&
      initiateZeroTimeDate(workDays[counter].date) > startCutOffDate &&
      initiateZeroTimeDate(workDays[counter].date) <= endCutOffDate
    ) {
      payPeriodDays.push(workDays[counter]);
      counter--;
    }
    // Construct pay period object
    let payPeriod = { title: payPeriodName, workDays: payPeriodDays };
    // Add pay period object to list of pay periods
    payPeriods.push(payPeriod);
  }
  return payPeriods;
}

function groupMonthly(workDays, company) {
  let payPeriods = [];
  let counter = workDays.length - 1;
  let cutOffDate = company.cutOffs[0];
  let startCutOffDate;
  let endCutOffDate;
  while (counter >= 0) {
    let workDayDate = initiateZeroTimeDate(workDays[counter].date);
    // Determine start and end cut off bounds
    if (workDayDate.getDate() <= cutOffDate + 1) {
      startCutOffDate = new Date(
        workDayDate.getFullYear(),
        workDayDate.getMonth() - 1,
        cutOffDate + 1
      );
      endCutOffDate = new Date(
        workDayDate.getFullYear(),
        workDayDate.getMonth(),
        cutOffDate + 1
      );
    } else {
      startCutOffDate = new Date(
        workDayDate.getFullYear(),
        workDayDate.getMonth(),
        cutOffDate + 1
      );
      endCutOffDate = new Date(
        workDayDate.getFullYear(),
        workDayDate.getMonth() + 1,
        cutOffDate + 1
      );
    }
    // Pay period label construction
    let payPeriodName =
      moment(startCutOffDate).format("MMM Do") +
      " - " +
      moment(endCutOffDate).format("MMM Do");
    // Array holding workDays in pay period
    let payPeriodDays = [];
    // Add relevant workDays to current pay period
    while (
      counter >= 0 &&
      initiateZeroTimeDate(workDays[counter].date) > startCutOffDate &&
      initiateZeroTimeDate(workDays[counter].date) <= endCutOffDate
    ) {
      payPeriodDays.push(workDays[counter]);
      counter--;
    }
    // Construct pay period object
    let payPeriod = { title: payPeriodName, workDays: payPeriodDays };
    // Add pay period object to list of pay periods
    payPeriods.push(payPeriod);
  }
  return payPeriods;
}

function daysBetween(day1, day2) {
  let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  let daysBetween = Math.round(
    Math.abs((day1.getTime() - day2.getTime()) / oneDay)
  );
  return daysBetween;
}

function initiateZeroTimeDate(dateString) {
  let date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
  return date;
}
