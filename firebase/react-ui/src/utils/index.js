
export function duplicate(items) {
  let duplicates = [];
  items.map(item => {
    for (let i = 0; i < 20; i++) {
      duplicates.push(item);
    }
  });
  return duplicates;
}

export function loginErrorToMessage(error) {
  switch (error.code) {
    case "auth/user-not-found":
      return "There is no user record corresponding to this identifier. Please try another email";
    default:
      return error.message;
  }
}

export function formatTime(time) {
  let hours =
    time.getHours() > 12
      ? time.getHours() - 12
      : time.getHours() === 0
      ? 12
      : time.getHours();
  let minutes =
    time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
  let period = time.getHours() < 12 ? " am" : " pm";
  return hours + ":" + minutes + period;
}

export function generateUid() {
  var S4 = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}

export function formatJobHours(jobHours) {
  let formattedJobHours = {};
  jobHours
    ? Object.values(jobHours).forEach(workDay => {
        if (
          formattedJobHours[workDay.jobId] &&
          formattedJobHours[workDay.jobId][workDay.employeeId]
        ) {
          // Increment employee hours
          formattedJobHours[workDay.jobId][
            workDay.employeeId
          ].duration += parseFloat(workDay.duration);
        } else {
          formattedJobHours[workDay.jobId] = {
            ...formattedJobHours[workDay.jobId],
            [workDay.employeeId]: {
              employeeId: workDay.employeeId,
              duration: parseFloat(workDay.duration),
              name: workDay.employeeName
            }
          };
        }
      })
    : null;

  return formattedJobHours;
}
