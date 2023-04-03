function createEmployeeRecord(array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map((array) => createEmployeeRecord(array));
  }
  
  function createTimeInEvent(record, dateTime) {
    let [date, hour] = dateTime.split(" ");
    record.timeInEvents.push({ type: "TimeIn", date: date, hour: parseInt(hour) });
    return record;
  }
  
  function createTimeOutEvent(record, dateTime) {
    let [date, hour] = dateTime.split(" ");
    record.timeOutEvents.push({ type: "TimeOut", date: date, hour: parseInt(hour) });
    return record;
  }
  
  function hoursWorkedOnDate(record, date) {
    let timeInEvent = record.timeInEvents.find((e) => e.date === date);
    let timeOutEvent = record.timeOutEvents.find((e) => e.date === date);
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
  }
  
  function wagesEarnedOnDate(record, date) {
    let hours = hoursWorkedOnDate(record, date);
    return hours * record.payPerHour;
  }
  
  function allWagesFor(record) {
    let dates = record.timeInEvents.map((e) => e.date);
    let wages = dates.reduce((acc, date) => acc + wagesEarnedOnDate(record, date), 0);
    return wages;
  }
  
  function calculatePayroll(records) {
    return records.reduce((acc, record) => acc + allWagesFor(record), 0);
  }
  