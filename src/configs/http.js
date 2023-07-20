var httpConfig = {
  host: "https://play.otherworldevent.com",
  api: "/api",
  version: "/v1",
  user: "/user",
  get login() {
    return this.host + this.api + this.version + "/login";
  },

  get register() {
    return this.host + this.api + this.version + "/register";
  },

  get facebookAuth() {
    return this.host + this.api + this.version + "/facebook-auth";
  },

  get facebookCallback() {
    return (
      this.host +
      this.api +
      this.version +
      this.user +
      "/facebook/callback?code"
    );
  },

  get whoami() {
    return this.host + this.api + this.version + this.user + "/whoami";
  },

  get friendsList() {
    return this.host + this.api + this.version + this.user + "/list-friend";
  },

  get requestFriendship() {
    return (
      this.host +
      this.api +
      this.version +
      this.user +
      "/request-for-friendship"
    );
  },

  get rejectionFriendship() {
    return (
      this.host +
      this.api +
      this.version +
      this.user +
      "/rejection-of-friendship"
    );
  },

  get addFriend() {
    return this.host + this.api + this.version + this.user + "/add-friend";
  },

  get updateUser() {
    return this.host + this.api + this.version + this.user + "/update-user";
  },

  get updatePrivacy() {
    return (
      this.host + this.api + this.version + this.user + "/update-user-privacy"
    );
  },

  get addReport() {
    return this.host + this.api + this.version + this.user + "/add-report";
  },

  searchUser(userName) {
    return (
      this.host +
      this.api +
      this.version +
      this.user +
      "/search-user" +
      `?userName=${userName}`
    );
  },

  deleteFriend(friendId) {
    return (
      this.host +
      this.api +
      this.version +
      this.user +
      `/delete-friend/${friendId}`
    );
  },

  getAgoraTokenUrl(channelName) {
    return (
      this.host +
      this.api +
      this.version +
      this.user +
      "/get-agora-token?channelName=" +
      channelName
    );
  },
  getNeonListItems(skip, take) {
    return (
      this.host +
      this.api +
      this.version +
      this.user +
      "/list-items?skip=" +
      skip +
      "&take=" +
      take
    );
  },
  get getGiveMeServer() {
    return "https://mm.neon-xp.tk/api/v1/public/give-me-server?gameName=enva&mode=standalone";
  },
};

export default httpConfig;
