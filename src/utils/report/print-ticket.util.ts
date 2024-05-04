import axios from "axios";
const REPORT_SERVER = process.env.REPORT_SERVER || 'http://localhost:3000';

export async function printTicketUtil (payload: {
    //Ticket id
    code: string,
    classType: string,
    passengerName: string,
    flightCode: string,
    originCity: string,    
    destinationCity: string,
    boardingHour: string,
    flightHour: string,
    seat: string,
    airlines: string,
    price: string,
    dateDeparture: string,
}){
    try {
        const pdf = await axios.post(`${REPORT_SERVER}/api/report`, {
            template: { "name" : "main" },
            data: {
                ticket: payload
            }
        }, {responseType: 'arraybuffer'})
        var fs = require('fs');
        const path = `./storage/pdf/ticket/${payload.code}.pdf`;
        fs.writeFileSync(path, pdf.data);
        return path;  
    } catch (error) {
        console.log("Error: ", error);
        
        throw error;
    }
 
}