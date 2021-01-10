/*jshint esversion: 6 */

(function (global) {
    const singularLabels = ['second', 'minute', 'hour', 'day'];
    const pluralLabels = ['seconds', 'minutes', 'hours', 'days'];

    var getSeconds = (value, label) => {
        // Function checkes for invalid arguments and returns the value in seconds
        if (typeof value != 'number') {
            return null;
        }

        if (singularLabels.indexOf(label) >= 0 && value != 1) {
            return null;
        } else if (pluralLabels.indexOf(label) >= 0 && value == 1) {
            return null;
        }

        let result = value;
        switch (label) {
            case 'day':
            case 'days':
                result = result * 24; /* falls through */

            case 'hour':
            case 'hours':
                result = result * 60; /* falls through */

            case 'minute':
            case 'minutes':
                result = result * 60; /* falls through */

            case 'second':
            case 'seconds':
                break;

            default:
                return null;
        }
        return result;
    };

    var getTime = (seconds) => {
        // Function returns the seconds in greatest label possible
        let value, label;
        if (seconds >= 86400 && seconds % 86400 == 0) {
            value = seconds / 86400;
            label = 'day';
        } else if (seconds >= 3600 && seconds % 3600 == 0) {
            value = seconds / 3600;
            label = 'hour';
        } else if (seconds >= 60 && seconds % 60 == 0) {
            value = seconds / 60;
            label = 'minute';
        } else {
            value = seconds;
            label = 'second';
        }
        if (value != 1) {
            label += 's';
        }
        return [value, label];
    };

    var timeAdder = (value1, label1, value2, label2) => {
        // Function converts to seconds, adds them and gets highest label value
        let seconds1 = getSeconds(value1, label1);
        let seconds2 = getSeconds(value2, label2);

        let result;
        if (seconds1 != null && seconds2 != null) {
            result = getTime(seconds1 + seconds2);
        } else {
            result = false;
        }
        return result;
    };

    global.timeAdder = timeAdder;
})(window);

//Testing the code
console.log(timeAdder(1,"minute",3,"minutes"));   // [4, "minutes"]
console.log(timeAdder(5,"days",25,"hours"));      // [145, "hours"]
console.log(timeAdder(1,"minute",240,"seconds")); // [5, "minutes"]
console.log(timeAdder(5,"hour",5,"minutes"));     // false
console.log(timeAdder(false,false,5,"minutes"));  // false
console.log(timeAdder({},"days",5,"minutes"));    // false
console.log(timeAdder(20,"hours",4,"hours"));     // [1, "day"]
console.log(timeAdder(20,"hours",5,"hours"));     // [25, "hours"]