import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
} from "react-router-dom";

import { useNavigate } from "react-router-dom";

import {
  MessagesConfiguration,
  CometChatTheme,
  getExtensionsData,
  MetadataConstants,
  CometChatMessageTemplate,
  CustomMessage,
  CometChatMessageEvents,
  MessageStatus,
  CometChatSoundManager,
  MessageListConfiguration,
} from "react-ui-kit-testing";

import { getUnixTimestamp, ID } from "./MessageConstant";
import { Hook } from "./hook";

import icon from "./resources/empty.svg";

import audio from "./resources/audio.mp3";

import {
  headerContainerStyle,
  navLinkStyle,
  paymentViewStyle,
  paymentTitleStyle,
  paymentAmountStyle,
  messagePreviewContainerStyle,
  previewTitleStyle,
  previewImageStyle,
  messageTextStyle,
  paymentContainerStyle,
  paymentHeaderStyle,
  paymentInputStyle,
  paymentButtonStyle,
  closeIconStyle,
  inputFieldStyle,
  sendButtonStyle,
  gifBoardStyle,
  gfyCloseIconStyle,
  bitlyInputContainerStyle,
} from "./style";

import { linkPreviewStyle } from "../guides/CustomMessageBubble/style";

import { CometChat } from "@cometchat-pro/chat";
import { CustomErrorState } from "../guides/CustomErrorState";
import { CustomLoadingState } from "../guides/CustomLoadingState";
import { CustomEmptyState } from "../guides/CustomEmptyState";
import { MessageAlignment } from "../guides/MessageAlignment";
import { CustomSoundManager } from "../guides/CustomSoundManager";
import { ExcludeMessageOptions } from "../guides/ExcludeMessageOptions";
import { ExcludeMessageTypes } from "../guides/ExcludeMessageTypes";
import { CustomMessageTypes } from "../guides/CustomMessageTypes";
import { MessageTheme } from "../guides/MessageTheme";
import { CustomMessageBubble } from "../guides/CustomMessageBubble";

