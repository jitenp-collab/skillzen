//Category File Matching  Based on Topics
export const categoryTopicsMap: Record<string, () => any> = {
  "React Native CLI": () =>
    require("../../assets/data/reactNativeCli/reactNativeCliTopics.json"),
  JavaScript: () =>
    require("../../assets/data/javascript/javascriptTopics.json"),
  TypeScript: () =>
    require("../../assets/data/typescript/typescriptTopics.json"),
  Python: () => require("../../assets/data/python/pythonTopics.json"),
  "Node.js": () => require("../../assets/data/nodejs/nodejsTopics.json"),
  Redux: () => require("../../assets/data/redux/reduxTopics.json"),
  Expo: () => require("../../assets/data/expo/expoTopics.json"),
  Git: () => require("../../assets/data/git/gitTopics.json"),
};

export const DEFAULT_CATEGORY = "React Native CLI";

//Selecting Lessons Based on Topics

//React native cli lessons

export const reactNativeCliLessonsMap: Record<string, () => any> = {
  "rn-cli-introduction": () =>
    require("../../assets/data/reactNativeCli/introductionLessons.json"),

  "rn-cli-architecture": () =>
    require("../../assets/data/reactNativeCli/architectureLessons.json"),

  "rn-cli-vs-expo": () =>
    require("../../assets/data/reactNativeCli/cliVsExpoLessons.json"),

  "rn-cli-environment-setup": () =>
    require("../../assets/data/reactNativeCli/environmentSetupLessons.json"),

  "rn-cli-project-structure": () =>
    require("../../assets/data/reactNativeCli/projectStructureLessons.json"),

  "rn-cli-metro-bundler": () =>
    require("../../assets/data/reactNativeCli/metroBundlerLessons.json"),

  "rn-cli-app-entry": () =>
    require("../../assets/data/reactNativeCli/appEntryPointLessons.json"),

  "rn-cli-components": () =>
    require("../../assets/data/reactNativeCli/componentsLessons.json"),

  "rn-cli-jsx": () =>
    require("../../assets/data/reactNativeCli/jsxLessons.json"),

  "rn-cli-props": () =>
    require("../../assets/data/reactNativeCli/propsLessons.json"),

  "rn-cli-state": () =>
    require("../../assets/data/reactNativeCli/stateLessons.json"),

  "rn-cli-styling": () =>
    require("../../assets/data/reactNativeCli/stylingLessons.json"),

  "rn-cli-flexbox": () =>
    require("../../assets/data/reactNativeCli/flexboxLessons.json"),

  "rn-cli-scroll-flatlist": () =>
    require("../../assets/data/reactNativeCli/scrollViewFlatListLessons.json"),

  "rn-cli-user-input": () =>
    require("../../assets/data/reactNativeCli/userInputLessons.json"),

  "rn-cli-navigation": () =>
    require("../../assets/data/reactNativeCli/navigationLessons.json"),

  "rn-cli-api-calls": () =>
    require("../../assets/data/reactNativeCli/apiCallsLessons.json"),

  "rn-cli-async-storage": () =>
    require("../../assets/data/reactNativeCli/asyncStorageLessons.json"),

  "rn-cli-native-modules": () =>
    require("../../assets/data/reactNativeCli/nativeModulesLessons.json"),

  "rn-cli-build-release": () =>
    require("../../assets/data/reactNativeCli/buildReleaseLessons.json"),

  "rn-cli-best-practices": () =>
    require("../../assets/data/reactNativeCli/bestPracticesLessons.json"),
};

export const DEFAULT_REACT_NATIVE_CLI_TOPIC = "rn-cli-introduction";

//Javascript Lessons
export const javaScriptLessonsMap: Record<string, () => any> = {
  "js-introduction": () =>
    require("../../assets/data/javascript/introductionLesson.json"),

  "js-variables": () =>
    require("../../assets/data/javascript/variablesLesson.json"),

  "js-operators": () =>
    require("../../assets/data/javascript/operatorsLesson.json"),

  "js-conditions": () =>
    require("../../assets/data/javascript/conditionsLesson.json"),

  "js-loops": () => require("../../assets/data/javascript/loopsLesson.json"),

  "js-functions": () =>
    require("../../assets/data/javascript/functionsLesson.json"),

  "js-arrays": () => require("../../assets/data/javascript/arraysLesson.json"),

  "js-objects": () =>
    require("../../assets/data/javascript/objectsLesson.json"),

  "js-es6": () => require("../../assets/data/javascript/es6Lesson.json"),

  "js-dom": () => require("../../assets/data/javascript/domLesson.json"),

  "js-asynchronous": () =>
    require("../../assets/data/javascript/asynchronousLesson.json"),

  "js-promises": () =>
    require("../../assets/data/javascript/promisesLesson.json"),

  "js-async-await": () =>
    require("../../assets/data/javascript/asyncAwaitLesson.json"),

  "js-error-handling": () =>
    require("../../assets/data/javascript/errorHandlingLesson.json"),

  "js-modules": () =>
    require("../../assets/data/javascript/modulesLesson.json"),

  "js-best-practices": () =>
    require("../../assets/data/javascript/bestPracticesLesson.json"),
};

