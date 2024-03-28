import { IBaseService } from "@/service/interface/i.base.service";

export interface ICustomerService<T> extends IBaseService<T>{
    login(params: any): Promise<any>
    findOneIncludePassword(params: any): Promise<any>
    sendVertificationEmail(email: string): Promise<any>
    verifyEmailToken(email: string, token: string): Promise<any>
    loginWithGoogle(): Promise<any>
    loginWithGoogleCallback(params: any): Promise<any>
}