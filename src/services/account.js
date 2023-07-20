import axios from "axios";
import http from "../configs/http";

function login(login, password) {
  return axios.post(http.login, {
    email: login,
    password: password,
  });
}

function register(login, password, userName, accessCode) {
  return axios.post(http.register, {
    email: login,
    firstName: userName,
    ticket: accessCode,
    password: password,
  });
}

function facebookAuth(token) {
  return axios.post(http.facebookAuth, {
    accessToken: token,
  });
}

function whoami(token) {
  return axios.get(http.whoami, {
    headers: {
      Authorization: token,
    },
  });
}

function getAgoraToken(token, channelName) {
  return axios.get(http.getAgoraTokenUrl(channelName), {
    headers: {
      Authorization: token,
    },
  });
}

function getFriendsList(token) {
  return axios.get(http.friendsList, {
    headers: {
      Authorization: token,
    },
  });
}

function getNeonItems(token) {
  return axios.get(http.getNeonListItems(0, 999), {
    headers: {
      Authorization: token,
    },
  });
}

function deleteFriend(token, friendId) {
  return axios.patch(
    http.deleteFriend(friendId),
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
}
function requestFriendship(token, userId) {
  return axios.patch(
    http.requestFriendship,
    {
      userId: userId,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
}
function rejectionfriendship(token, userId) {
  return axios.patch(
    http.rejectionFriendship,
    {
      userId: userId,
    },
    {}
  );
}
function addFriend(token, userId) {
  return axios.patch(
    http.addFriend,
    {
      userid: userId,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
}
function searchUser(token, email, userName) {
  return axios.get(http.searchUser(userName), {
    headers: {
      Authorization: token,
    },
    email: email,
    userName: userName,
    skip: 0,
    limit: 999999999,
  });
}

function updateUser(token, data) {
  return axios.patch(http.updateUser, data, {
    headers: {
      Authorization: token,
    },
  });
}

function updatePrivacy(
  token,
  searchUserName,
  searchFacebook,
  myVideo,
  myAudio
) {
  return axios.patch(
    http.updatePrivacy,
    {
      searchUserName: searchUserName,
      searchFacebook: searchFacebook,
      myVideo: myVideo,
      myAudio: myAudio,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
}
function addReport(token, acused, cause, description) {
  return axios.post(
    http.addReport,
    {
      acused: acused,
      cause: cause,
      description: description,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
}

function getGiveMyServer() {
  return axios.get(http.getGiveMeServer);
}

export default {
  login,
  register,
  facebookAuth,
  getAgoraToken,
  whoami,
  getFriendsList,
  deleteFriend,
  requestFriendship,
  rejectionfriendship,
  addFriend,
  searchUser,
  updateUser,
  facebookAuth,
  getGiveMyServer,
  updatePrivacy,
  addReport,
  getNeonItems,
};
