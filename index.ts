import { Params } from "./types";

let main = document.getElementById("app");

if (!main) throw new Error("no container with id: app found.");

const str = "<p> {{firstName}} </p> <p> {{lastName}} </p> <p> {{age}} </p>" as const;
type TDerivedParamsFromString = Params<typeof str>;

function compilator<T extends TDerivedParamsFromString>(obj: T) {
    const regex = new RegExp("{{([a-zA-Z]+)}}");

    function compile(str: string) {
        let match;

        while (match = str.match(regex)) {
            str = str.replace(match[0], obj[match[1]]);
        }

        return str;
    }

    return { compile: compile }
}

const inputObj = { firstName: "kris", lastName: "georgiev", age: 21 };
const c = compilator(inputObj);
main.innerHTML = c.compile(str);
