import { BaseController } from "@/controller/base/base.controller";
import { ITicketClassController } from "@/controller/interface/i.ticket-class.controller";
import { TicketClass } from "@/models/ticket_class.model";
import { ITicketClassService } from "@/service/interface/i.ticket-class.service";
import { ITYPES } from "@/types/interface.types";
import { inject, injectable } from "inversify";

@injectable()
export class TicketClassController
  extends BaseController
  implements ITicketClassController<TicketClass>
{
  constructor(
    @inject(ITYPES.Service) service: ITicketClassService<TicketClass>
  ) {
    super(service);
  }

  async update(req: any, res: any, next: any): Promise<any> {
    try {
      if (!req.params.className) throw new Error("Id is required");
      if (!req.body) throw new Error("Update data is required");
      const data = req.body;
      const className = req.params.className;
      const result = await this.service.update({
        where: { className: className },
        data,
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: any, res: any, next: any): Promise<any> {
    try {
      if (!req.params.className) throw new Error("Id is required");
      const className = req.params.className;
      const result = await this.service.delete({
        where: { className: className },
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
