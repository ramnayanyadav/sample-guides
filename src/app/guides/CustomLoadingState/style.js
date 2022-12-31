export const customLoadingContainerStyle = () => {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };
};

export const loadingIconStyle = (icon) => {
  return {
    width: "34px",
    height: "34px",
    display: "inline-block",
    WebkitMask: `url(${icon}) center center no-repeat`,
    background: "red",
  };
};
export const loadingTextMessageStyle = () => {
  return {
    color: "rgba(20,20,20,0.8)",
    font: "900 22px Inter",
    textTransform: "capitalize",
    margin: "0",
  };
};
