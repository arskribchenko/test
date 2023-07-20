const commands = {
  initializeCustomization: "init_customization",
  setAddon: "set_addon",
  setColor: "set_color",
  setName: "set_name",
  setCompanionName: "set_companion_name",
  connect: "connect_to_game_server",
  teleport: "teleport_to_user",
  inputMode: "set_input_mode",
};

const inputModes = {
  simple: 0,
  simpleTouch: 1,
  pro: 2,
  proTouch: 3,
};

const addonsSockets = {
  head: 0,
  back: 1,
  leftHand: 2,
  rightHand: 3,
  companion: 4,
};

const addonsColors = {
  ring: 0,
  primary: 1,
  secondary: 2,
};

function createInitCustomizationCommand(
  userId,
  agoraUserId,
  isSuperUser,
  agoraAppId,
  avatarData
) {
  return {
    command: commands.initializeCustomization,
    user_id: userId,
    agora_user_id: agoraUserId,
    is_super_user: isSuperUser,
    agora_app_id: agoraAppId,
    avatar_data: avatarData,
  };
}

function createSetAddonCommand(socket, addonId) {
  return {
    command: commands.setAddon,
    socket: socket,
    addon: addonId,
  };
}

function createSetColorCommand(socket, color) {
  return {
    command: commands.setColor,
    socket: socket,
    color: color,
  };
}

function createSetNameCommand(name) {
  return {
    command: commands.setName,
    name: name,
  };
}

function createSetCompanionNameCommand(name) {
  return {
    command: commands.setCompanionName,
    name: name,
  };
}

function createConnectToGameServerCommand(name) {
  return {
    command: commands.connect,
  };
}

function createTeleportCommand(user_id) {
  return {
    command: commands.teleport,
    user_id: user_id,
  };
}

function createInputModeCommand(mode) { 
  return {
    command: commands.inputMode,
    mode: mode,
  };
}

export default {
  commands,
  addonsSockets,
  addonsColors,
  inputModes,
  createInitCustomizationCommand,
  createSetAddonCommand,
  createSetColorCommand,
  createSetCompanionNameCommand,
  createSetNameCommand,
  createConnectToGameServerCommand,
  createTeleportCommand,
  createInputModeCommand,
};
