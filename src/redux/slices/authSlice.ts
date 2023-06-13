import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isSignedIn: false,
  email: '',
  userName: '',
};

const authSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setSignIn: (state, action) => {
      state.email = action.payload.email;
      state.userName = action.payload.userName;
      state.isSignedIn = action.payload.isSignedIn;
    },
    setSignOut: state => {
      state.email = '';
      state.userName = '';
      state.isSignedIn = false;
    },
  },
});

export const {setSignIn, setSignOut} = authSlice.actions;

export const selectIsSignedIn = (state: {userAuth: {isSignedIn: boolean}}) =>
  state.userAuth.isSignedIn;
export const selectEmail = (state: {userAuth: {email: string}}) =>
  state.userAuth.email;
export const selectUserName = (state: {userAuth: {userName: string}}) =>
  state.userAuth.userName;

export default authSlice.reducer;
