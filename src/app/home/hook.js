import React from "react";
import { CometChat } from "@cometchat-pro/chat";

const Hook = (setGroup, setUser, setGifList, setGiphy, setStipop) => {
  React.useEffect(() => {
    /**stipop  */
    let lang = "english";
    let limit = 20;
    let pageNumber = 1;
    let contryCode = "US";

    const qs = `?lang=${lang}&limit=${limit}&pageNumber=${pageNumber}&countryCode=${contryCode}`;

    CometChat.callExtension("stickers-stipop", "GET", "v1/trending" + qs, null)
      .then((response) => {
        // Stickers in response
        //console.log("stipop resp", response);
        setStipop(response.packageList);
      })
      .catch((error) => {
        // Error occured
        console.log("stipop error", error);
      });

    /**giphy */
    const URLgiphy = "v1/trending?offset=1&limit=15";
    CometChat.callExtension("gifs-giphy", "GET", URLgiphy, null)
      .then((response) => {
        // GIFs data from Giphy
        //console.log("giphy resp", response);
        setGiphy(response.data);
      })
      .catch((error) => {
        // Error occured
        console.error("giphy resp", error);
      });
    /** gfycats */
    const URLgfycats = "v1/trending?cursor=0";
    CometChat.callExtension("gifs-gfycat", "GET", URLgfycats, null)
      .then((response) => {
        // GIFs data from Gfycat
        //console.log("gif", response);
        setGifList(response);
      })
      .catch((error) => {
        // Error occured
      });
    /**
     * fetching perticular group
     */
    var GUID = "supergroup";
    CometChat.getGroup(GUID).then(
      (group) => {
        setGroup(group);
        //console.log("Group details fetched successfully:", group);
      },
      (error) => {
        console.error("Group details fetching failed with exception:", error);
      }
    );

    /**
     * fetching perticualr user user
     */
    let UID = "superhero3";
    CometChat.getUser(UID).then(
      (user) => {
        setUser(user);
        //console.log("User details fetched for user:", user);
      },
      (error) => {
        console.error("User details fetching failed with error:", error);
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
