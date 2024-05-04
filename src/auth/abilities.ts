import { Subject } from "@/auth/subjects"
import { ActionAuth } from "@/enums/action.auth.enum"

let Staff_LV1 : any = {level: 0}
let Staff_LV2 : any = {level: 1}
let Customer : any = {level: 2}

//Grant permission

//Airplane
Staff_LV1[Subject.Airplane] = [ActionAuth.FULL_CONTROL]

//SeatAirplane
Staff_LV1[Subject.SeatAirplane] = [ActionAuth.FULL_CONTROL]
Staff_LV2[Subject.SeatAirplane] = [ActionAuth.UPDATE]

//Airport
Staff_LV1[Subject.Airport] = [ActionAuth.FULL_CONTROL]

//Flight
Staff_LV2[Subject.Flight] = [ActionAuth.FULL_CONTROL] //FUll control

//Booking
Staff_LV2[Subject.Booking] = [ActionAuth.FULL_CONTROL] //FUll control

const roles : any = {Staff_LV1, Staff_LV2, Customer}

export default roles


