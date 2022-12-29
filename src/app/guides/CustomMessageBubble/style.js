export const messageTextStyle = (linkPreviewData) => {
  let prop = linkPreviewData && linkPreviewData?.links[0] ? "none" : "block";

  return {
    display: prop,
    padding: "8px",
    textTransform: "capitalize",
    color: "red",
    background: "#d4a373",
    borderRadius: "5px 5px 5px 0 ",
  };
};

export const linkPreviewStyle = (linkPreviewData) => {
  let prop = linkPreviewData && linkPreviewData?.links[0] ? "block" : "none";

  return {
    display: prop,
  };
};

export const paymentContainerStyle = () => {
  return {
    padding: "8px",
    background: "transparent",
  };
};