const Home = () => {
  // const [amount, setAmount] = React.useState("");
  const [user, setUser] = React.useState(null);
  const [group, setGroup] = React.useState(null);
  const [launchGfy, setGfy] = React.useState(false);
  const [launchPayment, setPayment] = React.useState(false);
  const [gif, setGifList] = React.useState(null);
  const [giphy, setGiphy] = React.useState(null);
  const [launchGiphy, setlaunchGiphy] = React.useState(false);
  const [launchBitly, setLaunchBitly] = React.useState(false);
  const [bitlyUrl, setBitlyUrl] = React.useState(
    "https://calendar.google.com/calendar/u/0/r/week"
  );
  const [bitlyResponseUrl, setBitlyRespondUrl] = React.useState("");
  const [launchTinyurl, setTinyUrl] = React.useState(false);
  const [tinyurl, setTinyurl] = React.useState(
    "https://calendar.google.com/calendar/u/0/r/week"
  );
  const [stipopList, setStipop] = React.useState([]);
  const [launchStipop, setLaunchStipop] = React.useState(false);

  const messageStatus = Object.freeze({
    inprogress: "inprogress",
    success: "success",
  });

  const amount = React.useRef(0);

  const customTextMessage = () => {
    let textMessage = new CometChat.TextMessage(
      "superhero2",
      "https://www.youtube.com",
      "user"
    );

    textMessage.setSentAt(getUnixTimestamp());
    textMessage.setMuid(String(getUnixTimestamp()));
    CometChatMessageEvents.emit(CometChatMessageEvents.onMessageSent, {
      message: textMessage,
      status: messageStatus.inprogress,
    });

    CometChat.sendCustomMessage(textMessage)
      .then((message) => {
        const messageObject = { ...message };
        CometChatMessageEvents.emit(CometChatMessageEvents.onMessageSent, {
          message: messageObject,
          status: messageStatus.success,
        });
      })
      .catch((error) => {});
  };

  /**
   * custom payment message
   */
  const customViewPayment = (props) => (
    <React.Fragment>
      <div className="payment--view" style={paymentViewStyle()}>
        <div className="payment--title" style={paymentTitleStyle()}>
          Payment Successful
        </div>
        <div className="payment--amount" style={paymentAmountStyle()}>
          ₹ {props?.messageObject?.data?.customData?.amount}
        </div>
      </div>
    </React.Fragment>
  );

  const onActionClickPayment = () => {
    setPayment(!launchPayment);
  };

  const closePayment = () => {
    setPayment(!launchPayment);
  };

  const playAudio = (customOutgoingMessageSound) => {
    if (customOutgoingMessageSound) {
      CometChatSoundManager.play(
        CometChatSoundManager.Sound.outgoingMessage,
        customOutgoingMessageSound
      );
    } else {
      CometChatSoundManager.play(CometChatSoundManager.Sound.outgoingMessage);
    }
  };

  const makePayment = () => {
    if (amount && amount.current) {
      let receiverId = "superhero3";
      let receiverType = "user";
      const customData = {
        amount: amount.current,
      };
      const customType = "payment";
      const customMessage = new CometChat.CustomMessage(
        receiverId,
        receiverType,
        customType,
        customData
      );
      customMessage.setSentAt(getUnixTimestamp());
      customMessage.setMuid(String(getUnixTimestamp()));
      CometChatMessageEvents.emit(CometChatMessageEvents.onMessageSent, {
        message: customMessage,
        status: messageStatus.inprogress,
      });

      playAudio(audio);
      amount.current = 0;
      CometChat.sendCustomMessage(customMessage)
        .then((message) => {
          const messageObject = { ...message };
          CometChatMessageEvents.emit(CometChatMessageEvents.onMessageSent, {
            message: messageObject,
            status: messageStatus.success,
          });
          closePayment();
          console.log("payment succeded", message);
        })
        .catch((error) => {});
      //closePayment();
    }
  };

  const paymentMessageComponent = (
    <React.Fragment>
      <div className="payment" style={paymentContainerStyle()}>
        <span
          onClick={closePayment}
          style={closeIconStyle()}
          className="closeIcon"
        >
          &times;
        </span>
        <h1 className="title" style={paymentHeaderStyle()}>
          Payment
        </h1>
        <div className="input--field" style={inputFieldStyle()}>
          <input
            type="input"
            style={paymentInputStyle()}
            className="input--amout"
            onChange={(e) => (amount.current = parseInt(e.target.value))}
            placeholder="Enter amount..."
          ></input>
        </div>
        <div className="send--button" style={sendButtonStyle()}>
          <button
            type="button"
            style={paymentButtonStyle()}
            onClick={makePayment}
          >
            Send
          </button>
        </div>
      </div>
    </React.Fragment>
  );

  /**
   *  gfycats message types
   */
  const gfycatsCustomView = (props) => {
    return (
      <div className="gif--items" style={{ margin: "10px 3px" }}>
        <img
          src={props?.messageObject?.data?.customData?.src}
          alt="gfycats"
          width="70"
          height="70"
        />
      </div>
    );
  };

  const launchGfycatsboard = () => {
    setGfy(!launchGfy);
  };
  const sendGfycatsMessage = (e) => {
    if (e) {
      let receiverId = "superhero3";
      let receiverType = "user";
      const customData = {
        src: e.target.src,
      };
      const customType = "gfycats";
      const customMessage = new CometChat.CustomMessage(
        receiverId,
        receiverType,
        customType,
        customData
      );
      customMessage.setSentAt(getUnixTimestamp());
      customMessage.setMuid(String(getUnixTimestamp()));
      CometChatMessageEvents.emit(CometChatMessageEvents.onMessageSent, {
        message: customMessage,
        status: messageStatus.inprogress,
      });
      launchGiphyBoard();
      playAudio(audio);
      CometChat.sendCustomMessage(customMessage)

        .then((message) => {
          const messageObject = { ...message };
          CometChatMessageEvents.emit(CometChatMessageEvents.onMessageSent, {
            message: messageObject,
            status: messageStatus.success,
          });
          launchGiphyBoard();
        })
        .catch((error) => {});
    }
  };

  let gfycatsBoardList = gif?.gfycats?.map((item) => {
    return (
      <div
        className="gif--items"
        style={{ margin: "10px 3px", cursor: "pointer" }}
        key={item?.gfyId}
      >
        <img
          key={item?.gfyId}
          src={item?.gifUrl}
          alt="Girl in a jacket"
          width="70"
          height="70"
          onClick={sendGfycatsMessage.bind(item)}
        />
      </div>
    );
  });
  const closegfyBoard = () => setGfy(!launchGfy);

  const gfycatsBoardComponent = (
    <>
      <div
        onClick={closegfyBoard.bind(this)}
        style={gfyCloseIconStyle()}
        className="closeIcon"
      >
        &times;
      </div>
      <div className="gif--board" style={gifBoardStyle()}>
        {gfycatsBoardList}
      </div>
    </>
  );

  /**
   *
   * giphy message types
   */
  const giphyCustomView = (props) => {
    return (
      <div className="gif--items" style={{ margin: "10px 3px" }}>
        <img
          src={props?.messageObject?.data?.customData?.src}
          alt="giphy"
          width="70"
          height="70"
        />
      </div>
    );
  };

  const launchGiphyBoard = () => {
    setlaunchGiphy(!launchGiphy);
  };

  const sendGiphyMessage = (e) => {
    if (e) {
      let receiverId = "superhero3";
      let receiverType = "user";
      const customData = {
        src: e.target.src,
      };
      const customType = "gfycats";
      const customMessage = new CometChat.CustomMessage(
        receiverId,
        receiverType,
        customType,
        customData
      );
      customMessage.setSentAt(getUnixTimestamp());
      customMessage.setMuid(String(getUnixTimestamp()));
      CometChatMessageEvents.emit(CometChatMessageEvents.onMessageSent, {
        message: customMessage,
        status: messageStatus.inprogress,
      });
      closegfyBoard();
      playAudio(audio);
      CometChat.sendCustomMessage(customMessage)

        .then((message) => {
          const messageObject = { ...message };
          CometChatMessageEvents.emit(CometChatMessageEvents.onMessageSent, {
            message: messageObject,
            status: messageStatus.success,
          });
          closegfyBoard();
        })
        .catch((error) => {});
    }
  };

  let giphyBoardList = giphy?.map((item) => {
    return (
      <div
        key={item?.id}
        className="gif--items"
        style={{ margin: "10px 3px", cursor: "pointer" }}
      >
        <img
          key={item?.id}
          src={item?.images?.downsized_medium?.url}
          alt="Girl in a jacket"
          width="70"
          height="70"
          onClick={sendGiphyMessage.bind(item)}
        />
      </div>
    );
  });

  let giphyBoardComponent = (
    <>
      <div
        onClick={launchGiphyBoard.bind(this)}
        style={gfyCloseIconStyle()}
        className="closeIcon"
      >
        &times;
      </div>
      <div className="giphy--board" style={gifBoardStyle()}>
        {giphyBoardList}
      </div>
    </>
  );

  /**
   * bitly message type
   */
  const launchBitlyBoard = () => {
    setLaunchBitly(!launchBitly);
  };

  const sendBitlyUrl = (response) => {
    if (response.minifiedText) {
      let receiverId = "superhero3";
      let receiverType = "user";
      const customData = {
        src: response.minifiedText,
      };
      const customType = "bitly";
      const customMessage = new CometChat.CustomMessage(
        receiverId,
        receiverType,
        customType,
        customData
      );
      customMessage.setSentAt(getUnixTimestamp());
      customMessage.setMuid(String(getUnixTimestamp()));
      CometChatMessageEvents.emit(CometChatMessageEvents.onMessageSent, {
        message: customMessage,
        status: messageStatus.inprogress,
      });

      launchBitlyBoard();
      playAudio(audio);

      CometChat.sendCustomMessage(customMessage)
        .then((message) => {
          const messageObject = { ...message };
          CometChatMessageEvents.emit(CometChatMessageEvents.onMessageSent, {
            message: messageObject,
            status: messageStatus.success,
          });
          // console.log("response?.minifiedText", response?.minifiedText);
        })
        .catch((error) => {
          console.error("response?.minifiedText", error);
        });
    }
  };

  const fetchUrlHandler = () => {
    CometChat.callExtension("url-shortener-bitly", "POST", "v1/shorten", {
      text: `${bitlyUrl?.value}`,
    })
      .then((response) => {
        // minifiedText in response
        //console.log("bitly resp", response);
        sendBitlyUrl(response);
      })
      .catch((error) => {
        // Error occured
        console.error("bitly err", error);
      });
  };

  const bitlyMessageComponent = (
    <>
      <div className="bitly--input" style={bitlyInputContainerStyle()}>
        <span
          style={{
            position: "absolute",
            top: "0px",
            right: "10px",
            fontSize: "30px",
            cursor: "pointer",
          }}
          onClick={launchBitlyBoard}
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
          onChange={(e) => setBitlyUrl(e.target)}
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
          onClick={fetchUrlHandler}
        >
          Send
        </button>
      </div>
    </>
  );

  const bitlyCustomViewMessage = (props) => {
    return props && props.messageObject.data.customData?.src ? (
      <>
        <div
          style={{ color: "red", padding: "5px 10px", wordBreak: "break-all" }}
        >
          {" "}
          {props?.messageObject?.data?.customData?.src}
        </div>
      </>
    ) : null;
  };

  /**
   * tinyURL custom message type
   */

  const sendTinyUrl = (response) => {
    if (response) {
      let receiverId = "superhero3";
      let receiverType = "user";
      const customData = {
        src: response,
      };
      const customType = "tinyurl";
      const customMessage = new CometChat.CustomMessage(
        receiverId,
        receiverType,
        customType,
        customData
      );
      customMessage.setSentAt(getUnixTimestamp());
      customMessage.setMuid(String(getUnixTimestamp()));
      CometChatMessageEvents.emit(CometChatMessageEvents.onMessageSent, {
        message: customMessage,
        status: messageStatus.inprogress,
      });

      launchTinyurlBoard();
      // playAudio(audio);

      CometChat.sendCustomMessage(customMessage)
        .then((message) => {
          const messageObject = { ...message };
          CometChatMessageEvents.emit(CometChatMessageEvents.onMessageSent, {
            message: messageObject,
            status: messageStatus.success,
          });
          // console.log("response?.minifiedText", response?.minifiedText);
        })
        .catch((error) => {
          console.error("response?.minifiedText", error);
        });
    }
  };
  const fetchTinyurlMessage = () => {
    if (tinyurl) {
      CometChat.callExtension("url-shortener-tinyurl", "POST", "v1/shorten", {
        text: `${tinyurl.value}`,
      })
        .then((response) => {
          // minifiedText in response
          sendTinyUrl(response?.minifiedText);
          setTinyUrl("");
        })
        .catch((error) => {
          // Error occured
          console.log("tinyurl error", error);
        });
    }
  };

  const launchTinyurlBoard = () => {
    setTinyUrl(!launchTinyurl);
  };

  const tinyurlMessageComponent = (
    <>
      <div className="bitly--input" style={bitlyInputContainerStyle()}>
        <span
          style={{
            position: "absolute",
            top: "0px",
            right: "10px",
            fontSize: "30px",
            cursor: "pointer",
          }}
          onClick={launchTinyurlBoard}
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
          onChange={(e) => setTinyurl(e.target)}
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
          onClick={fetchTinyurlMessage}
        >
          Send
        </button>
      </div>
    </>
  );

  const tinyurlCustomViewMessage = (props) => {
    // console.log("props bitly", props?.messageObject?.data?.customData?.src);
    return (
      <>
        <div
          style={{ color: "red", padding: "5px 10px", wordBreak: "break-all" }}
        >
          {" "}
          {props?.messageObject?.data?.customData?.src}
        </div>
      </>
    );
  };

  /***
   * stipop
   */

  const launchStipopBoard = () => {
    setLaunchStipop(!launchStipop);
  };

  const stipopCustomView = (props) => {
    return (
      <div className="gif--items" style={{ margin: "10px 3px" }}>
        <img
          src={props?.messageObject?.data?.customData?.src}
          alt="giphy"
          width="70"
          height="70"
        />
      </div>
    );
  };

  const sendStipopMessage = (e) => {
    if (e) {
      let receiverId = "superhero3";
      let receiverType = "user";
      const customData = {
        src: e.target.src,
      };
      const customType = "stipop";
      const customMessage = new CometChat.CustomMessage(
        receiverId,
        receiverType,
        customType,
        customData
      );
      customMessage.setSentAt(getUnixTimestamp());
      customMessage.setMuid(String(getUnixTimestamp()));
      CometChatMessageEvents.emit(CometChatMessageEvents.onMessageSent, {
        message: customMessage,
        status: messageStatus.inprogress,
      });

      playAudio(audio);
      CometChat.sendCustomMessage(customMessage)

        .then((message) => {
          const messageObject = { ...message };
          CometChatMessageEvents.emit(CometChatMessageEvents.onMessageSent, {
            message: messageObject,
            status: messageStatus.success,
          });
          launchStipopBoard();
        })
        .catch((error) => {});
    }
  };

  let stipopBoardList = stipopList?.map((item) => {
    return (
      <div
        key={item?.packageId}
        className="gif--items"
        style={{ margin: "10px 3px", cursor: "pointer" }}
      >
        <img
          key={item?.packageId}
          src={item?.packageImg}
          alt="Girl in a jacket"
          width="70"
          height="70"
          onClick={sendStipopMessage.bind(item)}
        />
      </div>
    );
  });

  let stipopBoardComponent = (
    <>
      <div
        onClick={launchStipopBoard}
        style={gfyCloseIconStyle()}
        className="closeIcon"
      >
        &times;
      </div>
      <div className="giphy--board" style={gifBoardStyle()}>
        {stipopBoardList}
      </div>
    </>
  );

  /**
   * tenor custom message types
   */
  React.useEffect(() => {
    const URL = "v1/trending?offset=1&limit=15";
    CometChat.callExtension("gifs-tenor", "GET", URL, null)
      .then((response) => {
        // GIFs data from Tenor
        //console.log("tenor response", response);
      })
      .catch((error) => {
        // Error occured
        //console.log("tenor error", error);
      });
  }, []);

  /**
   * live streaming
   */
  const liveStreaming = () => {
    CometChat.callExtension("broadcast", "POST", "v1/broadcast", {
      receiverType: "user",
      receiver: "superhero3",
    })
      .then((response) => {
        // Success response
        console.log("live video resp", response);
      })
      .catch((error) => {
        // Some error occured
        console.log("live video error", error);
      });
  };

  /**
   * reminder
   */

  /**
   * custom message types templates
   */

  let messageTypes = CometChatMessageTemplate.getDefaultTypes();
  // let messageTypes=[]
  let paymentTemplate = new CometChatMessageTemplate({
    type: "payment",
    icon: icon,
    name: "Payment",
    category: "custom messages",
    customView: customViewPayment,
    onActionClick: onActionClickPayment,
  });

  const textCustomView = () => {
    return <h3>hii</h3>;
  };

  let textTemplate = new CometChatMessageTemplate({
    type: "text",
    icon: icon,
    name: "Text",
    category: "messages",
    customView: textCustomView,
    // onActionClick: null,
  });

  let gifCustomTemplate = new CometChatMessageTemplate({
    type: "gfycats",
    icon: icon,
    name: "Gfycats",
    category: "custom messages",
    customView: gfycatsCustomView,
    onActionClick: launchGfycatsboard,
  });

  let giphyCustomTemplate = new CometChatMessageTemplate({
    type: "giphy",
    icon: icon,
    name: "Giphy",
    category: "custom messages",
    customView: giphyCustomView,
    onActionClick: launchGiphyBoard,
  });

  let bitlyCustomTemplate = new CometChatMessageTemplate({
    type: "bitly",
    icon: icon,
    name: "Bitly",
    category: "custom messages",
    customView: bitlyCustomViewMessage,
    onActionClick: launchBitlyBoard,
  });

  let tinyurlCustomTemplate = new CometChatMessageTemplate({
    type: "tinyurl",
    icon: icon,
    name: "Tinyurl",
    category: "custom messages",
    customView: tinyurlCustomViewMessage,
    onActionClick: launchTinyurlBoard,
  });

  let stipopCustomTemplate = new CometChatMessageTemplate({
    type: "stipop",
    icon: icon,
    name: "Stipop",
    category: "custom messages",
    customView: stipopCustomView,
    onActionClick: launchStipopBoard,
  });

  let liveStreamCustomTemplate = new CometChatMessageTemplate({
    type: "live stream",
    icon: icon,
    name: "Live",
    category: "custom messages",
    customView: null,
    onActionClick: liveStreaming,
  });

  let customMessageTypes = [
    ...messageTypes,
    paymentTemplate,
    gifCustomTemplate,
    giphyCustomTemplate,
    bitlyCustomTemplate,
    tinyurlCustomTemplate,
    stipopCustomTemplate,
    liveStreamCustomTemplate,
  ];

  messageTypes = [
    ...messageTypes,
    // textTemplate,
    paymentTemplate,
    // gifCustomTemplate,
    // giphyCustomTemplate,
    // bitlyCustomTemplate,
    // tinyurlCustomTemplate,
    // stipopCustomTemplate,
    // liveStreamCustomTemplate,
  ];

  Hook(setGroup, setUser, setGifList, setGiphy, setStipop);

  return (
    <div>
      <div className="button--links" style={headerContainerStyle()}>
        <NavLink
          title="loading"
          to="/"
          className="nav-link"
          style={navLinkStyle()}
        >
          Loading
        </NavLink>
        <NavLink
          title="empty"
          to="/empty"
          className="nav-link"
          style={navLinkStyle()}
        >
          Empty
        </NavLink>
        <NavLink
          title="error"
          to="/error"
          className="nav-link"
          style={navLinkStyle()}
        >
          Error
        </NavLink>
        <NavLink
          title="sound"
          to="/sound"
          className="nav-link"
          style={navLinkStyle()}
        >
          sound
        </NavLink>
        <NavLink
          title="alignment"
          to="/alignment"
          className="nav-link"
          style={navLinkStyle()}
        >
          alignment
        </NavLink>
        <NavLink
          title="message options"
          to="/options"
          className="nav-link"
          style={navLinkStyle()}
        >
          Message Options
        </NavLink>
        <NavLink
          title="message types"
          to="/message-types"
          className="nav-link"
          style={navLinkStyle()}
        >
          Message Types
        </NavLink>
        <NavLink
          title="theme"
          to="/theme"
          className="nav-link"
          style={navLinkStyle()}
        >
          Theme
        </NavLink>
        <NavLink
          title="bubble"
          to="/bubble"
          className="nav-link"
          style={navLinkStyle()}
        >
          Bubble
        </NavLink>
        <NavLink
          title="exclude message types"
          to="/exclude-message-types"
          className="nav-link"
          style={navLinkStyle()}
        >
          Exclude Message Types
        </NavLink>
      </div>
      <Routes>
        {/* <CustomLoadingState /> */}
        <Route exact path="/" element={<CustomLoadingState />} />
        <Route exact path="/empty" element={<CustomEmptyState />} />
        <Route exact path="/error" element={<CustomErrorState />} />
        <Route
          exact
          path="/sound"
          element={<CustomSoundManager messageTypes={messageTypes} />}
        />
        <Route exact path="/alignment" element={<MessageAlignment />} />
        <Route exact path="/options" element={<ExcludeMessageOptions />} />
        <Route
          exact
          path="/message-types"
          element={
            <CustomMessageTypes
              user={user}
              messageTypes={customMessageTypes}
              launchGfy={launchGfy}
              paymentMessageComponent={paymentMessageComponent}
              payment={launchPayment}
              gfycatsMessageComponent={gfycatsBoardComponent}
              giphyMessageComponent={giphyBoardComponent}
              launchGiphy={launchGiphy}
              launchBitly={launchBitly}
              bitlyMessageComponent={bitlyMessageComponent}
              launchTinyurl={launchTinyurl}
              tinyurlMessageComponent={tinyurlMessageComponent}
              launchStipop={launchStipop}
              stipopMessageComponent={stipopBoardComponent}
            />
          }
        />
        {/* GifycatBoard */}
        {/* CustomMessageTypes */}
        <Route exact path="/theme" element={<MessageTheme />} />
        <Route
          exact
          path="/bubble"
          element={<CustomMessageBubble messageTypes={messageTypes} />}
        />
        <Route
          exact
          path="/exclude-message-types"
          element={<ExcludeMessageTypes />}
        />
      </Routes>
    </div>
  );
};

export { Home };
