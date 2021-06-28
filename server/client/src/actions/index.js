export const InputHandel = (e) => {
  return {
    type: "FORM_DATA",
    event: e,
  };
};

export const submitRegisterData = (e, setLoading) => {
  return {
    type: "Submit_Data",
    event: e,
    setLoading,
  };
};
