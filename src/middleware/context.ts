import { Request, Response, NextFunction } from "express";

declare global {
    namespace Express {
        interface Request {
            ripcore?: {
                tenantId: string;
                userId: string;
                dbName: string;
                userRoles: string[];
            }
        }
    }
}

export const ripcoreContext = (req: Request, res: Response, next: NextFunction) => {
  
    const tenantId = req.headers['x-tenant-id'] as string; 
    const userId =  req.headers['x-user-id'] as string; 
    const dbName =  req.headers['x-db-name'] as string; 
    const userRoles = (req.headers['x-user-roles'] as string || '').split(','); 
    
    if(!tenantId || !userId || !dbName || userRoles.length === 0){
        return res.status(401).json({ error: 'Contexto RipCore faltante. Acceso denegado.' });
    }

    req.ripcore = {
        tenantId,
        userId,
        dbName,
        userRoles
    };

    next();
};