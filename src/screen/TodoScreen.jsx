import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { IconButton, MD3Colors } from "react-native-paper";

const TodoScreen = () => {
  // State variables
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  // Handle adding a new todo item
  const handleAddTodo = () => {
    if (todo.trim().length === 0) return; // Ignore if the input is empty

    setTodoList((prevTodoList) => [
      ...prevTodoList,
      { id: Date.now().toString(), title: todo },
    ]);
    setTodo(""); // Reset the input field
  };
  //handle delete Todo

  const handleDeleteTodo = (id)=>{
    const updatedTodoList = todoList.filter((todo)=>todo.id !== id);

    setTodoList(updatedTodoList);
  }

  // Render individual todo items
  const renderTodos = ({ item, index }) => {
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
        <IconButton icon="pencil" iconColor="#fff" />
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

      <TouchableOpacity
        style={{
          backgroundColor: "#000",
          borderRadius: 8,
          paddingVertical: 12,
          marginVertical: 34,
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

      <FlatList
        data={todoList}
        renderItem={renderTodos}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({});
