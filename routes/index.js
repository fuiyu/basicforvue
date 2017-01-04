const express = require("express");
// const app = express();
const router = express.Router();

function getRoutes(app) {
    function useRoute(name) {
        const rt = require('./' + name)
        app.use('/' + name, rt)
    };
    ['user'].forEach(useRoute)
}


exports.router = getRoutes