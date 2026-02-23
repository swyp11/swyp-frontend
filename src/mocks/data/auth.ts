import type { TokenResponse } from '@/types/auth';
import type { UserResponse } from '@/types/user';

export const mockToken: TokenResponse = {
  accessToken: 'mock-jwt-access-token-abcdef123456',
  expiresIn: 3600,
  tokenType: 'Bearer',
};

export const mockUser: UserResponse = {
  id: 1,
  userId: 'test@example.com',
  nickname: '테스트유저',
  birth: '1995-05-15',
  weddingDate: '2026-06-20',
  email: 'test@example.com',
  auth: 'USER',
  weddingRole: 'BRIDE',
  phoneNumber: '010-1234-5678',
  address: '서울시 강남구',
};
