export type JwtPayload = {
  type: 'signup' | 'storeInvite' | 'resetPassword';
  email: string;
  storeId?: string;
};
