export const initialState = null;

const UserReducer = (state, action) => {
  if (action.type === 'USER') {
    return action.payload;
  }
  if (action.type === 'CLEAR') {
    return null;
  }
  return state;
};

export default UserReducer;
