$(document).ready(function () {

    $("#leaveCalendar").datepicker({
        dateFormat: "mm/dd/yy",
        beforeShowDay: checkHolidayOrLeave,
        onSelect: onDateSelect

    });
    console.log($);
    console.log($("#leaveCalendar"));

});

var leaves = {
    cl: ['02/02/2021', '02/03/2021'],
    sl: ['02/11/2021'],
    el: ['02/24/2021']
};

var checkHolidayOrLeave = function (date) {
    //A function that takes a date as a parameter and must return an array with:
    //[0]: true/false indicating whether or not this date is selectable
    //[1]: a CSS class name to add to the date's cell or "" for the default presentation
    //[2]: an optional popup tooltip for this date
    //console.log("validateDate", new Date(leaveOn), date);

    let isHolidayOrLeave = false;
    let holidayOrLeaveClass = "";
    let holidayOrLeaveType = "";

    /////////check for weekends

    // for sat and sunday
    //[isHolidayOrLeave] = $.datepicker.noWeekends(date);

    // for sunday only
    //get the day in number
    let day = date.getDay();
    //check for sunday
    isHolidayOrLeave = day === 0;

    if (isHolidayOrLeave) {
        return [false, "holidays", "Holiday"];
    }

    //////check for casual leave
    //loop through casual leave array, and compare the date
    isHolidayOrLeave = leaves.cl.find(leaveOn => new Date(leaveOn).getTime() === date.getTime());
    if (isHolidayOrLeave) {
        return [false, "casualLeave", "Casual Leave"];
    }

    //check for sick leave        
    isHolidayOrLeave = leaves.sl.find(leaveOn => new Date(leaveOn).getTime() === date.getTime());
    if (isHolidayOrLeave) {
        return [false, "sickLeave", "Sick Leave"];
    }


    //check for earned leave
    isHolidayOrLeave = leaves.el.find(leaveOn => new Date(leaveOn).getTime() === date.getTime());
    if (isHolidayOrLeave) {
        return [false, "earnedLeave", "Earned Leave"];
    }


    //console.log(leaves.cl.map(leaveOn => console.log('ff',new Date(leaveOn).getTime(), date.getTime(), new Date(leaveOn).getTime() == date.getTime())));
    //return leaves.cl.find(leaveOn => new Date(leaveOn).getTime() === date.getTime()) ? [false, "casualLeave", "Casual Leave"] : [true, "", date.toDateString()];

    //if(date === new Date())
    //return $.datepicker.noWeekends(date);

    //default return
    return [true, "", ""];
}

let onDateSelect = function (date) {
    console.log(date);
}