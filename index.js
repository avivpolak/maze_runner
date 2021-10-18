const fs = require("fs");
const path = require("path");
function findTreasureSync(roomPath, mazeArray, counter) {
  let nextRoom = openChestSync(roomPath + `/chest-${counter + 1}.json`);
  if (JSON.parse(nextRoom).hasOwnProperty("treasure")) {
    return "FOUND";
  }
  if (counter === mazeArray.length - 1) {
    return "Max";
  }
  if (nextRoom === false) {
    findTreasureSync(mazeArray[counter], mazeArray, counter++);
  } else {
    let roomArray = fs.readdirSync(nextRoom);
    findTreasureSync(nextRoom, roomArray, 0);
  }
}

function openChestSync(chestPath) {
  let chestContentJSON = "";
  try {
    let chestContent = fs.readFileSync(chestPath);
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
function drawMapSync(currentRoomPath) {}

// ====================================
// ========= Extra Functions ==========
// ====================================
function validateChestContent(chestText) {
  try {
    let chestContent = fs.readFileSync(chestText);
  } catch (error) {
    return false;
  }
  return true;
}

function main(roomPath) {
  let mazeArray = fs.readdirSync(roomPath);
  console.log(openChestSync("./maze/room-2/room-0/"));
  findTreasureSync(mazeArray[0], mazeArray, 0);
}

main("./maze");