export const DEFAULT_JAVASCRIPT_TOPIC = "js-introduction";

// Typescript Lessons
export const typeScriptLessonsMap: Record<string, () => any> = {
  "ts-introduction": () =>
    require("../../assets/data/typescript/introductionLesson.json"),

  "ts-installation-setup": () =>
    require("../../assets/data/typescript/installationSetupLesson.json"),

  "ts-basic-types": () =>
    require("../../assets/data/typescript/basicTypesLesson.json"),

  "ts-type-inference": () =>
    require("../../assets/data/typescript/typeInferenceLesson.json"),

  "ts-functions": () =>
    require("../../assets/data/typescript/functionsLesson.json"),

  "ts-interfaces": () =>
    require("../../assets/data/typescript/interfacesLesson.json"),

  "ts-type-alias": () =>
    require("../../assets/data/typescript/typeAliasLesson.json"),

  "ts-unions-intersections": () =>
    require("../../assets/data/typescript/unionsIntersectionsLesson.json"),

  "ts-generics": () =>
    require("../../assets/data/typescript/genericsLesson.json"),

  "ts-classes": () =>
    require("../../assets/data/typescript/classesLesson.json"),

  "ts-enums": () => require("../../assets/data/typescript/enumsLesson.json"),

  "ts-react-native": () =>
    require("../../assets/data/typescript/reactNativeLesson.json"),

  "ts-best-practices": () =>
    require("../../assets/data/typescript/bestPracticesLesson.json"),
};

export const DEFAULT_TYPESCRIPT_TOPIC = "ts-introduction";

//Python Lessons

export const pythonLessonsMap: Record<string, () => any> = {
  "python-introduction": () =>
    require("../../assets/data/python/introductionLesson.json"),

  "python-installation-setup": () =>
    require("../../assets/data/python/installationSetupLesson.json"),

  "python-syntax": () =>
    require("../../assets/data/python/syntaxBasicsLesson.json"),

  "python-variables-data-types": () =>
    require("../../assets/data/python/variablesDataTypesLesson.json"),

  "python-operators": () =>
    require("../../assets/data/python/operatorsLesson.json"),

  "python-conditions-loops": () =>
    require("../../assets/data/python/conditionsLoopsLesson.json"),

  "python-functions": () =>
    require("../../assets/data/python/functionsLesson.json"),

  "python-data-structures": () =>
    require("../../assets/data/python/dataStructuresLesson.json"),

  "python-oops": () => require("../../assets/data/python/oopsLesson.json"),

  "python-file-handling": () =>
    require("../../assets/data/python/fileHandlingLesson.json"),

  "python-exception-handling": () =>
    require("../../assets/data/python/exceptionHandlingLesson.json"),

  "python-modules-packages": () =>
    require("../../assets/data/python/modulesPackagesLesson.json"),

  "python-api-backend": () =>
    require("../../assets/data/python/apiBackendLesson.json"),

  "python-best-practices": () =>
    require("../../assets/data/python/bestPracticesLesson.json"),
};

export const DEFAULT_PYTHON_TOPIC = "python-introduction";

//Node.js Lessons

export const nodeJsLessonsMap: Record<string, () => any> = {
  "nodejs-introduction": () =>
    require("../../assets/data/nodejs/introductionLesson.json"),

  "nodejs-installation-setup": () =>
    require("../../assets/data/nodejs/installationSetupLesson.json"),

  "nodejs-runtime": () =>
    require("../../assets/data/nodejs/runtimeArchitectureLesson.json"),

  "nodejs-modules": () =>
    require("../../assets/data/nodejs/modulesLesson.json"),

  "nodejs-npm": () => require("../../assets/data/nodejs/npmLesson.json"),

  "nodejs-file-system": () =>
    require("../../assets/data/nodejs/fileSystemLesson.json"),

  "nodejs-events": () => require("../../assets/data/nodejs/eventsLesson.json"),

  "nodejs-express": () =>
    require("../../assets/data/nodejs/expressLesson.json"),

  "nodejs-rest-api": () =>
    require("../../assets/data/nodejs/restApiLesson.json"),

  "nodejs-database": () =>
    require("../../assets/data/nodejs/databaseLesson.json"),

  "nodejs-authentication": () =>
    require("../../assets/data/nodejs/authenticationLesson.json"),

  "nodejs-error-handling": () =>
    require("../../assets/data/nodejs/errorHandlingLesson.json"),

  "nodejs-best-practices": () =>
    require("../../assets/data/nodejs/bestPracticesLesson.json"),
};

