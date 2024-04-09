import { Subject } from "@/auth/subjects"
import { ActionAuth } from "@/enums/action.auth.enum"

let Staff_LV1 : any = {level: 0}
let Staff_LV2 : any = {level: 1}
let Customer : any = {level: 2}

//Grant permission
Staff_LV1[Subject.Airplane] = [ActionAuth.FULL_CONTROL]
Staff_LV1[Subject.SeatAirplane] = [ActionAuth.FULL_CONTROL]
Staff_LV2[Subject.SeatAirplane] = [ActionAuth.UPDATE]

const roles : any = {Staff_LV1, Staff_LV2, Customer}

export default roles


