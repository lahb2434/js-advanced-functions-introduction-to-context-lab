// Your code here
function createEmployeeRecord(info) {
  const employee = {
    firstName: info[0],
    familyName: info[1],
    title: info[2],
    payPerHour: info[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return employee
}

function createEmployeeRecords(employeesInfo) {
  return employeesInfo.map(employee => createEmployeeRecord(employee))  
}

function createTimeInEvent(employeeRecord, dateStamp) {
  let clockIn = dateStamp.split(' ')
  employeeRecord.timeInEvents.push({type: "TimeIn", date: clockIn[0], hour: +clockIn[1]})
  return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
  let clockIn = dateStamp.split(' ')
  employeeRecord.timeOutEvents.push({type: "TimeOut", date: clockIn[0], hour: +clockIn[1]})
  return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, dateStamp) {
    const hoursWorked = (timeInTimeOut, date) => (
      timeInTimeOut.find(x => x.date === date)
    )
    let timeIn = hoursWorked(employeeRecord.timeInEvents, dateStamp).hour
    let timeOut = hoursWorked(employeeRecord.timeOutEvents, dateStamp).hour
    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(employeeRecord, dateStamp) {
  let hoursWorked = hoursWorkedOnDate(employeeRecord, dateStamp);
  return hoursWorked * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {
  return employeeRecord.timeInEvents.reduce((memo, d) => {
    return memo + wagesEarnedOnDate(employeeRecord, d.date)}, 0)
}

function calculatePayroll(employeeRoster) {
 return employeeRoster.reduce((memo, d) => {
   return memo + allWagesFor(d) 
 }, 0)
}

function findEmployeeByFirstName(employeeRoster, name) { 
  return employeeRoster.find(x => x.firstName === name)  
}