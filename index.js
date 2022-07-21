/* Your Code Here */
// the lessons are not helpful on the context topic, why isn't there a lecture?
// I'm really struggling to figure out how to apply .call(), .apply()... or even 'this'
// ok I'm kind of getting it

const testObj = {
    firstName: 'Frodo',
    familyName: 'Baggins',
    title: 'Ringbearer',
    payPerHour: 25,
    timeInEvents: [
        {
            type: 'TimeIn',
            hour: 1200,
            date: '2022-01-01'
        }, 
        {
            type: 'TimeIn',
            hour: 1300,
            date: '2022-01-02'
        }
    ],
    timeOutEvents: [
        {
            type: 'TimeOut',
            hour: 1500,
            date: '2022-01-01'
        },
        {
            type: 'TimeOut',
            hour: 1700,
            date: '2022-01-02'
        }
    ]
}

function createEmployeeRecord(emplArr) {
    return {
    firstName: emplArr[0],
    familyName: emplArr[1],
    title: emplArr[2],
    payPerHour: emplArr[3],
    timeInEvents: [],
    timeOutEvents: [] 
    }    
}

function createEmployeeRecords(arrOfEmpArrs) {
    return arrOfEmpArrs.map(arr => createEmployeeRecord(arr))
}

// function createTimeInEvent(dateStamp) {
//     let timeInObj = {
//         type: 'TimeIn',
//         hour: parseInt(dateStamp.slice(-4)),
//         date: dateStamp.slice(0, 10)
//         }
//     this.timeInEvents.push(timeInObj)
//     return this
// }
let createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}
// function createTimeOutEvent(dateStamp) {
//     let timeOutObj = {
//         type: 'TimeOut',
//         hour: parseInt(dateStamp.slice(-4)),
//         date: dateStamp.slice(0, 10)
//         }
//     this.timeOutEvents.push(timeOutObj)
//     return this
// }
let createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}


function hoursWorkedOnDate(dateStamp) {
    let totalTime = 0
    //doesn't properly handle multiple requests on same day?
    
    for (let eventId = 0; eventId < this.timeInEvents.length; eventId++) {
        if (this.timeInEvents[eventId].date === dateStamp) {
            const timeIn = parseInt(this.timeInEvents[eventId].hour)/100
            const timeOut = parseInt(this.timeOutEvents[eventId].hour)/100
            totalTime += timeOut-timeIn
        }
        // if (this.timeOutEvents[eventId].date === dateStamp) {
        //     timeOut = parseInt(this.timeOutEvents[eventId].hour)/100
        // }
    }
    //this.timeInEvents
    return totalTime
}


function wagesEarnedOnDate(dateStamp) {
    let hoursWorked = hoursWorkedOnDate.call(this, dateStamp)
    //console.log(hoursWorked)
    let payRate = this.payPerHour
    // console.log(payRate)
    console.log(hoursWorked*payRate, this.firstName)
    return hoursWorked*payRate
}

function findEmployeeByFirstName(collection, firstNameString) {
    for (let i = 0; i < collection.length; i++) {
        if (collection[i].firstName === firstNameString) {
            return collection[i]
        } 
    }
}

let calculatePayroll = function(empRecordsArr) {
    //let totalPayPerEmpArr = empRecordsArr.map(empObj => allWagesFor.apply(empObj))
    //console.log(empRecordsArr)
    return empRecordsArr.reduce((previous, current) => {
        return previous + allWagesFor.call(current)
    }, 0)
}



//wagesEarnedOnDate.call(testObj, '2022-01-01')

//console.log(createTimeInEvent.call(testObj, '2022-01-01 0800'))
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

    const payable = [...new Set(eligibleDates)].reduce(function (memo, date) {
        return memo + wagesEarnedOnDate.call(this, date)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

