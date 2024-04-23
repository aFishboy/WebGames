const GRID_SIZE = 4;
const SLOT_SIZE = 15;
const GAP = 2;
const BORDER_RADIUS = 0.75;

export default class GameBoard {
    constructor(gameBoardID) {
        gameBoardID.style.setProperty("--grid-size", GRID_SIZE);
        gameBoardID.style.setProperty("--slot-size", `${SLOT_SIZE}vmin`);
        gameBoardID.style.setProperty("--gap", `${GAP}vmin`);
        gameBoardID.style.setProperty("--border-radius", `${BORDER_RADIUS}vmin`);

        createBoardSlots(gameBoardID);
    }
}

function createBoardSlots(gameBoardID){
    const slots = [];
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; ++i){
        const slot = document.createElement("div");
        slot.classList.add("slot");
        slots.push(slot);
        gameBoardID.append(slot);
    }
}
