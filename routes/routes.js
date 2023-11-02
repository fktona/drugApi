const express = require('express');
const{
    get_all_data,
} = require('../controllers/get_all_data');
const{
    filterByClassName,
    search_by_generic_name
} = require('../controllers/search_drugs');
rounter = express.Router();

rounter.get('/get_all_drugs', get_all_data);
rounter.get('/search/class_name', filterByClassName);
rounter.get('/search/generic_name', search_by_generic_name);

module.exports = rounter;
