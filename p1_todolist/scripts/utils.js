var Utils = (function () {
    var show = function (info) {
        var element;
        if(typeof info === "string") {
            element = document.getElementById(info);
        } else {
            element = info;
        }
        element.style.display = 'block';
    };

    var hide = function (info) {
        var element;
        if(typeof info === "string") {
            element = document.getElementById(info);
        } else {
            element = info;
        }
        element.style.display = 'none';
    };

    return {
        show: show,
        hide: hide
    };
})();
