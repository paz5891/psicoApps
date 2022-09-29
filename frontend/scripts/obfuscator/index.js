const fs = require('fs');
const path = require('path');
var JavaScriptObfuscator = require('javascript-obfuscator');
let dir = path.join(__dirname, '..', '..', 'build', 'static', 'js');
var seed = getRandomArbitrary(100000, 999999);

fs.readdir(dir, function (err, archivos) {
    if (err) {
        onError(err);
        return;
    }
    archivos.forEach(e => {
        if (e.split('.')[4] == 'map') {
            fs.unlinkSync(path.join(dir, e));
        } else if (e.split('.')[0] == 'main' && e.split('.')[3] == 'js') {
            let document = fs.readFileSync(path.join(dir, e), 'utf8');
            var obfuscationResult = JavaScriptObfuscator.obfuscate(`${document}`,
                {
                    compact: true,
                    controlFlowFlattening: true,
                    controlFlowFlatteningThreshold: 1,
                    numbersToExpressions: true,
                    simplify: true,
                    shuffleStringArray: true,
                    splitStrings: true,
                    stringArrayThreshold: 1,
                    stringArrayEncoding: ['base64'],
                    seed
                }
            );
            fs.unlinkSync(path.join(dir, e));
            fs.writeFileSync(path.join(dir, e), obfuscationResult.getObfuscatedCode());
        }
    });
});

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}