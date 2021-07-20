import axios from "axios";
import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Button } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
} from "react-native-responsive-screen";
import showToast from "../components/toast";
import { useUpdateTodo } from "../server";

export default function EditTodoScreen({ route }) {
  const { title, description } = route.params
  const [state, setState] = useState({titleToUpdate: title, title: "", description: "" });

  // Still working on this 
  // const [clearTextInput, setClearTextInput] = useState("");

  const {isLoading, mutateAsync} = useUpdateTodo()

  // New way of making network call
  const handleSubmitUpdatedTodo = async () => {
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
      <View>
        <Text style={styles.inputHeader}>Title</Text>
        <TextInput
          placeholder="Please enter title"
          style={styles.input}
          allowFontScaling
          onChangeText={(title) => {
            setState({ ...state, title });
            {console.log(title)}
          }}
          selectTextOnFocus={true}
          // value={clearTextInput}
          value={title}
        />
        <Text style={styles.inputHeader}>Description</Text>
        <TextInput
          placeholder="Please enter description"
          style={styles.input}
          onChangeText={(description) => {
            setState({ ...state, description });
          }}
          value={description}
        />
      </View>
      <Button
        buttonStyle={styles.button}
        title="submit"
        onPress={() => {
          handleSubmitUpdatedTodo()
          // setState({titleToUpdate: title, title: "", description: "" })
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
    height: WP(12),
    fontSize: WP(5),
    width: WP(60),
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "grey",
  },
  inputHeader: {
    marginTop: HP(2),
    width: WP(60),
    fontSize: WP(4),
  },

  button: {
    margin: HP(2),
    height: HP(5),
    width: WP(18),
    fontSize: WP(8),
  },
});
