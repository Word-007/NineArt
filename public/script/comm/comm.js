var getClass = function(Class, index) {
    if (arguments.length == 1) {
        return document.getElementsByClassName(Class)
    } else {
        return document.getElementsByClassName(Class)[index]
    }
};

var getId = function(id) {
    return document.getElementById(id)
}

var SelectAll = function(str) {
    return document.querySelectorAll(str)
}

export {getClass,getId,SelectAll}