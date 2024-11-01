import { fetchIsUserNameAvailable } from 'task2/fetchIsUserNameValid';

export const validateUserName = async (userName: string): Promise<boolean> => {
  // here we will add logic to validate user name before making a request

  return fetchIsUserNameAvailable(userName);
};
