export const JWT_CONFIG = {
  ACCESS_EXPIRES: process.env.ACCESS_EXPIRES_IN || '15m',
  REFRESH_EXPIRES: process.env.REFRESH_EXPIRES_IN || '30d',
}
