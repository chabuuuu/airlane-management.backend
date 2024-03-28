import roles from "@/auth/abilities";
import BaseError from "@/utils/error/base.error";

function haveAccess(userRole: string, subject: string, action: string) {
    if (roles.hasOwnProperty(subject)) {
        if ((roles)[userRole].level < (roles)[subject].level) {
            return true;
        }
    }
    if (!roles[userRole].hasOwnProperty(subject)) {
        return false;
    }
    if ((roles)[userRole][subject].includes(action) 
    || (roles)[userRole][subject].includes('full-control')) {
        return true;
    }

    return false;
}

export const checkRole = (action: any, subject: any) => (req: any, res: any, next: any) => {
    try {        
        console.log('Role', req.user.role);
        
        const userRole: string = req.user.role || 'Anonymous';
        if (haveAccess(userRole, subject, action)) {
            next();
        } else {
            throw new BaseError(403, 'Forbidden', 'You do not have permission to access this resource')
        }

    } catch (error) {
        next(error)
    }
};
