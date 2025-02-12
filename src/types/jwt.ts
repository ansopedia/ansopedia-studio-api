import { z } from "zod";

export const jwtAccessTokenSchema = z.object({
  userId: z.string(),
  permissions: z.array(z.string()),
  tokenVersion: z.number(),
  issuedAt: z.number(),
  issuer: z.string(),
  audience: z.string(),
});

export type JwtAccessToken = z.infer<typeof jwtAccessTokenSchema>;

export interface JwtPayload {
  userId: string;
  iat?: number;
  exp?: number;
}

export interface TokenValidationResult {
  isValid: boolean;
  payload?: JwtPayload;
  error?: string;
}
