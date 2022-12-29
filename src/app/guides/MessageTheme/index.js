import React from "react";
import {
  CometChatConversationsWithMessages,
  CometChatTheme,
  Palette,
} from "react-ui-kit-testing";

import {
  alignmentContainerStyle,
  buttonContainerStyle,
  buttonStyle,
} from "../MessageAlignment/style.js";

import { Hook } from "./hook";

const MessageTheme = () => {
  const [user, setUser] = React.useState(null);
  const [group, setGroup] = React.useState(null);

  const [bool, setTheme] = React.useState(false);

  const customAlignmentHandler = () => {
    setTheme(false);
  };

  const defaultAlignmentHandler = () => {
    setTheme(true);
  };

  const theme = new CometChatTheme({
    palette: new Palette({
      mode: "dark",
      background: {
        light: "#fff",
        dark: "#432818",
      },
      primary: {
        light: "#dda15e",
        dark: "#dda15e",
      },

      accent500: {
        light: "#fff",
        dark: "#432818",
      },
      accent600: {
        light: "#fff",
        dark: "#39f",
      },
      accent: {
        light: "#bc6c25",
        dark: "#B6F0D3",
      },
      accent100: {
        light: "#fff",
        dark: "#432818",
      },
      accent50: {
        light: "#9e2a2b",
        dark: "#141414",
      },
      accent900: {
        light: "ef476f",
        dark: "black",
      },
    }),
  });

  Hook(setGroup, setUser);
  return user ? (
    <div style={alignmentContainerStyle()}>
      <div>
        <CometChatConversationsWithMessages
          user={user}
          style={{ width: "700px", height: "400px", border: "1px solid black" }}
          theme={!bool ? theme : null}
        />
      </div>
      <div style={buttonContainerStyle()}>
        <button onClick={defaultAlignmentHandler} style={buttonStyle()}>
          default theme
        </button>
        <button onClick={customAlignmentHandler} style={buttonStyle()}>
          custom theme
        </button>
      </div>
    </div>
  ) : null;
};

export { MessageTheme };
