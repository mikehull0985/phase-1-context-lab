function createEmployeeRecord(employeeRecordObj) {
    let obj = {
        firstName: employeeRecordObj[0],
        familyName: employeeRecordObj[1],
        title: employeeRecordObj[2],
        payPerHour: employeeRecordObj[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return obj
}

function createEmployeeRecords(employeesArray) {
    let newArray = []

    for (const employee of employeesArray) {
        const newObj = createEmployeeRecord(employee)
        newArray.push(newObj)
    }
    return newArray
}

function createTimeInEvent(dateStamp) {
    let hour = dateStamp.substring(11)
    hour = parseInt(hour, 10)
    const date = dateStamp.substring(0,10)
    let obj = {
        type: "TimeIn",
        hour: hour,
        date: date
    }
    this.timeInEvents.push(obj)
    return this
}

function createTimeOutEvent( dateStamp) {
    let hour = dateStamp.substring(11)
    hour = parseInt(hour, 10)
    const date = dateStamp.substring(0,10)
    let obj = {
        type: "TimeOut",
        hour: hour,
        date: date
    }
    this.timeOutEvents.push(obj)
    return this
}

function hoursWorkedOnDate(date) {
    const timeInArray = this.timeInEvents
    const correctObjTimeIn = timeInArray.find((obj) => obj.date === date)
    const punchIn = correctObjTimeIn.hour

    const timeOutArray = this.timeOutEvents
    const correctObjTimeOut = timeOutArray.find((obj) => obj.date === date)
    const punchOut = correctObjTimeOut.hour

    const hoursWorked = (punchOut - punchIn)/100
    return hoursWorked
}

function wagesEarnedOnDate(date) {
    const hours = hoursWorkedOnDate.call(this, date)

    const rate = this.payPerHour
    const wage = rate * hours

    return wage
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    const result = srcArray.find((obj) => obj.firstName === firstName);
    return result
}

function calculatePayroll(employeeRecords) {
    let payrollTotal = 0
    for (const obj of employeeRecords) {
        payrollTotal += allWagesFor.call(obj)
    }
    return payrollTotal

    // let array = []
    // for (let i=0; i <this.length; i++) {
    //     const employeeTotal = allWagesFor.call(this[i])
    //     array.push(employeeTotal)
    // }
    // const staffTotal = array.reduce(function(accumulator, currentTotal) {
    //     return accumulator + currentTotal
    //     })
    // return staffTotal
}