import { Staff } from "@/models/staff.model";
import { BaseRepository } from "@/repository/base/base.repository";
import { IStaffRepository } from "@/repository/interface/i.staff.repository";
import { ITYPES } from "@/types/interface.types";
import { inject } from "inversify";
import { DataSource } from "typeorm";

export class StaffRepository extends BaseRepository<Staff> implements IStaffRepository<Staff>{
    constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
        super(dataSource.getRepository(Staff));
    }
}