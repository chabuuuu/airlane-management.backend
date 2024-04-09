import { IBaseController } from "@/controller/interface/i.base.controller";

export interface ICustomerController<T> extends IBaseController<T>{
    login(req: any, res: any, next: any): Promise<any>
    getInfoByToken(req: any, res: any, next: any): Promise<any>
    sendVertificationEmail(req: any, res: any, next: any): Promise<any>
    verifyEmailToken(req: any, res: any, next: any): Promise<any>
    loginWithGoogle(req: any, res: any, next: any): Promise<any>
    loginWithGoogleCallback(req: any, res: any, next: any): Promise<any>
    uploadProfilePicture(req: any, res: any, next: any): Promise<any>
}