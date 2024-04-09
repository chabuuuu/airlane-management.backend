import { MAX_TOTAL_SEATS } from "@/constants/total-seat.constants";
import { SeatClass } from "@/enums/seat-class.enum";
import { ISeatAirplaneRepository } from "@/repository/interface/i.seat-airplane.repository";
import { ISeatRepository } from "@/repository/interface/i.seat.repository";
import { BaseService } from "@/service/base/base.service";
import { ISeatAirplaneService } from "@/service/interface/i.seat-airplane.service";
import { ITYPES } from "@/types/interface.types";
import { REPOSITORY_TYPES } from "@/types/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export class SeatAirplaneService extends BaseService implements ISeatAirplaneService<any>{
    private seatRepository : ISeatRepository<any>;
    constructor(@inject(ITYPES.Repository) repository: ISeatAirplaneRepository<any>,
    @inject(REPOSITORY_TYPES.Seat) seatRepository: ISeatRepository<any>
    ) {
        super(repository);
        this.seatRepository = seatRepository;
    }
    async updateSeatClass(airplaneId: string, total_seat: number, total_business_seat: number, total_economy_seat: number): Promise<any> {
        try {
            const allSeatsId = await this.seatRepository._findAll({
                order: {
                    seat_index: 'ASC'
                }
            });
            for (let i = 0; i < total_economy_seat; i++){
                let seatId = allSeatsId[i].seatId;
                await this.repository._update({
                    where: {
                        airplaneId: airplaneId,
                        seatId: seatId
                    },
                    data: {class: SeatClass.ECONOMY, isAvailable: true}
                });
            }
            for (let i = total_economy_seat; i < total_seat; i++){
                let seatId = allSeatsId[i].seatId;
                await this.repository._update({
                    where: {
                        airplaneId: airplaneId,
                        seatId: seatId
                    },
                    data: {class: SeatClass.BUSINESS, isAvailable: true}});
            }
            for (let i = total_seat; i < MAX_TOTAL_SEATS; i++){
                let seatId = allSeatsId[i].seatId;
                await this.repository._update({
                    where: {
                        airplaneId: airplaneId,
                        seatId: seatId
                    },
                    data: {isAvailable: false}
                });
            }
        } catch (error) {
            throw error;
        }

    }
    async generateSeatForAirplane(airplaneId: string, total_seats: number, total_business_seat: number): Promise<any> {
        try {
            const total_economy_seat = total_seats - total_business_seat;
            const allSeatsId = await this.seatRepository._findAll({
                order: {
                    seat_index: 'ASC'
                }
            });
            let count = 0;
            for (let i = 0; i < total_economy_seat; i++){
                let seatId = allSeatsId[i].seatId;
                await this.repository._create({data: {seatId, airplaneId, class: SeatClass.ECONOMY, isAvailable: true}});
            }
            for (let i = total_economy_seat; i < total_seats; i++){
                let seatId = allSeatsId[i].seatId;
                await this.repository._create({data: {seatId, airplaneId, class: SeatClass.BUSINESS, isAvailable: true}});
            }
            for (let i = total_seats; i < MAX_TOTAL_SEATS; i++){
                let seatId = allSeatsId[i].seatId;
                await this.repository._create({data: {seatId, airplaneId}});
            }
            console.log('Success generate seat for airplane');
            return;
        } catch (error) {
            throw error;
        }
    }
}