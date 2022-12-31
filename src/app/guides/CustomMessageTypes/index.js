import React from "react";

import {
  CometChatMessageList,
  CometChatMessages,
  CometChatMessageTemplate,
  CometChatPopover,
  CometChatBackdrop,
  CometChatMessageEvents,
  CometChatSoundManager,
} from "react-ui-kit-testing";

import { CometChat } from "react";

import {
  alignmentContainerStyle,
  buttonContainerStyle,
  buttonStyle,
} from "../MessageAlignment/style.js";

import iconURL from "./resources/empty.svg";
import loadingIconURL from "./resources/spinner.svg";
import { Hook } from "./hook";

const CustomMessageTypes = (props) => {
  const [_user, setUser] = React.useState(null);
  const [_group, setGroup] = React.useState(null);

  const [bool, setBool] = React.useState(false);

  const customHandler = () => {
    setBool(true);
  };

  const defaultHandler = () => {
    setBool(false);
  };

  let messageListConfig = {};
  if (props?.messageTypes) {
    messageListConfig = {
      messageTypes: props?.messageTypes,
      loadingIconURL: loadingIconURL,
    };
  }

  Hook(setGroup, setUser);
  return _user ? (
    <div style={alignmentContainerStyle()}>
      <div>
        <CometChatMessages
          user={_user}
          style={{ width: "700px", height: "500px", border: "1px solid black" }}
          messageTypes={bool ? props?.messageTypes : null}
          messsageListConfiguration={messageListConfig}
          messageComposerConfiguration={{
            messageTypes: bool ? props?.messageTypes : null,
          }}
        />
        {props?.launchGfy ? (
          <CometChatPopover position="left" x="750" y="300">
            {props.gfycatsMessageComponent}
          </CometChatPopover>
        ) : null}

        {props.payment ? (
          <CometChatPopover position="left" x="750" y="300">
            {props.paymentMessageComponent}
          </CometChatPopover>
        ) : null}

        {props.launchGiphy ? (
          <CometChatPopover position="left" x="750" y="300">
            {props.giphyMessageComponent}
          </CometChatPopover>
        ) : null}

        {props.launchStipop ? (
          <CometChatPopover position="left" x="750" y="300">
            {props.stipopMessageComponent}
          </CometChatPopover>
        ) : null}

        {props.launchBitly ? (
          <CometChatPopover position="left" x="750" y="300">
            {props.bitlyMessageComponent}
          </CometChatPopover>
        ) : null}

        {props.launchTinyurl ? (
          <CometChatPopover position="left" x="750" y="300">
            {props.tinyurlMessageComponent}
          </CometChatPopover>
        ) : null}
      </div>
      <div style={buttonContainerStyle()}>
        <button onClick={defaultHandler} style={buttonStyle()}>
          default
        </button>
        <button onClick={customHandler} style={buttonStyle()}>
          custom
        </button>
      </div>
    </div>
  ) : null;
};

export { CustomMessageTypes };
