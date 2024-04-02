import { BaseController } from "@/controller/base/base.controller";
import { IStaffController } from "@/controller/interface/i.staff.controller";
import { IStaffService } from "@/service/interface/i.staff.service";
import { ITYPES } from "@/types/interface.types";
import BaseError from "@/utils/error/base.error";
import { inject } from "inversify";

export class StaffController extends BaseController implements IStaffController<any> {
    constructor(@inject(ITYPES.Service) service: IStaffService<any>) {
        super(service);
      }
    async login(req: any, res: any, next: any): Promise<any> {
        try {
            const username = req.body.username;
            const password = req.body.password;
            const result = await this.service.login(username, password);
            res.json(result);
          } catch (error) {
            next(error);
          }
    }
    async getInfoByToken(req: any, res: any, next: any): Promise<any> {
        try {
            console.log('req.user:', req.user);
            
          const staffId = req.user.staffId;
          if (!staffId) {
            throw new BaseError(400, "fail", "Staff not found");
          }
          const result = await this.service.findOne({
            where: { staffId: staffId },
          });
          res.json(result);
        } catch (error) {
          next(error);
        }
      }
      async update(req: any, res: any, next: any): Promise<any> {
        try {
            if (!req.params.id) throw new Error("Id is required")
            if (!req.body) throw new Error("Update data is required");
            const data = req.body;
            const staffId = req.params.id;
            if ((req.user.staffId !== staffId) && (req.user.role !== 'Staff_LV1')) throw new BaseError(403, 'fail', 'Forbidden');
            const result = await this.service.update({ where: { staffId: staffId }, data });
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
    async delete(req: any, res: any, next: any): Promise<any> {
        try {
            if (!req.params.id) throw new Error("Id is required");
            if (req.user.role !== 'Staff_LV1') throw new BaseError(403, 'fail', 'Forbidden');
            const id = req.params.id;
            const result = await this.service.delete({ where: { staffId: id }});
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
    async findOne(req: any, res: any, next: any): Promise<any> {
        try {
            if (!req.params.id) throw new Error("Id is required");
            if (req.user.role !== 'Staff_LV1') throw new BaseError(403, 'fail', 'Forbidden');
            const id = req.params.id;
            const result = await this.service.findOne({ where: { staffId: id }});
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}