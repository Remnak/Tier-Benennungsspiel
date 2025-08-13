
const tiere = {
  leicht: [
    { datei: "katze.jpg", name: "KATZE" },
    { datei: "hund.jpg", name: "HUND" },
    { datei: "fuchs.jpg", name: "FUCHS" },
    { datei: "Wolf.jpg", name: "WOLF" },
    { datei: "Schwan.jpg", name: "SCHWAN" },
    { datei: "Hirsch.jpg", name: "HIRSCH" },
  ],
  mittel: [
    { datei: "elefant.jpg", name: "ELEFANT" },
    { datei: "giraffe.jpg", name: "GIRAFFE" },
    { datei: "hirsch.jpg", name: "HIRSCH" },
    { datei: "Delfin.jpg", name: "DELFIN" },
    { datei: "Zebra.jpg", name: "ZEBRA" },
  ],
  schwer: [
    { datei: "erdmännchen.jpg", name: "ERDMÄNNCHEN" },
    { datei: "eichhörnchen.jpg", name: "EICHHÖRNCHEN" },
    { datei: "nashorn.jpg", name: "NASHORN" },
    { datei: "elefant.jpg", name: "ELEFANT" },
  ]
};



let aktuellesLevel = 0;

function startGame() {
  document.getElementById("startseite").style.display = "none";
  document.getElementById("spielbereich").style.display = "block";
  aktuellesLevel = 0;
  erstelleLevel(tiere[aktuellesLevel]);
}

function erstelleLevel(tier) {
  const name = tier.name.toUpperCase();
  const bild = tier.datei;

  document.getElementById("tierbild").src = "bilder/" + bild;

  const wortfeld = document.getElementById("wortfeld");
  wortfeld.innerHTML = "";

  for (let i = 0; i < name.length; i++) {
    const slot = document.createElement("div");
    slot.className = "buchstabe-slot";
    if (i === 0) {
      slot.innerText = name[0];
    } else {
      slot.ondrop = drop;
      slot.ondragover = allowDrop;
    }
    wortfeld.appendChild(slot);
  }

  const buchstabenbank = document.querySelector(".buchstabenbank");
  buchstabenbank.innerHTML = "";

  const richtige = name.slice(1).split("");
  const falsche = ["X", "Q", "W", "B", "M", "L", "O", "U"];
  const gemischt = mischeArray([...richtige, ...falsche.slice(0, richtige.length)]);

  gemischt.forEach((buchstabe, index) => {
    const div = document.createElement("div");
    div.className = "buchstabe";
    div.innerText = buchstabe;
    div.draggable = true;
    div.id = "buchstabe" + index;
    div.ondragstart = drag;
    buchstabenbank.appendChild(div);
  });
}

function mischeArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const draggedId = ev.dataTransfer.getData("text");
  const draggedElement = document.getElementById(draggedId);
  if (!draggedElement) return;

  const zielSlot = ev.target;

  // Wenn bereits ein Buchstabe im Slot ist, gib ihn zurück in die Bank
  const vorhandenerBuchstabe = zielSlot.innerText.trim();
  if (vorhandenerBuchstabe !== "") {
    const zurückElement = Array.from(document.querySelectorAll(".buchstabe"))
      .find(el => el.innerText === vorhandenerBuchstabe && el.style.visibility === "hidden");
    if (zurückElement) {
      zurückElement.style.visibility = "visible";
    }
  }

  // Setze neuen Buchstaben in den Slot
  zielSlot.innerText = draggedElement.innerText;
  draggedElement.style.visibility = "hidden";

  checkWord();
}



function checkWord() {
  const slots = document.querySelectorAll('.buchstabe-slot');
  const name = tiere[aktuellesLevel].name.toUpperCase();

  slots.forEach((slot, index) => {
    const buchstabe = slot.innerText.trim();
    if (index < name.length) {
      if (buchstabe === name[index]) {
        slot.style.backgroundColor = "#90ee90";
      } else if (buchstabe !== "") {
        slot.style.backgroundColor = "#ffcccb";
      } else {
        slot.style.backgroundColor = "#f0f0f0";
      }
    }
  });
}

function resetLevel() {
  const slots = document.querySelectorAll('.buchstabe-slot');
  slots.forEach((slot, index) => {
    if (index > 0) {
      slot.innerText = "";
      slot.style.backgroundColor = "#f0f0f0";
    }
  });
  const buchstaben = document.querySelectorAll('.buchstabe');
  buchstaben.forEach(b => b.style.visibility = "visible");
}

function naechstesLevel() {
  aktuellesLevel++;
  if (aktuellesLevel >= ausgewaehlteTiere.length) {
    aktuellesLevel = 0;
  }
  erstelleLevel(ausgewaehlteTiere[aktuellesLevel]);
}


function zeigeLevelAuswahl() {
  document.getElementById("startseite").style.display = "none";
  document.getElementById("levelauswahl").style.display = "block";
}

let ausgewaehlteTiere = [];

function levelStarten(levelName) {
  ausgewaehlteTiere = levelTiere[levelName];
  aktuellesLevel = 0;
  document.getElementById("levelauswahl").style.display = "none";
  document.getElementById("spielbereich").style.display = "block";
  erstelleLevel(ausgewaehlteTiere[aktuellesLevel]);
}
