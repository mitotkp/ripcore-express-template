import Router from 'express';
import { getTenantConnection } from '../utils/db';

const router = Router();

/**
 * @openapi
 * /items:
 * get:
 * summary: Obtiene items del tenant actual
 * responses:
 * 200:
 * description: Lista de items
 */

router.get('/', async (req, res) => {
    try {
        const { dbName, userId } = req.ripcore;

        console.log(`Usuario ${userId} solicitando items de ${dbName}`);

        const pool = await getTenantConnection(dbName);

        const result = await pool.query('SELECT * FROM items');

        res.json(result.recordset);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener items' });
    }
})

export default router;
