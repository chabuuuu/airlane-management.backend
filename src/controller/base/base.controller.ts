import { IBaseController } from "@/controller/interface/i.base.controller";
import { injectable } from "inversify";


@injectable()
export class BaseController implements IBaseController<any>{
    protected service: any;
    public constructor(
        service: any
    ) {
        this.service = service;
    }
    async findOne(req: any, res: any, next: any): Promise<any> {
        try {
            if (!req.params.id) throw new Error("Id is required");
            const id = req.params.id;
            const result = await this.service.findOne({ where: { id: id }});
            res.json(result);
        } catch (error) {
            next(error);
        }

    }
    async findAll(req: any, res: any, next: any): Promise<any> {
        try {
            let skip 
            let take
            let {page} = req.query;
            if (page) {
                page = Number(page);
                skip = (page - 1) * 10;
                take = 10;
              }
            const totalRecords = await this.service.count();
            const result = await this.service.findAll({
                skip,
                take
            });
            res.json({
                data: result,
                dataTotal: result.length,
                page: page || 1,
                perPage: 10,
                pageTotal: Math.ceil(totalRecords / 10),
              });
        } catch (error) {
            next(error)
        }
    }
    async create(req: any, res: any, next: any): Promise<any> {
        try {
            if (!req.body) throw new Error("Data is required");
            const data = req.body;
            const result = await this.service.create({data});
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
            const id = req.params.id;
            const result = await this.service.update({ where: { id: id }, data });
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
    async delete(req: any, res: any, next: any): Promise<any> {
        try {
            if (!req.params.id) throw new Error("Id is required");
            const id = req.params.id;
            const result = await this.service.delete({ where: { id: id }});
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}