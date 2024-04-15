import AsyncStorage from "@react-native-async-storage/async-storage";

const key = "to-do-list";

export const loadData = async () => {
  try {
    const str = await AsyncStorage.getItem(key);
    return str ? JSON.parse(str) : [];
  } catch (e) {
    console.error("Error in loading data: ", e);
    return [];
  }
};

export const saveData = async (task) => {
  try {
    let existingData = await loadData();
    existingData = existingData instanceof Array ? existingData : [];
    existingData.push(task);
    await AsyncStorage.setItem(key, JSON.stringify(existingData));
    console.log("saveData: ", existingData);
  } catch (e) {
    console.error("Error in saving data: ", e);
  }
};

export const deleteTask = async (taskToDelete) => {
    try {
      let existingData = await loadData();
      existingData = existingData.filter((task) => task.title !== taskToDelete.title);
      await AsyncStorage.setItem(key, JSON.stringify(existingData));
      console.log("Task deleted:", taskToDelete.title);
    } catch (e) {
      console.error("Error in deleting task: ", e);
    }
  };
  
