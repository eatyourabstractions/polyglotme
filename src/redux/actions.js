

export const updateLevelProgress = (level) => ({
    type: "UPDATE_LEVEL_PROGRESS",
    level,
  });

 export const dataReceived = () => ({
     type: "DATA_RECEIVED",
  });


  export const setCurrentUser = (userState) => ({
    type: "SET_CURRENT_USER",
    userState,
 });

 export const logout = () => ({
  type: "LOGOUT",
});

export const updateCurrentUser = (data) => ({
  type: "UPDATE_CURRENT_USER",
  data,
});

export const setLastUpdatedLevel = (data) => ({
  type: "SET_LAST_UPDATED_LEVEL",
  data,
});

export const synchronize = (data) => ({
  type: "SYNCHRONIZE",
  data,
});



