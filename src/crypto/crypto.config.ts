export type CipherGCMTypes = 'aes-128-gcm' | 'aes-192-gcm' | 'aes-256-gcm';
export type CryptoConfigType = {
  secret: string;
  algorithm: CipherGCMTypes;
};

export const CryptoDefaultConfig: CryptoConfigType = {
  secret: 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3',
  algorithm: 'aes-256-gcm',
};
