// MIT License
// Copyright (c) 2020 Luis Espino

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
  }

function shouldClean() {
    return !!getRandomIntInclusive(0, 1);
}

const shouldGetDirty = shouldClean;

function reflex_agent(location, state) {
    if (state == "DIRTY" && shouldClean()) return "CLEAN";
    if (location == "A") return "RIGHT";
    if (location == "B") return "LEFT";
}
function test(states, exitStates) {
    exitStates.add(states[0] + states[1] + states[2]);

    const location = states[0];
    const state = states[0] == "A" ? states[1] : states[2];
    const action_result = reflex_agent(location, state);
    
    document.getElementById("log").innerHTML += "<br>---------------------------------------------------";
    document.getElementById("log").innerHTML += `<br>Estado { Location ${states[0]} | A ${states[1]} | B ${states[2]} }`;

    if (action_result == "CLEAN") {
        if (location == "A") states[1] = "CLEAN";
        else if (location == "B") states[2] = "CLEAN";
    }
    else if (action_result == "RIGHT") states[0] = "B";
    else if (action_result == "LEFT") states[0] = "A";

    document.getElementById("log").innerHTML += "   --   Estados únicos alcanzados: ".concat(exitStates.size);
    document.getElementById("log").innerHTML += "<br>Action: ".concat(action_result);

    if (exitStates.size == 8) {
        document.getElementById("log").innerHTML += "<br>Terminado";
    }
    else {
        if (shouldGetDirty()) {
            if (location == "A") {
                if (states[2] != "DIRTY") {
                    states[2] = "DIRTY";
                    document.getElementById("log").innerHTML += "<br>Ensuciando habitación B";
                }
            }
            else if (location == "B") {
                if (states[1] != "DIRTY") {
                    states[1] = "DIRTY";
                    document.getElementById("log").innerHTML += "<br>Ensuciando habitación A";
                }
            }
        }

        setTimeout(function(){ test(states, exitStates); }, 1000);
    }
}

const states = ["A", "DIRTY", "DIRTY"];
const exitStates = new Set();
test(states, exitStates);
