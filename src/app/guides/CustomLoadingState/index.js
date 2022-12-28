import React from "react";
import spinnerIcon from "./resources/spinner.svg";
import {
  loadingIconStyle,
  loadingTextMessageStyle,
  customLoadingContainerStyle,
} from "./style";

import {
  CometChatMessageList,
  CometChatConversationList,
  CometChatMessages,
} from "react-ui-kit-testing";

import { Hooks } from "./hooks";
import { Hook } from "../CustomSoundManager/hook";

const CustomLoadingState = () => {
  const [user, setUser] = React.useState(null);
  const [group, setGroup] = React.useState(null);

  let loadingCustomView = () => (
    <div
      className="custom--loading--container"
      style={customLoadingContainerStyle()}
    >
      <i className="loading--icon" style={loadingIconStyle(spinnerIcon)}></i>
      <p className="loading--text" style={loadingTextMessageStyle()}>
        loading...
      </p>
    </div>
  );

  Hooks(setUser, setGroup);

  return user ? (
    <CometChatMessageList
      user={user}
      style={{ width: "700px", height: "450px", border: "1px solid black" }}
      customView={{
        error: null,
        loading: loadingCustomView,
        empty: null,
      }}
    />
  ) : null;
};

export { CustomLoadingState };
