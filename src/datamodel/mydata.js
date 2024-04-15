import AsyncStorage from "@react-native-async-storage/async-storage";

export const key = "to-do-list";


export const loadData = async () => {
  try {
    const str = await AsyncStorage.getItem(key);
    let data = str ? JSON.parse(str) : [];
    // Ensure each task has an id property
    data = data.map((task, index) => ({ ...task, id: index.toString() }));
    return data;
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
  } catch (e) {
    console.error("Error in saving data: ", e);
  }
};

export const deleteTask = async (taskId) => {
    try {
      let existingData = await loadData();
      existingData = existingData.filter((task) => task.id !== taskId); // Filter tasks based on ID
      await AsyncStorage.setItem(key, JSON.stringify(existingData));
      
    } catch (e) {
      
    }
  };
  
