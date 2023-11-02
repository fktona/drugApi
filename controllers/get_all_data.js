const fs = require('fs');
const path = require('path');

const get_all_data = async (req, res) => {  
    const filePath = path.join(__dirname, '../drugs.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error', err: err.message });
            return;
        }
        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseError) {
            res.status(500).json({ error: 'Error parsing JSON' });
        }
    });
};

module.exports = { get_all_data };
