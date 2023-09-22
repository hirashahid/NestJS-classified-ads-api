export interface DatabaseConfig {
  url?: string;
  type?: string;
  host?: string;
  port?: number;
  password?: string;
  name?: string;
  username?: string;
  synchronize?: boolean;
  logging: boolean;
  pool?: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
}
