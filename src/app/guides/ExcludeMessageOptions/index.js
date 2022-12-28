import React from "react";
import { CometChat } from "@cometchat-pro/chat";

import {
  CometChatMessageList,
  MessageOptionConstants,
  CometChatPopover,
  CometChatMessageEvents,
  CometChatSoundManager,
  CometChatMessageTemplate,
  CometChatMessageOptions,
  MessageTypeConstants,
} from "react-ui-kit-testing";

import {
  dateTimeStyle,
  closeIconStyle,
  pinnedMesssageStyle,
  pinnedMessageTextStyle,
} from "./style";

import {
  alignmentContainerStyle,
  buttonContainerStyle,
  buttonStyle,
} from "../MessageAlignment/style.js";

import { Hook } from "./hook";

import { getUnixTimestamp, ID } from "../../home/MessageConstant";

import reminderIconURL from "./resources/reminders.svg";
import pinnIconURL from "./resources/pinn-message.svg";
import saveIconURL from "./resources/save-message.svg";
import reportIconUrl from "./resources/report-message.svg";
import messageInfoURL from "./resources/message-info.svg";
import customIconURL from "./resources/customIconURl.svg";

const ExcludeMessageOptions = () => {
  const [user, setUser] = React.useState(null);
  const [group, setGroup] = React.useState(null);
  const [launchReminder, setReminder] = React.useState(false);
  const [messageObject, setMessageObject] = React.useState({});
  const [pinnedMsg, setPinnedMsg] = React.useState(false);
  const [pinnedMessageObject, setPinnedMessage] = React.useState({});
  const [launchReport, setReport] = React.useState(false);
  const [launchMessageInfo, setMessageInfo] = React.useState(false);
  const inputReport = React.useRef("");

  const [bool, setBool] = React.useState(false);

  const customHandler = () => {
    setBool(true);
  };

  const defaultHandler = () => {
    setBool(false);
  };

  const date = React.useRef("");
  const time = React.useRef("");

  /**
   * pinned custom message option
   */
  const closePinnedMessage = () => {
    CometChat.callExtension("pin-message", "DELETE", "v1/unpin", {
      msgId: pinnedMessageObject?.id,
      receiverType: "user",
      receiver: "supergroup3",
    })
      .then((response) => {
        // { success: true }
        setPinnedMsg(!pinnedMsg);
      })
      .catch((error) => {
        // Error occurred
      });
  };

  const pinnedMessageView = (
    <div style={pinnedMesssageStyle()}>
      <div style={closeIconStyle()}>
        <span onClick={closePinnedMessage}> &times;</span>
      </div>
      <div style={pinnedMessageTextStyle()}>
        <p style={{ margin: "5px" }}>
          {pinnedMessageObject?.text || `pinned message`}
        </p>
      </div>
    </div>
  );

  const pinnedMessageClick = (e) => {
    setPinnedMessage(e);
    //console.log(e);
    CometChat.callExtension("pin-message", "POST", "v1/pin", {
      msgId: e?.id, // The ID of the message to be pinned. Here 280.
    })
      .then((response) => {
        // { success: true }
        //console.log("pinned message response", response);
        setPinnedMsg(true);
      })
      .catch((error) => {
        // Error occurred
        //console.log("pinn error", error);
      });
  };

  let pinnedOption = new CometChatMessageOptions({
    iconURL: pinnIconURL,
    id: "pinned-message",
    onClick: pinnedMessageClick,
    optionFor: null,
    title: "pinned",
  });

  /**
   * save custom message option
   */
  const saveMessageClick = (e) => {
    CometChat.callExtension("save-message", "POST", "v1/save", {
      msgId: e?.id,
    })
      .then((response) => {
        // { success: true }
        alert("message saved");
      })
      .catch((error) => {
        // Error occured
        console.error("save message error", error);
      });
  };

  let saveOption = new CometChatMessageOptions({
    iconURL: saveIconURL,
    id: "save-message",
    onClick: saveMessageClick,
    optionFor: null,
    title: "save",
  });

  /**
   * reminder message
   */
  const FetchApi = (e) => {
    setMessageObject(e);
    setReminder(!launchReminder);
  };

  let reminderMessage = new CometChatMessageOptions({
    iconURL: reminderIconURL,
    id: "extension_reminders",
    onClick: FetchApi,
    optionFor: null,
    title: "reminder",
  });

  const sentReminder = () => {
    if (date?.current?.length && time?.current?.length) {
      let reminderDate = date?.current + " " + time?.current;

      let ms = Math.floor(new Date(`${reminderDate}`).getTime());

      CometChat.callExtension("reminders", "POST", "v1/reminder", {
        about: parseInt(messageObject.id),
        isCustom: false,
        timeInMS: ms,
      })
        .then((response) => {
          // Reminder created successfully
          // Reminder details with reminderId.
          //console.log("reminder resp", response);
          alert("reminder sent successfuly");
          setReminder(!launchReminder);
        })
        .catch((error) => {
          // Some error occured
          console.log("reminder error", error);
        });
    }
  };

  let reminderView = () => {
    return (
      <h3
        style={{
          background: "red",
          width: "250px",
          height: "200px",
          padding: "10px",
          borderRadius: "5px",
          textAlign: "center",
          zIndex: 999,
          color: "white",
        }}
      >
        Reminder messsage
      </h3>
    );
  };

  let messageBubbleConfig = {
    customView: reminderView,
  };

  let customViewSetDate = (
    <div style={dateTimeStyle()}>
      <p style={{ margin: "0" }}>Date</p>
      <input type="date" onChange={(e) => (date.current = e.target.value)} />
      <p style={{ margin: "0" }}>Time</p>
      <input type="time" onChange={(e) => (time.current = e.target.value)} />
      <button onClick={sentReminder}>Submit</button>
    </div>
  );
  /**
   * report message
   */
  const sentReport = () => {
    setReport(!launchReport);
    if (inputReport?.current?.length && messageObject) {
      CometChat.callExtension("report-message", "POST", "v1/report", {
        msgId: messageObject.id,
        reason: inputReport?.current,
      })
        .then((response) => {
          // { success: true }
          //console.log("report responce", response);
        })
        .catch((error) => {
          // Error occurred
          //console.log("report error", error);
        });
    }
  };

  const reportMessageUserInput = (e) => {
    inputReport.current = e.target.value;
  };

  const reportMessageView = (
    <>
      <div
        className="bitly--input"
        style={{
          position: "relative",
          minWidth: "250px",
          height: "auto",
          border: "1px solid black",
          padding: "40px",
          borderRadius: "5px",
          background: "#606c38",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "0px",
            right: "10px",
            fontSize: "30px",
            cursor: "pointer",
          }}
          onClick={() => setReport(!launchReport)}
        >
          &times;
        </span>
        <input
          style={{
            position: "relative",
            display: "block",
            margin: "0 auto",
            width: "100%",
            boxSizing: "border-box",
            textAlign: "center",
            padding: "10px 0",
            borderRadius: "5px",
            outline: "none",
          }}
          type="text"
          placeholder="Enter url text"
          onChange={reportMessageUserInput}
        />
        <button
          style={{
            padding: "5px 10px",
            margin: "5px auto",
            position: "absolute",
            left: "40%",
            background: "rgb(51,153,255)",
            borderRadius: "5px",
          }}
          onClick={sentReport}
        >
          Send
        </button>
      </div>
    </>
  );

  const reportMessageClicked = (e) => {
    setReport(!launchReport);
    setMessageObject(e);
  };

  let reportMessage = new CometChatMessageOptions({
    iconURL: reportIconUrl,
    id: "report-message",
    onClick: reportMessageClicked,
    optionFor: null,
    title: "Report",
  });

  /**
   * message information option
   */
  const messageInfoClicked = (e) => {
    // console.log("message info", e);
    setMessageInfo(!launchMessageInfo);
    setMessageObject(e);
  };

  const messageInfoView = (messageObject) => {
    if (messageObject && messageObject?.text) {
      return (
        <div
          className="message--info"
          style={{
            background: "rgb(20,20,20)",
            padding: "10px",
            borderRadius: "10px",
            minWidth: "400px",
            color: "white",
          }}
        >
          <div
            onClick={messageInfoClicked}
            style={{
              fontSize: "25px",
              marginBottom: "10px",
              cursor: "pointer",
              float: "right",
              margin: "0",
              padding: "0",
            }}
            className="closeIcon"
          >
            &times;
          </div>
          <div
            className="user--info"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              padding: "5px",
              borderBottom: "1px solid",
            }}
          >
            <div
              className="sender--info"
              style={{
                padding: "5px",
                justifyContent: "center",
                alignItems: "center",
                borderRight: "1px solid",
                boxSizing: "border-box",
                textAlign: "center",
              }}
            >
              <p>{messageObject?.sender?.name || `Sender name`}</p>
              <p style={{ font: "400 13px Inter", margin: "0", padding: "0" }}>
                {messageObject?.sender?.uid || `Sender Id`}
              </p>
            </div>
            <div
              className="receiver--info"
              style={{
                padding: "5px",
                justifyContent: "center",
                alignItems: "center",
                boxSizing: "border-box",
                textAlign: "center",
              }}
            >
              <p>{messageObject?.receiver?.name || `Receiver name`}</p>
              <p style={{ font: "400 13px Inter", margin: "0", padding: "0" }}>
                {messageObject?.receiver?.uid || `Receiver Id`}
              </p>
            </div>
          </div>
          <div
            style={{
              margin: "5px",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              font: "400 12px Inter",
              borderRadius: "5px",
              padding: "5px 0",
            }}
          >
            {`${new Date(messageObject?.sentAt)}` || `time`}
          </div>
          <div
            className="messages"
            style={{
              margin: "5px",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              font: "400 16px Inter",
              border: "1px solid black",
              borderRadius: "5px",
              padding: "10px 0",
            }}
          >
            {messageObject?.text}
          </div>
        </div>
      );
    }
  };

  let messageInformation = new CometChatMessageOptions({
    iconURL: messageInfoURL,
    id: "messsage-information",
    onClick: messageInfoClicked,
    optionFor: null,
    title: "message info",
  });

  /**
   * Custom implementation of pre-defined message option
   */
  const customOption = () => {
    alert("custom pre-defined message option!");
  };

  let customMessageOption = new CometChatMessageOptions({
    iconURL: customIconURL,
    id: "delete",
    onClick: customOption,
    optionFor: null,
    title: "delete message",
  });

  /**
   * message options list
   */

  const excludeMessageOptions = [
    // MessageOptionConstants.reactToMessage,
    MessageOptionConstants.editMessage,
    MessageOptionConstants.deleteMessage,
    // MessageOptionConstants.copyMessage,
    MessageOptionConstants.translateMessage,
  ];

  const customMessageOptions = [
    MessageOptionConstants.reactToMessage,
    MessageOptionConstants.editMessage,
    MessageOptionConstants.deleteMessage,
    MessageOptionConstants.copyMessage,
    MessageOptionConstants.translateMessage,
    reminderMessage,
    saveOption,
    pinnedOption,
    reportMessage,
    messageInformation,
    customMessageOption,
  ];

  let defaultOptions = [
    MessageOptionConstants.reactToMessage,
    MessageOptionConstants.editMessage,
    MessageOptionConstants.deleteMessage,
    MessageOptionConstants.copyMessage,
    MessageOptionConstants.translateMessage,
    reminderMessage,
  ];
  //let messageTypes = [];
  let messageTypes = CometChatMessageTemplate.getDefaultTypes();
  let reminderCustomMessageTemplate = new CometChatMessageTemplate({
    type: "extension_reminders",
    icon: null,
    name: "reminder",
    category: "custom",
    customView: reminderView,
    onActionClick: null,
  });

  const excludeMessageTypes = [
    // MessageTypeConstants.file,
    // MessageTypeConstants.whiteboard,
    // MessageTypeConstants.document,
    MessageTypeConstants.poll,
    // MessageTypeConstants.image,
    // MessageTypeConstants.text,
  ];

  messageTypes.push(reminderCustomMessageTemplate);

  Hook(setGroup, setUser);

  return user ? (
    <div style={alignmentContainerStyle()}>
      <div>
        {pinnedMsg ? <>{pinnedMessageView}</> : null}
        <CometChatMessageList
          user={user}
          style={{ width: "650px", height: "450px", border: "1px solid black" }}
          alignment={"standard"} //['standard','leftAligned']
          excludeMessageOptions={bool ? excludeMessageOptions : null}
          customMessageOptions={bool ? customMessageOptions : null}
          excludeMessageTypes={excludeMessageTypes}
          sentMessageInputData={{
            thumbnail: false,
            title: false,
            time: true,
            readReceipt: true,
          }}
          messageTypes={messageTypes}
          messageBubbleConfiguration={messageBubbleConfig}
        />

        {launchReminder ? (
          <CometChatPopover position="left" x="750" y="350">
            {customViewSetDate}
          </CometChatPopover>
        ) : null}

        {launchReport ? (
          <CometChatPopover position="left" x="650" y="350">
            {reportMessageView}
          </CometChatPopover>
        ) : null}

        {launchMessageInfo ? (
          <CometChatPopover position="left" x="600" y="230">
            {messageInfoView(messageObject)}
          </CometChatPopover>
        ) : null}
      </div>
      <div style={buttonContainerStyle()}>
        <button onClick={defaultHandler} style={buttonStyle()}>
          default options
        </button>
        <button onClick={customHandler} style={buttonStyle()}>
          custom options
        </button>
      </div>
    </div>
  ) : null;
};

export { ExcludeMessageOptions };
