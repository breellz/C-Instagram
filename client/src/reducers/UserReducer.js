export const initialState = null;

const UserReducer = (state, action) => {
  if (action.type === 'USER') {
    return action.payload;
  }
  return state;
};

export default UserReducer;
