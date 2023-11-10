
function isLeapYear(year) {
    return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
}

function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

function getResult(date) {
    var totalDays = Math.floor((new Date().getTime() - date.getTime())) / (24 * 60 * 60 * 1000)
    let years = 0, months = 0, days = 0;

    while (totalDays >= 365) {
        if (isLeapYear(date.getFullYear()) && date.getMonth() <= 1) {
            if (totalDays >= 366) {
                totalDays -= 366;
                years++;
            }
        }
        else {
            totalDays -= 365;
            years++;
        }
        date.setFullYear(date.getFullYear() + 1);
    }

    while (totalDays >= daysInMonth(date.getMonth(), date.getFullYear())) {
        totalDays -= daysInMonth(date.getMonth(), date.getFullYear());
        months++;
        date.setMonth(date.getMonth() + 1);
    }

    days = Math.floor(totalDays - 5);

    displayResult(years, months, days);
}

function displayResult(years, months, days) {
    document.getElementById('years').textContent = years
    document.getElementById('months').textContent = months
    document.getElementById('days').textContent = days
}

function UnvalidDateError(data) {
    for (var i = 0; i < 3; i++) {
        if (i == 0)
            setError(
                data[i].value,
                data[i].name,
                "Must be a valid date",
                true
            )
        else     
            setError(
                data[i].value,
                data[i].name,
                "",
                true
            )
    }
}

function setError(data, name, error, bool) {
    var input = document.getElementById('div-' + name)

    input.className = "input" + (bool ? " false" : "");
    input.querySelector('p').textContent = error;

}

function checkIsEmpty(data, name) {
    if (!data){
        setError(
            data, 
            name,
            "This field is required",
            true
        )
        return false;
    }
    
    setError(
        data,
        name,
        "",
        false
    )
    return true;
}

function checkValidDate(date, year, month, day) {
    return date.getFullYear() === parseInt(year, 10) && (date.getMonth() + 1) === (parseInt(month, 10)) && date.getDate() === parseInt(day, 10);
}

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault()

    var form = document.forms['form'];
    var error = false;

    for (var i = 0; i < 3; i++) {
        var value = form.elements[i].value;
        var name = form.elements[i].name;

        if (checkIsEmpty(value, name)) {
            switch (name) {
                case 'Day':
                    if (value < 1 || value > 31) {
                        setError(
                            value,
                            name,
                            "Must be a valid day",
                            true
                        )
                        error = true;
                    }
                    break;
                case 'Month':
                    if (value < 1 || value > 12) {
                        setError(
                            value,
                            name,
                            "Must be a valid month",
                            true
                        )
                        error = true;
                    }
                    break;
                case 'Year':
                    if (value > new Date().getFullYear()) {
                        setError(
                            value,
                            name,
                            "Must be in the past",
                            true
                        )
                        error = true
                    }
                    break;
                default:
                    console.log("error");
            }
        }
        else 
            error = true;

    }

    if (error)
        return false;

    const date = new Date(form.elements[2].value + "-" + form.elements[1].value + "-" + form.elements[0].value)

    if (date > new Date()){
        setError(
            value,
            name,
            "Must be in the past",
            true
        )
        return false;
    }

    if (!checkValidDate(date, form.elements[2].value, form.elements[1].value, form.elements[0].value)){
        UnvalidDateError(form);
        return false;
    }

    document.getElementById('form').reset();

    getResult(date);
})
