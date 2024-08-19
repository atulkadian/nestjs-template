import { Logger } from '@nestjs/common';
import { config } from 'dotenv';
import { DbType } from 'src/common/constants';

// Init env variables into process.env
config();
const logger = new Logger('EnvConfig');

const getEnvVar = (
  name: string,
  required: boolean = true,
  asArray?: boolean,
): string | string[] | number | null => {
  const value = process.env[name];

  if (required && !value) {
    logger.error(`Unable to locate required env. variable: ${name}`);
    throw new Error(`Unable to locate required env. variable: ${name}`);
  }

  if (value && asArray) {
    return value.split(',').map((val) => val.trim());
  }

  return value || null;
};

export const Env = {
  PORT: parseInt((getEnvVar('PORT') as string) || '3000'),
  ENVIRONMENT: (getEnvVar('ENVIRONMENT') as string) || 'local',
  DISK_HEALTH_THRESHOLD:
    parseFloat(getEnvVar('DISK_HEALTH_THRESHOLD', false) as string) || 0.5,
  DATABASE: {
    DB_USER: getEnvVar('DB_USER') as string,
    DB_PASSWORD: getEnvVar('DB_PASSWORD') as string,
    DATABASE_NAME: getEnvVar('DB_NAME') as string,
    PORT: parseInt((getEnvVar('DB_PORT') as string) || '5432'),
    TYPE: getEnvVar('DB_TYPE') as DbType,
    HOST: getEnvVar('DB_HOST') as string,
    SYNC: getEnvVar('DB_SYNC', true) as string,
  },
  JWT: {
    SECRET: getEnvVar('JWT_SECRET') as string,
    EXPIRES_IN: getEnvVar('JWT_EXPIRES_IN') as string,
  },
};
