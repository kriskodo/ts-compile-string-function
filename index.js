var main = document.getElementById("app");
if (!main)
    throw new Error("no container with id: app found.");
var html = main.innerHTML;
function compilator(obj) {
    var regex = new RegExp("{{([a-zA-Z]+)}}");
    function compile(str) {
        var match;
        while (match = str.match(regex)) {
            str = str.replace(match[0], obj[match[1]]);
        }
        return str;
    }
    return { compile: compile };
}
var str = "<p> {{firstName}} </p> <p> {{lastName}} </p> <p> {{age}} </p>";
var inputObj = { firstName: "kris", lastName: "georgiev", age: 21 };
var c = compilator(inputObj);
main.innerHTML = c.compile(html);
