import { Router } from 'express';

const router = Router();

/**
 * @openapi
 * /health:
 * get:
 * summary: Health check del módulo
 * description: Endpoint utilizado por el Deployer para verificar que el contenedor inició correctamente.
 * responses:
 * 200:
 * description: El módulo está vivo
 */
router.get('/', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

export default router;