import React from "react";
import warningIcon from "./resources/warning.svg";
import {
  errorIconStyle,
  errorTextMessageStyle,
  customErrorContainerStyle,
} from "./style";

import { Hook, Hooks } from "../CustomSoundManager/hook";

import {
  CometChatMessageList,
  CometChatConversationList,
  CometChatMessages,
} from "react-ui-kit-testing";

const CustomErrorState = () => {
  const [user, setUser] = React.useState(null);
  const [group, setGroup] = React.useState(null);

  let errorCustomView = () => (
    <div
      className="custom--error--container"
      style={customErrorContainerStyle()}
    >
      <i className="error--icon" style={errorIconStyle(warningIcon)}></i>
      <p className="error--text" style={errorTextMessageStyle()}>
        error
      </p>
    </div>
  );

  Hook(setUser, setGroup);

  return (
    <CometChatMessageList
      user={user}
      style={{ width: "700px", height: "450px", border: "1px solid black" }}
      customView={{
        error: errorCustomView,
        loading: null,
        empty: null,
      }}
    />
  );
};

export { CustomErrorState };
