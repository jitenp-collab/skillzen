import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadData = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);

    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log(`Error loading data for key: ${key}`, error);

    return null;
  }
};

export const StoreData = async (key: string, data: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log(`Error storing data for key: ${key}`, error);
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(`Error removing data for key: ${key}`, error);
  }
};
