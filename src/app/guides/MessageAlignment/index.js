import React from "react";
import { CometChatMessageList } from "react-ui-kit-testing";
import { Hook } from "./hook";

import {
  alignmentContainerStyle,
  buttonContainerStyle,
  buttonStyle,
} from "./style.js";

const MessageAlignment = () => {
  const [user, setUser] = React.useState(null);
  const [group, setGroup] = React.useState(null);
  const [alignment, setAlignment] = React.useState("standard");

  const standardAlignmentHandler = () => {
    setAlignment("standard");
  };

  const leftAlignmentHandler = () => {
    setAlignment("leftAligned");
  };

  Hook(setGroup, setUser);

  return user ? (
    <div style={alignmentContainerStyle()}>
      <div>
        <CometChatMessageList
          user={user}
          alignment={`${alignment}`} //['standard','leftAligned']
          style={{ width: "700px", height: "400px", border: "1px solid black" }}
        />
      </div>
      <div style={buttonContainerStyle()}>
        <button onClick={standardAlignmentHandler} style={buttonStyle()}>
          standard
        </button>
        <button onClick={leftAlignmentHandler} style={buttonStyle()}>
          Left-Aligned
        </button>
      </div>
    </div>
  ) : null;
};

export { MessageAlignment };
