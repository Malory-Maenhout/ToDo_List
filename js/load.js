import { getDatas } from "../service/fetch.js";

const load = document.getElementById('idLoad');

load.addEventListener('click', function() {
    getDatas();
});