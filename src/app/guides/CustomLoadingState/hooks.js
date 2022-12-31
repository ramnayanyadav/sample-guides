import React from "react";
import { CometChat } from "@cometchat-pro/chat";

//import audio from "./resources/audio.mp3";

const Hooks = (setUser, setGroup) => {
  React.useEffect(() => {
    /**
     * fetching perticular group
     */
    var GUID = "supergroup";
    CometChat.getGroup(GUID).then(
      (group) => {
        setGroup(group);
      },
      (error) => {
        console.error(error);
      }
    );

    /**
     * fetching perticualr user user
     */
    let UID = "superhero3";
    CometChat.getUser(UID).then(
      (user) => {
        setUser(user);
      },
      (error) => {
        console.error(error);
      }
    );
    // CometChat.logout().then(
    //   () => {
    //     console.log("Logout completed successfully");
    //   },
    //   (error) => {
    //     console.log("Logout failed with exception:", { error });
    //   }
    // );
  }, []);
};

export { Hooks };
