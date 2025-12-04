import sql from 'mssql';

const dbConfig = {
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || '123456',
    server: process.env.DB_SERVER || 'localhost',
    database: process.env.DB_DATABASE || 'master',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

const connectionsPool = new Map<string, sql.ConnectionPool>();

export const getTenantConnection = async (dbName: string): Promise<sql.ConnectionPool> => {
    if (!dbName) throw new Error('Nombre de base de datos no especificado en el contexto.');
    
    if (connectionsPool.has(dbName)) {
        const pool = connectionsPool.get(dbName); 
        if (pool?.connected) return pool;
    }

    const config = {
        ...dbConfig,
        database: dbName
    };

    try{
        const pool = await new sql.ConnectionPool(config).connect();
        connectionsPool.set(dbName, pool);
        console.log(`Conectado a BD Tenant: ${dbName}`);
        return pool;
    }catch(error){
        console.error(`Error conectando a ${dbName}:`, error);
    throw error;
    }
};