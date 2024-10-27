import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { IconButton } from "react-native-paper";

const TodoScreen = () => {
  // State variables
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);

  // Handle adding a new todo item
  const handleAddTodo = () => {
    if (todo.trim().length === 0) return; // Ignore if the input is empty

    setTodoList((prevTodoList) => [
      ...prevTodoList,
      { id: Date.now().toString(), title: todo },
    ]);
    setTodo(""); // Reset the input field
  };

  // Handle delete Todo
  const handleDeleteTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  // Handle edit of the todo
  const handleEditTodo = (todo) => {
    setEditedTodo(todo);
    setTodo(todo.title);
  };

  // Handle Update todo
  const handleUpdateTodo = () => {
    const updatedTodos = todoList.map((item) => {
      if (item.id === editedTodo.id) {
        return { ...item, title: todo };
      }
      return item;
    });
    setTodoList(updatedTodos);
    setEditedTodo(null);
    setTodo("");
  };

  // Handle delete all tasks
  const handleDeleteAll = () => {
    setTodoList([]); // This line clears all tasks
  };

  // Render individual todo items
  const renderTodos = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: "#1e90ff",
          borderRadius: 8,
          paddingHorizontal: 6,
          paddingVertical: 12,
          marginBottom: 12,
          flexDirection: "row",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 1,
          shadowRadius: 2.8,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: "800",
            flex: 1,
          }}
        >
          {item.title}
        </Text>
        <IconButton
          icon="pencil"
          iconColor="#fff"
          onPress={() => handleEditTodo(item)}
        />
        <IconButton
          icon="trash-can"
          iconColor="#fff"
          onPress={() => handleDeleteTodo(item.id)}
        />
      </View>
    );
  };

  return (
    <View style={{ marginHorizontal: 16 }}>
      <Text
        style={{
          color: "#1e90ff",
          backgroundColor: "#000039",
          paddingHorizontal: 57,
          fontWeight: "800",
          fontSize: 40,
          alignSelf: "center",
          shadowColor: "#000",
          shadowOffset: { width: -3, height: 6 },
          shadowOpacity: 0.7,
          shadowRadius: 3,
        }}
      >
        Add Your Tasks
      </Text>
      <TextInput
        style={{
          marginTop: 25,
          borderWidth: 2,
          borderColor: "#1e90ff",
          borderRadius: 6,
          paddingVertical: 13,
          paddingHorizontal: 20,
        }}
        placeholder="Add Tasks Here..."
        value={todo}
        onChangeText={(userText) => setTodo(userText)}
      />
      {editedTodo ? (
        <TouchableOpacity
          style={{
            backgroundColor: "#000",
            borderRadius: 8,
            paddingVertical: 12,
            marginVertical: 10,
            alignItems: "center",
          }}
          onPress={handleUpdateTodo} // Correctly place the onPress attribute here
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "Bold",
              fontSize: 20,
            }}
          >
            Save
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: "#000",
            borderRadius: 8,
            paddingVertical: 12,
            marginVertical: 10,
            alignItems: "center",
          }}
          onPress={handleAddTodo} // Correctly place the onPress attribute here
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "Bold",
              fontSize: 20,
            }}
          >
            Add
          </Text>
        </TouchableOpacity>
      )}
      {/* Delete all IconButton */}
      {todoList.length > 0 && ( // Conditional rendering
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            borderRadius: 8,
            paddingVertical: 12,
            marginBottom: 35,
            alignItems: "center",
          }}
          onPress={handleDeleteAll}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "Bold",
              fontSize: 20,
            }}
          >
            Delete All
          </Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={todoList}
        renderItem={renderTodos}
        keyExtractor={(item) => item.id}
      />
      <Text style={styles.footerText}>Made with Love Hussain ❤️</Text>
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  footerText: {
    fontSize: 16,
    color: "#000", // Change to your desired text color
    textAlign: "center", // Center the text
  },
});
