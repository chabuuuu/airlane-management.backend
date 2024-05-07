import accountRouter from "@/routes/account/account.route";
import airplaneRouter from "@/routes/airplane/airplane.route";
import airportRouter from "@/routes/airport/airport.route";
import bookingRouter from "@/routes/booking/booking.route";
import customerRouter from "@/routes/customer/customer.route";
import flightRouter from "@/routes/flight/flight.route";
import roleRouter from "@/routes/role/role.route";
import seatFlightRouter from "@/routes/seat-flight/seat-flight.route";
import staffRouter from "@/routes/staff/staff.route";
import ticketClassRouter from "@/routes/ticket-class/ticket-class.route";
import ticketRouter from "@/routes/ticket/ticket.route";
import BaseError from "@/utils/error/base.error";

export function route (app : any, root_api: string){
    app.use(`${root_api}/checkpoint`, (req: any, res: any, next: any)=> {
        return res.status(200).json({message: 'Server is working'})
    })
    app.use(`${root_api}/account`, accountRouter)
    app.use(`${root_api}/role`, roleRouter)
    app.use(`${root_api}/airplane`, airplaneRouter)
    app.use(`${root_api}/flight`, flightRouter)
    app.use(`${root_api}/customer`, customerRouter)
    app.use(`${root_api}/airport`, airportRouter)
    app.use(`${root_api}/ticket`, ticketRouter)
    app.use(`${root_api}/staff`, staffRouter)
    app.use(`${root_api}/seat-flight`, seatFlightRouter)
    app.use(`${root_api}/ticket-class`, ticketClassRouter)
    app.use(`${root_api}/booking`, bookingRouter)
    app.all('*', (req: any, res: any, next: any) => {
        const status = 'fail';
        const statusCode = 404;
        const err = new BaseError(statusCode, status, 'API Not Exists');
        next(err);
    });
}