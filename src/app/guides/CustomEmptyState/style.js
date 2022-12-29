export const customEmptyContainerStyle = () => {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };
};

export const emptyIconStyle = (icon) => {
  return {
    width: "24px",
    height: "24px",
    display: "inline-block",
    WebkitMask: `url(${icon}) center center no-repeat`,
    background: "red",
  };
};
export const emptyTextMessageStyle = () => {
  return {
    color: "rgba(20,20,20,0.8)",
    font: "900 22px Inter",
    textTransform: "capitalize",
    margin: "0",
  };
};
