const story = {
  start: {
    text: "You awaken inside the Cyber Academy. Will you try to escape or explore?",
    choices: ["Sneak Out", "Stay and Explore", "Hide"],
    consequence: ["sneak", "stay", "hide"],
    image: "images/start.jpg"
  },
  sneak: {
    text: "You choose to sneak out. What next?",
    choices: ["Through Ducts", "Grab Keycard"],
    consequence: ["ducts", "keycard"],
    image: "images/ducts.jpg"
  },
  ducts: {
    text: "You crawl through ducts and reach the outside world. You're free!",
    choices: [], consequence: [], image: "images/ducts.jpg"
  },
  keycard: {
    text: "Security catches you with the keycard. Mission failed.",
    choices: [], consequence: [], image: "images/keycard.jpg"
  },
  stay: {
    text: "You decide to stay and look around. What will you do?",
    choices: ["Hack Terminal", "Enter Training Room"],
    consequence: ["terminal", "training"],
    image: "images/terminal.jpg"
  },
  terminal: {
    text: "You're at the terminal. Choose your hack:",
    choices: ["Disable Cameras", "Trigger Alarm"],
    consequence: ["cameras", "alarm"],
    image: "images/terminal.jpg"
  },
  cameras: {
    text: "You disable the cameras and find a safe exit.",
    choices: [], consequence: [], image: "images/terminal.jpg"
  },
  alarm: {
    text: "You triggered the alarm! You're caught.",
    choices: [], consequence: [], image: "images/alarm.jpg"
  },
  training: {
    text: "Inside the training room. What now?",
    choices: ["Talk to Mentor", "Steal USB"],
    consequence: ["mentor", "usb"],
    image: "images/mentor.jpg"
  },
  mentor: {
    text: "You join the Cyber Academy willingly.",
    choices: [], consequence: [], image: "images/mentor.jpg"
  },
  usb: {
    text: "You steal the USB. You're now on the run.",
    choices: [], consequence: [], image: "images/usb.jpg"
  },
  hide: {
    text: "You find a place to hide. Choose wisely.",
    choices: ["In Locker", "In Server Room"],
    consequence: ["locker", "server"],
    image: "images/locker.jpg"
  },
  locker: {
    text: "You get stuck inside a locker. No escape.",
    choices: [], consequence: [], image: "images/locker.jpg"
  },
  server: {
    text: "Techs find you in the server room. They give you another chance.",
    choices: [], consequence: [], image: "images/server.jpg"
  }
};

let currentStage = "start";

function startGame() {
  currentStage = "start";
  updatePage();
}

function updatePage() {
  const stage = story[currentStage];
  document.getElementById("story").textContent = stage.text;
  document.getElementById("storyImage").src = stage.image;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  stage.choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => {
      currentStage = stage.consequence[index];
      if (story[currentStage].choices.length === 0) {
        endGame();
      } else {
        updatePage();
      }
    };
    choicesDiv.appendChild(btn);
  });
}

function endGame() {
  const stage = story[currentStage];
  document.getElementById("story").textContent = stage.text;
  document.getElementById("storyImage").src = stage.image;
  document.getElementById("choices").innerHTML = "";
}

// Addendum Toggle
document.getElementById("addendumButton").addEventListener("click", function() {
  const addendum = document.getElementById("addendum");
  addendum.classList.toggle("hidden");
});

window.onload = startGame;
