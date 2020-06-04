const CracoLessPlugin = require("craco-less");

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    modifyVars: {
                        "@primary-color": "#78A262",
                        "@secondary-color": "#15270E",
                        "@card-padding-base": "0px",
                    },
                    javascriptEnabled: true,
                },
            },
        },
    ],
};
