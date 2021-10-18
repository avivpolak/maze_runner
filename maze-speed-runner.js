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

function validateChestContent(chestText) {
  try {
    let chestContent = fs.readFileSync(JSON.parse(chestText).clue);
  } catch (error) {
    return false;
  }
  return true;
}

function findTreasureSync(roomPath) {
  let mazeArray = fs.readdirSync(roomPath);
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

//console.log(findTreasureSync("./maze"));
console.log(openChestSync("./maze/chest-1.json"));
console.log(validateChestContent("./maze/room-1/room-0"));
