
export const categoryTopicsMap: Record<string, () => any> = {
  "React Native CLI": () => require("../../assets/data/reactNativeCli/reactNativeCliTopics.json"),
  "JavaScript":       () => require("../../assets/data/javascript/javascriptTopics.json"),
  "TypeScript":       () => require("../../assets/data/typescript/typescriptTopics.json"),
  "Python":           () => require("../../assets/data/python/pythonTopics.json"),
  "Node.js":          () => require("../../assets/data/nodejs/nodejsTopics.json"),
  "Redux":            () => require("../../assets/data/redux/reduxTopics.json"),
  "Expo":             () => require("../../assets/data/expo/expoTopics.json"),
  "Git":              () => require("../../assets/data/git/gitTopics.json"),
};

export const DEFAULT_CATEGORY = "React Native CLI";


