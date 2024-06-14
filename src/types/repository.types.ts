import { IntermediateAirport } from "@/models/intermediate_airport.model";

const REPOSITORY_TYPES = {
    Seat: Symbol.for("Seat_Repository"),
    TicketClass: Symbol.for("TicketClass_Repository"),
    SeatFlight: Symbol.for("SeatFlight_Repository"),
    Rules: Symbol.for("Rules_Repository"),
    IntermediateAirport : Symbol.for("IntermediateAirport_Repository"),
};

export { REPOSITORY_TYPES };