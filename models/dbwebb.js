var cp = require("child_process");

var courseMappings = require("../")

const dbwebb = {
    inspect: function (req, res) {
        // Execute a child process, in this case "uptime".

        const command = "/usr/local/bin/dbwebb --yes inspect python kmom01 kele12";
        var child = cp.spawn(command);

        child.stdin.write('1000');

        child.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
            res.json({ data: "hej hopp" });
        });
        
        child.stdin.end();


    }
};

module.exports = dbwebb;
