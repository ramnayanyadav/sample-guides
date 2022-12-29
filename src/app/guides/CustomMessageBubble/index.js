import React from "react";

import {
  CometChatMessageList,
  CometChatMessageBubble,
  CometChatMessageTemplate,
  CometChatMessages,
  getExtensionsData,
  MetadataConstants,
} from "react-ui-kit-testing";

import { Hook } from "./hook";

import {
  messageTextStyle,
  paymentContainerStyle,
  linkPreviewStyle,
} from "./style";

import {
  alignmentContainerStyle,
  buttonContainerStyle,
  buttonStyle,
} from "../MessageAlignment/style.js";

const CustomMessageBubble = (props) => {
  const [user, setUser] = React.useState(null);
  const [group, setGroup] = React.useState(null);
  //const [richMediaObject, setLinkPreviewObject] = React.useState();

  const [bool, setBool] = React.useState(false);

  const customBubbleHandler = () => {
    setBool(true);
  };

  const defaultBubbleHandler = () => {
    setBool(false);
  };

  const richMediaObject = React.useRef();
  let messageTypes = CometChatMessageTemplate.getDefaultTypes();

  const richMediaMethod = (props) => {
    const linkPreviewData = getExtensionsData(
      props?.messageObject,

      MetadataConstants.extensions.linkPreview
    );
    return linkPreviewData;
  };

  const customViewTextBubble = (props) => {
    return (
      <>
        <div
          className="message-text"
          style={messageTextStyle(richMediaMethod(props))}
        >
          {props.messageObject.text}
        </div>
        <div
          className="link--preview"
          style={linkPreviewStyle(richMediaMethod(props))}
        >
          <div className="rich__media">
            <div class="thumbnail">
              <img
                src={richMediaMethod(props)?.links[0]?.image}
                alt=""
                height="100px"
                width="100px"
              />
            </div>

            <div className="details">
              <div className="title">
                {richMediaMethod(props)?.links[0]?.title}
              </div>
              <div className="description">
                {richMediaMethod(props)?.links[0]?.description}
              </div>

              <a href={richMediaMethod(props)?.meta?.canonical} target="_blank">
                View
              </a>
            </div>
          </div>
        </div>
      </>
    );
  };

  const customViewPayment = (props) => {
    return (
      <React.Fragment>
        <div className="payment--view" style={paymentContainerStyle()}>
          <div className="payment--title">Payment Successful</div>
          <div className="payment--amount">
            ₹ {props?.messageObject?.data?.customData?.amount}
          </div>
        </div>
      </React.Fragment>
    );
  };

  let customMessageTypes = [
    new CometChatMessageTemplate({
      type: "text",
      icon: "",
      name: "Text",
      category: "messsages",
      customView: customViewTextBubble,
      // onActionClick: null,
    }),
    new CometChatMessageTemplate({
      type: "payment",
      icon: "",
      name: "Payment",
      category: "custom-message",
      customView: customViewPayment,
      // onActionClick: onActionClickPayment,
    }),
    ...messageTypes,
  ];

  Hook(setGroup, setUser);

  return user ? (
    <div style={alignmentContainerStyle()}>
      <div>
        <CometChatMessageList
          user={user}
          style={{ width: "700px", height: "400px", border: "1px solid black" }}
          messageTypes={bool ? customMessageTypes : null}
        />
      </div>
      <div style={buttonContainerStyle()}>
        <button onClick={defaultBubbleHandler} style={buttonStyle()}>
          default bubble
        </button>
        <button onClick={customBubbleHandler} style={buttonStyle()}>
          custom bubble
        </button>
      </div>
    </div>
  ) : null;
};

export { CustomMessageBubble };
