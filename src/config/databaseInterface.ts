export interface DatabaseConfigInterface {
  dialect?: string;
  host: string;
  port: number;
  name?: string;
  password: string;
  username: string;
  synchronize?: boolean;
  logging: boolean;
}
