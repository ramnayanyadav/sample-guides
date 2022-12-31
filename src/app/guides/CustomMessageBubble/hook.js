import React from "react";
import { CometChat } from "@cometchat-pro/chat";

import { MetadataConstants, getExtensionsData } from "react-ui-kit-testing";

const Hook = (setGroup, setUser) => {
  React.useEffect(() => {
    /**
     * fetching perticular group
     */
    var GUID = "supergroup";
    CometChat.getGroup(GUID).then(
      (group) => {
        setGroup(group);
        console.log("Group details fetched successfully:", group);
      },
      (error) => {
        console.log("Group details fetching failed with exception:", error);
      }
    );

    /**
     * fetching perticualr user user
     */
    let UID = "superhero3";
    CometChat.getUser(UID).then(
      (user) => {
        setUser(user);
        console.log("User details fetched for user:", user);
      },
      (error) => {
        console.log("User details fetching failed with error:", error);
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

export { Hook };
