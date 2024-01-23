const { appName, NODE_ENV, PORT, apiURI } = require("../app.config");

const initTerminal = () => {
    // console.clear();
    console.log(`\n\n::🔥 ${appName}'s Terminal ⚡::\n`);
    console.log(` ## App ::\t\t ${appName}`);
    console.log(` ## PORT ::\t\t ${PORT}`);
    console.log(` ## Database:: \t\t MongoDB`);
    console.log(` ## Environment :: \t ${NODE_ENV}`);
    console.log(` ## API URI :: \t\t ${apiURI}\n`);
};

const clear = () => {
    console.clear();
};

module.exports = {
    initTerminal,
    clear,
};
