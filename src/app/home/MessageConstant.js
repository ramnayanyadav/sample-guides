export const ID = () => {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return "_" + Math.random().toString(36).substr(2, 9);
};

export const getUnixTimestamp = () => {
  return Math.round(+new Date() / 1000);
};

export const getExtensionsData = (message, extensionKey) => {
  if (message?.hasOwnProperty("metadata")) {
    const metadata = message.metadata;
    const injectedObject = metadata["@injected"];
    if (injectedObject && injectedObject.hasOwnProperty("extensions")) {
      const extensionsObject = injectedObject["extensions"];
      if (extensionsObject && extensionsObject.hasOwnProperty(extensionKey)) {
        return extensionsObject[extensionKey];
      }
    }
  }
};
