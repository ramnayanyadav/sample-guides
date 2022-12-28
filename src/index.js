import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { COMETCHAT_CONSTANTS } from "./CONSTANTS";
import { CometChat } from "@cometchat-pro/chat";

var appID = COMETCHAT_CONSTANTS.APP_ID;
var region = COMETCHAT_CONSTANTS.REGION;

var appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .build();
CometChat.init(appID, appSetting).then(
  () => {
    let user = "superhero1";
    if (user && user != " ") {
      var UID = user;
      var authKey = COMETCHAT_CONSTANTS.AUTH_KEY;
      // CometChat.logout().then(
      //   () => {
      //     console.log("Logout completed successfully");
      //   },
      //   (error) => {
      //     console.log("Logout failed with exception:", { error });
      //   }
      // );

      CometChat.getLoggedinUser().then(
        (user) => {
          if (!user) {
            CometChat.login(UID, authKey).then(
              (user) => {
                console.log("Login Successful:", { user });
              },
              (error) => {
                console.log("Login failed with exception:", { error });
              }
            );
          }
        },
        (error) => {
          console.log("Some Error Occured", { error });
        }
      );
    }

    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  },

  (error) => {
    console.log("Initialization failed with error:", error);
    // Check the reason for error and take appropriate action.
  }
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
