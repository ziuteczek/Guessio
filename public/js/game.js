const board = document.querySelector("canvas");
const chat = document.querySelector(".game__chat");

let mouseClicked = false;
let color = "red";

let connectionOpened = false;

console.log("Game script loaded");



let ws = new WebSocket("/enter-game");

ws.addEventListener("open", () => {
  connectionOpened = true;
  console.log("Web socket connection opened");
});

ws.addEventListener("message", () => {
  
});

ws.addEventListener("close", () => {
  connectionOpened = false;
  console.log("Web socket connection closed");
  setInterval(() => {
    ws = new WebSocket("/enter-game");
  }, 3000);
});

const ctx = board.getContext("2d");

board.addEventListener("mousedown", (e) => {
  const mousePosX = e.clientX - board.offsetLeft;
  const mousePosY = e.clientY - board.offsetTop;

  ctx.beginPath();
  ctx.moveTo(mousePosX, mousePosY);

  mouseClicked = true;
});

board.addEventListener("mouseup", () => {
  mouseClicked = false;
});

board.addEventListener("mousemove", async (e) => {
  if (!mouseClicked) {
    return;
  }

  const mousePosX = e.clientX - board.offsetLeft;
  const mousePosY = e.clientY - board.offsetTop;

  ctx.lineTo(mousePosX, mousePosY);
  ctx.stroke();

  const boardBlob = await getBoardBlob();

  const boardDataObj = {
    type: "board update",
    time: new Date().getTime(),
    boardBlob: await boardBlob.text(),
  };

  ws.send(JSON.stringify(boardDataObj));
});

async function joinGame(nick, gameCode) {
  const { userID, gameID } = await createUser(nick, gameCode);

  if (userID === undefined || gameID === undefined) {
    return;
  }
}
