import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "account",
  initialState: {
    id: null,
    login: null,
    token: null,
    neonName: null,
    agoraToken: null,
    agoraChannelId: null,
    agoraId: null,
    isSuperUser: false,
    friendsList: [],
    searchUserName: false,
    searchFacebook: false,
    myVideo: false,
    myAudio: false,
    settingsTabDefault: "1",
    chatLink: null
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setAgoraToken: (state, action) => {
      state.agoraToken = action.payload;
    },
    setNeonName: (state, action) => {
      state.neonName = action.payload;
    },
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setAgoraChannelId: (state, action) => {
      state.agoraChannelId = action.payload;
    },
    setIsSuperUser: (state, action) => {
      state.isSuperUser = action.payload;
    },
    setFriendsList: (state, action) => {
      state.friendsList = action.payload;
    },
    setFriendsList: (state, action) => {
      state.friendsList = action.payload;
    },
    setSearchUserName: (state, action) => {
      state.searchUserName = action.payload;
    },
    setSearchFacebook: (state, action) => {
      state.searchFacebook = action.payload;
    },
    setMyVideo: (state, action) => {
      state.myVideo = action.payload;
    },
    setMyAudio: (state, action) => {
      state.myAudio = action.payload;
    },
    clean: (state) => {
      state.id = null;
      state.token = null;
      state.agoraToken = null;
      state.login = null;
    },
    setSettingsTabDefault: (state, action) => {
      state.settingsTabDefault = action.payload;
    },
    setAgoraId: (state, action) => {
      state.agoraId = action.payload;
    },
    setChatLink: (state, action) => {
      state.chatLink = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setToken,
  setLogin,
  setAgoraToken,
  setId,
  setIsSuperUser,
  setAgoraChannelId,
  clean,
  setFriendsList,
  setSearchUserName,
  setSearchFacebook,
  setMyVideo,
  setMyAudio,
  setNeonName,
  setSettingsTabDefault,
  setAgoraId,
  setChatLink,
} = counterSlice.actions;

export default counterSlice.reducer;
