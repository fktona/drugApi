const fs = require('fs').promises;
const path = require('path');


const filterByClassName = async (req, res) => {
    try {

        const { drugclass } = req.query;
        const formattedDrugClass = drugclass.replace(/\s+/g, '').toLowerCase();

        if (!drugclass) {
            res.status(400).json({ error: 'Missing required parameter: drugclass' });
            return;
        }

        const filePath = path.join(__dirname, '../drugs.json');
        const data = await fs.readFile(filePath, 'utf8');
        const drugsData = JSON.parse(data);

    
        const filteredDrugs =  drugsData[formattedDrugClass]
        if(filteredDrugs){
        res.status(200).json({ message: 'data fetched successfully' , data: filteredDrugs});
    }else {
        res.status(500).json({ message: 'not available or has not been added yet '})
        return
        
    }
    } catch (error) {
        if (error.code === 'ENOENT') {
            res.status(404).json({ error: 'File not found' });
        } else if (error instanceof SyntaxError) {
            res.status(500).json({ error: 'Error parsing JSON' });
        } else {
            res.status(500).json({ error: 'Internal Server Error', err: error.message });
        }
    }
};

const search_by_generic_name = async(req, res) => {
    try{
    const { generic_name } = req.query;
    const formattedGenericName = generic_name.replace(/\s+/g, '').toLowerCase();
    if (!generic_name) {
        res.status(400).json({ error: 'Missing required parameter: generic_name' });
        return;
    }
    const filePath = path.join(__dirname, '../drugs.json');
    const data = await fs.readFile(filePath, 'utf8');
    const drugsData = JSON.parse(data);
    const filteredDrugs = Object.keys(drugsData)
      .filter((key) => drugsData[key])
      .map(key => drugsData[key]);
     const serchedKey = filteredDrugs.find(arr => arr.some(item => item.generic_name.toLowerCase() === formattedGenericName));
     const searchDrugs = serchedKey?.filter(drug => drug.generic_name.toLowerCase() == formattedGenericName) 
    if(searchDrugs?.length > 0){
        res.status(200).json(searchDrugs)
    }
    else {
        res.status(500).json({ message: 'not available or has not been added yet '})
        return
        
    }    
} catch (error) {
    if (error.code === 'ENOENT') {
        res.status(404).json({ error: 'File not found' });
    } else if (error instanceof SyntaxError) {
        res.status(500).json({ error: 'Error parsing JSON' });
    } else {
        res.status(500).json({ error: 'Internal Server Error', err: error.message });
    }
}
}

module.exports = { filterByClassName ,
                   search_by_generic_name };





