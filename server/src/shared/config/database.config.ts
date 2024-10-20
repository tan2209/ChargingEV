
interface IDatabaseConfig {
  connectionUri: string;
  sslEnabled: boolean;
}

export const databaseConfig: IDatabaseConfig = {
  connectionUri:
    process.env.NODE_ENV === 'production'

      ? `mongodb+srv://nganptlhe160415:12345@cluster0.wwnmx21.mongodb.net/chargingdb?retryWrites=true&w=majority&appName=Cluster0`

      : process.env.MONGO_CONNECTION_URI,
  sslEnabled: process.env.MONGO_SSL_ENABLED === 'true',
};
