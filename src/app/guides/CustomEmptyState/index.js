import React from "react";
import emptyIcon from "./resources/empty.svg";
import {
  CometChatConversationList,
  CometChatConversationsWithMessages,
  CometChatMessageList,
} from "react-ui-kit-testing";
import {
  emptyIconStyle,
  emptyTextMessageStyle,
  customEmptyContainerStyle,
} from "./style";

const CustomEmptyState = () => {
  let emptyCustomeView = () => (
    <div
      className="custom--empty--container"
      style={customEmptyContainerStyle()}
    >
      <i className="empty--icon" style={emptyIconStyle(emptyIcon)}></i>
      <p className="empty--text" style={emptyTextMessageStyle()}>
        no chat's found
      </p>
    </div>
  );

  return (
    <CometChatMessageList
      style={{ width: "700px", height: "450px", border: "1px solid black" }}
      customView={{
        error: null,
        loading: null,
        empty: emptyCustomeView,
      }}
    />
  );
};

export { CustomEmptyState };
