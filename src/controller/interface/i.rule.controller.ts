
export interface IRuleController {
    getRules(req: any, res: any, next: any): Promise<any>;
}