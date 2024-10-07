export interface IJwtPayload {
  iss: string;
  sub: string;
  aud: string[];
  email: string; // User's email
  iat: number; // Issued at time
  exp: number; // Issuer
  azp: string; // JWT ID
  scope: string; // Original JWT ID
}
