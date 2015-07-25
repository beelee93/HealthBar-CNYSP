var commandToFunction = []; // conversion from name to functions
var parsedKeyBinding = [];

function bindCommandName(strName, fnFunction) {
    commandToFunction[strName.toUpperCase()]=fnFunction;
}

// converts a binding command into a parsed key binding
function bindKey(strRaw) {
    // split and trim, remove empty strings
    var processed = [];
    var sp = strRaw.split(" ");
    for (i = 0; i < sp.length; i++) {
        sp[i] = sp[i].trim();
        if (i <= 1) sp[i] = sp[i].toUpperCase();
        if (sp[i] != "") {
            processed.push(sp[i]);
        }
    }

    var pKey = new Object();
    pKey.keyCode = processed[0].charCodeAt(0);
    pKey.command = processed[1];
    processed.splice(0, 2);
    pKey.arguments = processed;
    parsedKeyBinding.push(pKey);
}

function passArguments(strCommand, arrArgs) {
    var i;
    for (i = arrArgs.length; i < 10; i++) {
        arrArgs.push(null);
    }

    if (commandToFunction[strCommand]) {
        commandToFunction[strCommand](arrArgs);
        console.log("Execute: " + strCommand + " with args " + arrArgs.toString());
    }
}

function parseIntArg(strCmd, arg) {
    var a = parseInt(arg);
    if (isNaN(a)) {
        console.log(strCmd + " : cannot parse integer argument. ");
        return NaN;
    }
    return a;
}

// Implement a command callback 
// functionName(arrArgs) { ... }
// bind the command string name to functionName