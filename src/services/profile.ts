import { axios } from 'utils/axios';
import { UserProfile, Res } from 'types';
import { API_ENDPOINT } from 'config/common';

export const getUserProfile = async (walletAddress?: string): Promise<UserProfile> => {
  try {
    const { data } = await axios.post<Res<UserProfile>>(API_ENDPOINT, {
      jsonrpc: '2.0',
      method: 'vmp_getProfile',
      params: { walletAddress },
      id: 1,
    });
    return data.result?.data ?? undefined;
  } catch (error) {
    return Promise.reject(error);
  }
};
