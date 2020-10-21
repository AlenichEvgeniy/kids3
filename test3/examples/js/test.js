import {
    mouseposition
} from "./main.js";

export default function test(element, element1) {
    let a = Math.sqrt(Math.pow(element1.x - element.x, 2) + Math.pow(element1.y - element.y, 2));
    if ((Math.abs(mouseposition.y * (element1.x - element.x) - mouseposition.x * (element1.y - element.y) - element.y * element1.x + element.x * element1.y) / a) < 50 && (Math.sqrt(Math.pow(mouseposition.x - element.x, 2) + Math.pow(mouseposition.y - element.y, 2))+Math.sqrt(Math.pow(element1.x - mouseposition.x, 2) + Math.pow(element1.y - mouseposition.y, 2))< a + 100))
        return true;
    else return false;
}


