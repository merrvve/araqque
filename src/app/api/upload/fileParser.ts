
const officeParser = require('officeparser');




export async function extractText(buffer: Buffer) : Promise<any> {
    return officeParser.parseOfficeAsync(buffer);
    
    
}



