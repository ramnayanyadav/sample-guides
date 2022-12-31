import React from "react";
import {
  MessageTypeConstants,
  CometChatMessageTemplate,
} from "react-ui-kit-testing";

import { Hook } from "./hook";
import { CometChatMessages } from "react-ui-kit-testing";

import {
  alignmentContainerStyle,
  buttonContainerStyle,
  buttonStyle,
} from "../MessageAlignment/style.js";

const ExcludeMessageTypes = () => {
  const [user, setUser] = React.useState(null);
  const [group, setGroup] = React.useState(null);

  const [bool, setBool] = React.useState(false);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const customHandler = () => {
    setBool(true);
    //forceUpdate();
  };

  const defaultHandler = () => {
    setBool(false);
    //forceUpdate();
  };

  const _excludeMessageTypes = [
    MessageTypeConstants.image,
    MessageTypeConstants.file,
    // MessageTypeConstants.poll,
    MessageTypeConstants.document,
  ];

  let composerConfig = {
    excludeMessageTypes: _excludeMessageTypes,
  };

  let messageTypes = CometChatMessageTemplate.getDefaultTypes();
  let paymentTemplate = new CometChatMessageTemplate({
    type: "payment",
    icon: "assets/credit-card.png",
    name: "Payment",
    // customView: this.customView,
    //actionCallback: this.openPaymentTab,
  });
  messageTypes.push(paymentTemplate);

  const defaultComposerConfig = {
    excludeMessageTypes: messageTypes,
  };

  const messageListConfig = {
    excludeMessageTypes: [
      MessageTypeConstants.file,
      MessageTypeConstants.whiteboard,
      MessageTypeConstants.document,
      // MessageTypeConstants.poll,
    ],
    // messageTypes: messageTypes,
    // customMessageOptions: [
    //   MessageOptionConstants.shareMessage,
    //   MessageOptionConstants.forwardMessage,
    //   MessageOptionConstants.editMessage,
    // ],
    // excludeMessageOptions: [
    //   MessageOptionConstants.deleteMessage,
    //   MessageOptionConstants.reactToMessage,
    //   MessageOptionConstants.editMessage,
    //   MessageOptionConstants.copyMessage,
    // ],
  };

  const excludeMessageTypes = [
    MessageTypeConstants.file,
    MessageTypeConstants.whiteboard,
    MessageTypeConstants.document,
    MessageTypeConstants.poll,
    MessageTypeConstants.image,
    MessageTypeConstants.text,
  ];

  Hook(setGroup, setUser);

  return user ? (
    <div style={alignmentContainerStyle()}>
      {bool ? (
        <div>
          <CometChatMessages
            user={user}
            style={{
              width: "700px",
              height: "400px",
              border: "1px solid red",
            }}
            messageComposerConfiguration={composerConfig}
          />
        </div>
      ) : (
        <div>
          <CometChatMessages
            user={user}
            style={{
              width: "700px",
              height: "400px",
              border: "1px solid black",
            }}
            messageComposerConfiguration={null}
          />
        </div>
      )}
      <div style={buttonContainerStyle()}>
        <button onClick={defaultHandler} style={buttonStyle()}>
          default message
        </button>
        <button onClick={customHandler} style={buttonStyle()}>
          exclude message
        </button>
      </div>
    </div>
  ) : null;
};

export { ExcludeMessageTypes };
