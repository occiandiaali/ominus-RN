export type AuthData = {
  email: string;
  username: string;
  profilePicUrl: string;
};

const signIn = (email: string, _password: string): Promise<AuthData> => {
  // mock API call
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        email: email,
        username: 'occian46',
        profilePicUrl:
          'https://images.pexels.com/photos/1961183/pexels-photo-1961183.jpeg?auto=compress&cs=tinysrgb&w=400',
      });
    }, 1000);
  });
};

export const authService = {signIn};
