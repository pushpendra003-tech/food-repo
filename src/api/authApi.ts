import { api } from './apiClient';

interface SendOtpPayload {
  phone: string;
  action: 'login' | 'signup';
}

interface VerifyOtpPayload {
  phone: string;
  otp: string;
  name?: string;
  role?: 'user' | 'owner' | 'delivery';
}

interface AuthResponse {
  success: boolean;
  token?: string;
  user: {
    id: string;
    name: string;
    phone: string;
    role: string;
  };
}

export const authApi = {
  sendOtp: async (payload: SendOtpPayload) => {
    const response = await api.post('/auth/send-otp', payload);
    return response.data;
  },

  verifyOtp: async (payload: VerifyOtpPayload): Promise<AuthResponse> => {
    const response = await api.post('/auth/verify-otp', payload);
    return response.data;
  }
};
