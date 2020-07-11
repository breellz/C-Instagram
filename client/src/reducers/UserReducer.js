export const initialState = null;

const UserReducer = (state, action) => {
  if (action.type === 'USER') {
    return action.payload;
  }
  if (action.type === 'CLEAR') {
    return null;
  }
  if (action.type === 'UPDATE_PIC') {
    return {
      ...state,
      profilePicture: action.payload
    };
  }
  if (action.type === 'UPDATE') {
    return {
      ...state,
      followers: action.payload.followers,
      following: action.payload.following
    };
  }
  return state;
};

export default UserReducer;
