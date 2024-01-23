const resWS = {
    builder: {
        success: (message, data) => {
            return {
                status: "Success",
                error: {},
                message,
                data,
            };
        },
        error: (message, error) => {
            return {
                status: "Error",
                error,
                message,
                data: {},
            };
        },
    },
};

module.exports = resWS;
