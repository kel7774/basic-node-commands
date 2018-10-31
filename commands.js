const fs = require('fs');

function done(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}

function evaluateCmd(userInput) {
    const userInputArray = userInput.split(" ");
    const command = userInputArray[0];
    switch(command) {
        case "echo":
            commandLibrary.echo(userInputArray.slice(1).join(" "));
            break;
        case "cat":
            commandLibrary.cat(userInputArray.slice(1));
            break;
        default: 
            commandLibrary.errorHandler(command); 
            break; 
        }
}

const commandLibrary = {
    "echo": function(userInput) {
        done(userInput);
    },
    "cat": function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if(err) throw err;
            done(data);
        });
    },
    "errorHandler": function(userInput) {
        let errorMessage = `${userInput} is not a valid command.`;
        done(errorMessage);
    }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;