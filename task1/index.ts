import { fetchIsUserNameAvailable } from './fetchIsUserNameValid';

export const validateUserName = async (userName: string): Promise<boolean> => {
  if (!/^[a-zA-Z][0-9a-zA-Z]{2,}$/.test(userName)) {
    return false;
  }

  try {
    return await fetchIsUserNameAvailable(userName);
  } catch (e) {
    return false;
  }
};
