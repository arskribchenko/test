import ue4app from "./libs/UnrealRTC/app";

var ue4appInstance = (function () {
  var instance;

  var createInstance = function () {
    return {
      getUe4app: () => {
        return ue4app;
      },
      emitUICommand: (data) => {
        return ue4app.emitUIInteraction(data);
      },
      addUIHandler: (name, action) => {
        console.debug(name);
        console.debug(action);
        return ue4app.addResponseEventListener(name, action);
      },
      initUE4Callback: () => {},
      dataChannelInitedUE4Callback: () => {},
    };
  };

  return {
    getInstance: function () {
      return instance || (instance = createInstance());
    },
    reCreateInstance: function () {
      return (instance = createInstance());
    },
  };
})();

export default ue4appInstance;
