const buts = 10;

function setup() {
    let id = 1;
    let butacas = [];

    for (let x = 0; x < buts; x++) {
        let fila = [];
        for (let z = 0; z < buts; z++) {
            const butOcupada = Math.random() < 0.2;
            fila.push({
                id: id++,
                estado: butOcupada 
            });
        }
        butacas.push(fila);
    }
    return butacas;
}

let butacas = setup();

function suggest(numButs) {
    let result = new Set();
    let found = false;

    for (let i = buts - 1; i >= 0 && !found; i--) {
        let consecutiveButs = [];
        for (let j = 0; j < buts; j++) {
            if (!butacas[i][j].estado) {
                consecutiveButs.push(butacas[i][j].id);
                if (consecutiveButs.length === numButs) {
                    result = new Set(consecutiveButs); 
                    found = true;
                }
            } else {
                consecutiveButs = [];
            }
        }
    }

    console.log("Los asientos sugeridos son: ", [...result]);
    return result;
}

function renderSeats(selectedSeats = new Set()) {
    const container = document.getElementById("seat-selection");
    container.innerHTML = ""; 

    butacas.forEach((fila) => {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row", "justify-content-center", "mb-2");

        fila.forEach(seat => {
            const seatDiv = document.createElement("div");
            seatDiv.classList.add("seat");
            if (seat.estado) {
                seatDiv.classList.add("occupied");
            }
            if (selectedSeats.has(seat.id)) {
                seatDiv.classList.add("selected");
            }
            seatDiv.textContent = seat.id;
            rowDiv.appendChild(seatDiv);
        });

        container.appendChild(rowDiv);
    });
}

document.getElementById("num-seats").addEventListener("input", function () {
    const numSeats = parseInt(this.value, 10);
    if (!isNaN(numSeats) && numSeats > 0) {
        const asientosSug = suggest(numSeats);
        renderSeats(asientosSug);
    } else {
        renderSeats();
    }
});

renderSeats();