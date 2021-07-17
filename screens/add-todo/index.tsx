import axios from "axios";
import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Button } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import { END_POINT } from "../../constants";
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
} from "react-native-responsive-screen";
import showToast from "../../components/toast";
import { usePostTodo } from "../../server";

export default function AddTodoScreen() {
  const [state, setState] = useState({ title: "", description: "" });
  // Still working on this 
  // const [clearTextInput, setClearTextInput] = useState("");

  const {isLoading, mutateAsync} = usePostTodo()

  // New way of making network call
  const handleSubmitTodo2 = async () => {
    try {
      const response = await mutateAsync(state)
      showToast(response.data.message);
      // setClearTextInput("");
    } catch (error) {
      showToast(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputHeader}>Title</Text>
        <TextInput
          placeholder="Please enter title"
          style={styles.input}
          onChangeText={(title) => {
            setState({ ...state, title });
          }}
          selectTextOnFocus={true}
          // value={clearTextInput}
        />
        <Text style={styles.inputHeader}>Description</Text>
        <TextInput
          placeholder="Please enter description"
          style={styles.input}
          onChangeText={(description) => {
            setState({ ...state, description });
          }}
        />
      </View>
      <Button
        buttonStyle={styles.button}
        title="submit"
        onPress={() => {
          handleSubmitTodo2()
          setState({ title: "", description: "" })
        }}
      />
      {isLoading ? <ActivityIndicator color="red" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  input: {
    height: WP(8),
    fontSize: WP(3),
    width: WP(60),
    borderWidth: 2,
    borderRadius: 1,
    borderColor: "grey",
  },
  inputHeader: {
    marginTop: HP(2),
    width: WP(60),
    fontSize: WP(3),
  },
  inputContainer: {},
  button: {
    margin: HP(2),
    height: HP(5),
    width: WP(18),
    fontSize: WP(8),
  },
});
