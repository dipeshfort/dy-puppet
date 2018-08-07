const config = require('./config.json');
const {
    spawn
} = require('child_process');

document.querySelector('#start-auth').addEventListener('click', () => {
    buildService('dna-service-authentication');
});
document.querySelector('#stop-auth').addEventListener('click', () => {
    stopService('dna-service-authentication');
});

document.querySelector('#start-redis').addEventListener('click', () => {
    buildService('dna-cache');
});
document.querySelector('#stop-redis').addEventListener('click', () => {
    stopService('dna-cache');
});


// Show status
document.querySelector('#service-status').addEventListener('click', () => {
    clearConsole();
    runCommand('docker-compose', ['ps']);
});

function buildService(service) {
    runCommand('docker-compose', ['up', '-d', service])
}

function stopService(service) {
    runCommand('docker-compose', ['stop', service]);
}

function runCommand(command, args) {
    const child = spawn(command, args);
    child.stdout.on('data', (data) => {
        const response = data.toString().trim();
        if (response) {
            console.log("OUT", response);
            printConsole(response);
        }
    });
    
    child.stderr.on('data', (data) => {
        const response = data.toString().trim();
        if (response) {
            console.log("ERR", response);
            printConsole(response);
        }
    });
}

function clearConsole() {
    const el = document.querySelector("#console-output > code");
    el.innerHTML = '';
}
function printConsole(message) {
    const el =document.querySelector("#console-output > code");
    const wrapper = document.createElement('pre');
    wrapper.innerHTML = message;
    el.appendChild(wrapper);
}