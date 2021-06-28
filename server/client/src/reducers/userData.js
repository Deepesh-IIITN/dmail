const initialState = {
  userVerify: false,
  email: "",
  name: "",
  sentmails: [],
  receivedmails: [],
};

const userCheck = (state = initialState, action) => {
  if (action.type === "CHECK_USER") {
    const res = action.payload;
    const userData = action.Data;
    if (res.status === 201) {
      return {
        ...state,
        userVerify: true,
        email: userData.email,
        name: userData.name,
        sentmails: userData.sentmails,
        receivedmails: userData.receivedmails,
      };
    } else if (res.state === 404) {
      return { ...state, userVerify: false };
    } else {
      return { ...state, userVerify: false };
    }
  }

  return state;
};

export default userCheck;
