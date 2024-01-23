function createEvent(event = "", controller = () => {}, logger = () => {}) {
    return {
        event,
        controller,
        logger,
    };
}

module.exports = [
    createEvent(
        "/test",
        () => {
            console.log("HELLO_TESTING");
        },
        () => {
            console.log("HELLO_LOGGER_TESTING_!@#");
        }
    ),
];
