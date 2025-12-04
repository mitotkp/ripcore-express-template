import { Router } from 'express';
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
    // 1. Obtener contexto
    const { dbName, userId } = req.ripcore;
    
    console.log(`Usuario ${userId} solicitando items de ${dbName}`);

    // 2. Obtener conexión
    const pool = await getTenantConnection(dbName);

    // 3. Consultar (Asegúrate de que la tabla Items exista en tu BD de prueba)
    const result = await pool.request().query('SELECT TOP 10 * FROM Items');

    res.json(result.recordset);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;