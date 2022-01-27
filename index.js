/* Your Code Here */

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



//FINE
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

//let testEmployee = createEmployeeRecord(["Gray", "Worm", "Security", 1])


//FINE
function createEmployeeRecords(recordsArray) {
    return recordsArray.map(record => createEmployeeRecord(record));
}

//Use of this
let createTimeInEvent = function(dateStamp) {
    //let [date, hour] = dateStamp.split(' '); //ES6 - same as below 
    const arrFromDate = dateStamp.split(" ");
    const date = arrFromDate[0];
    const hour = arrFromDate[1]
    const inEvent = {
        type: "TimeIn",
        hour: parseInt(hour, 10), 
        date: date
    }

    this.timeInEvents.push(inEvent);

    return this;
}

let createTimeOutEvent = function (dateStamp) {
    let timeFromArr = dateStamp.split(' ');
    let date = timeFromArr[0];
    let hour = timeFromArr[1];
    const outEvent = {
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date: date,
    }

    this.timeOutEvents.push(outEvent);

    return this;

}

// createTimeOutEvent(testEmployee, "2015-02-28 1700"); // => log the object with employee info and time out 


//Behavior: Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent 
//Working note: .find() 
let hoursWorkedOnDate = function (date) {
    let inEvemt = this.timeInEvents.find(function(e) {
        return e.date === date;
    })

    let outEvent = this.timeOutEvents.find(function(e) {
        return e.date === date;
    })

    return (outEvent.hour - inEvemt.hour) / 100;

}


//cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 1000])
//updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
//updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")

let wagesEarnedOnDate = function (date) {
    let earning = hoursWorkedOnDate.call(this, date) * this.payPerHour;
    return earning;
}

// let allWagesFor = function (employee) {
//     let dates = employee.timeInEvents.map(e => e.date);
//     let sumOfWages = dates.reduce( (timesheet, date) => timesheet + wagesEarnedOnDate(employee, date), 0); 
//     return sumOfWages
// }

let calculatePayroll = function (employeeRecordsArr) {
    return employeeRecordsArr.reduce((timesheet, employeeRecord) => timesheet + allWagesFor.call(employeeRecord), 0);   
}


// let calculatePayroll = function (employeeRecordsArr) {
//     return employeeRecordsArr.reduce((timesheet, employeeRecord) => timesheet + allWagesFor(employeeRecord), 0);   
// }

const findEmployeeByFirstName = function (srcArray, firstName) {
    return srcArray.find( record => record.firstName === firstName);
}