export const DEFAULT_NODEJS_TOPIC = "nodejs-introduction";

// Redux Lessons

export const reduxLessonsMap: Record<string, () => any> = {
  "redux-introduction": () =>
    require("../../assets/data/redux/introductionLesson.json"),

  "redux-core-concepts": () =>
    require("../../assets/data/redux/coreConceptsLesson.json"),

  "redux-store": () => require("../../assets/data/redux/storeLesson.json"),

  "redux-actions": () => require("../../assets/data/redux/actionsLesson.json"),

  "redux-reducers": () =>
    require("../../assets/data/redux/reducersLesson.json"),

  "redux-dispatch": () =>
    require("../../assets/data/redux/dispatchLesson.json"),

  "redux-react-integration": () =>
    require("../../assets/data/redux/reactIntegrationLesson.json"),

  "redux-react-redux": () =>
    require("../../assets/data/redux/reactReduxLesson.json"),

  "redux-hooks": () => require("../../assets/data/redux/hooksLesson.json"),

  "redux-toolkit": () => require("../../assets/data/redux/toolkitLesson.json"),

  "redux-slices": () => require("../../assets/data/redux/slicesLesson.json"),

  "redux-async": () => require("../../assets/data/redux/asyncLesson.json"),

  "redux-middleware": () =>
    require("../../assets/data/redux/middlewareLesson.json"),

  "redux-best-practices": () =>
    require("../../assets/data/redux/bestPracticesLesson.json"),
};

export const DEFAULT_REDUX_TOPIC = "redux-introduction";

// Expo Lessons

export const expoLessonsMap: Record<string, () => any> = {
  "expo-introduction": () =>
    require("../../assets/data/expo/introductionLesson.json"),

  "expo-setup": () => require("../../assets/data/expo/setupLesson.json"),

  "expo-project-structure": () =>
    require("../../assets/data/expo/projectStructureLesson.json"),

  "expo-routing": () => require("../../assets/data/expo/routingLesson.json"),

  "expo-components": () =>
    require("../../assets/data/expo/componentsLesson.json"),

  "expo-apis": () => require("../../assets/data/expo/apisLesson.json"),

  "expo-media": () => require("../../assets/data/expo/mediaLesson.json"),

  "expo-device-features": () =>
    require("../../assets/data/expo/deviceFeaturesLesson.json"),

  "expo-notifications": () =>
    require("../../assets/data/expo/notificationsLesson.json"),

  "expo-storage": () => require("../../assets/data/expo/storageLesson.json"),

  "expo-build-deployment": () =>
    require("../../assets/data/expo/buildDeploymentLesson.json"),

  "expo-eas": () => require("../../assets/data/expo/easLesson.json"),

  "expo-config": () => require("../../assets/data/expo/configLesson.json"),

  "expo-best-practices": () =>
    require("../../assets/data/expo/bestPracticesLesson.json"),
};

export const DEFAULT_EXPO_TOPIC = "expo-introduction";

//Git Lessons

export const gitLessonsMap: Record<string, () => any> = {
  "git-introduction": () =>
    require("../../assets/data/git/introductionLesson.json"),

  "git-installation": () =>
    require("../../assets/data/git/installationLesson.json"),

  "git-basics": () => require("../../assets/data/git/basicsLesson.json"),

  "git-branching": () => require("../../assets/data/git/branchingLesson.json"),

  "git-merge": () => require("../../assets/data/git/mergeLesson.json"),

  "git-github": () => require("../../assets/data/git/githubLesson.json"),

  "git-workflow": () => require("../../assets/data/git/workflowLesson.json"),

  "git-advanced": () => require("../../assets/data/git/advancedLesson.json"),

  "git-best-practices": () =>
    require("../../assets/data/git/bestPracticesLesson.json"),
};

export const DEFAULT_GIT_TOPIC = "git-introduction";

export const lessonsMap: Record<string, () => any> = {
  ...reactNativeCliLessonsMap,
  ...javaScriptLessonsMap,
  ...typeScriptLessonsMap,
  ...pythonLessonsMap,
  ...nodeJsLessonsMap,
  ...reduxLessonsMap,
  ...expoLessonsMap,
  ...gitLessonsMap,
};
