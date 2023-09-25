export interface DatabaseConfig {
  dialect?: string;
  host: string;
  port: number;
  name?: string;
  password: string;
  username: string;
  synchronize?: boolean;
  logging: boolean;
}
