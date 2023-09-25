export interface DatabaseConfig {
  // Connection details
  url?: string; // Optional: Database connection URL
  type?: string; // Optional: Database type
  host: string; // Required: Database host address
  port: number; // Required: Database port number
  username: string; // Required: Database username
  password: string; // Required: Database password

  // Database name
  name?: string; // Optional: Database name (if applicable)

  // Synchronization and logging
  synchronize?: boolean; // Optional: Whether to synchronize database schema
  logging: boolean; // Required: Enable or disable database logging

  // Connection pool settings
  pool?: {
    max: number; // Required: Maximum number of connections in the pool
    min: number; // Required: Minimum number of connections in the pool
    acquire: number; // Required: Maximum time to acquire a connection (in milliseconds)
    idle: number; // Required: Maximum time a connection can be idle (in milliseconds)
  };
}
