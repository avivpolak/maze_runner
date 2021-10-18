import { readFileSync, readdirSync } from "fs";
function openChestSync(chestPath) {
    let chestContentJSON = "";
    try {
        let chestContent = readFileSync(chestPath);
        console.log(chestContent);
        chestContentJSON = JSON.stringify(chestContent.toString());
    } catch (err) {
        return false;
    }
    if (validateChestContent(chestContentJSON)) {
        return chestContentJSON;
    } else {
        return false;
    }
}

console.log(openChestSync("./maze/room-1/room-0"));
function validateChestContent(chestText) {
    try {
        let chestContent = readFileSync(JSON.parse(chestText).clue);
    } catch (error) {
        return false;
    }
    return true;
}

function findTreasureSync(roomPath) {
    let mazeArray = readdirSync(roomPath);
    if (isTreasure(openChestSync(roomPath))) {
        return "FOUND";
    }
    for (let elem of mazeArray) {
        //console.log(elem);
        if (openChestSync("./maze/" + elem)) {
            findTreasureSync(openChestSync("./maze/" + elem));
        }
    }
}

function isTreasure(content) {
    if (JSON.parse(content).hasOwnProperty("treasure")) {
        return true;
    }
    return false;
}

function drawMapSync(currentRoomPath) {}

// //console.log(findTreasureSync("./maze"));
// console.log(openChestSync("./maze/chest-1.json"));
// console.log(validateChestContent("./maze/room-1/room-0"));
