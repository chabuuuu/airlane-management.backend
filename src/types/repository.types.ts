import { AirportRule } from "@/models/airport-rule.model";
import { Seat } from "@/models/seat.model";

const REPOSITORY_TYPES = {
    Seat: Symbol.for("Seat_Repository"),
    TicketClass: Symbol.for("TicketClass_Repository"),
    SeatFlight: Symbol.for("SeatFlight_Repository"),
    AirportRule : Symbol.for("AirportRule_Repository"),
    BookingRule: Symbol.for("BookingRule_Repository"),
};

export { REPOSITORY_TYPES };