import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Screens from "../screens/screens";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
} from "react-native-responsive-screen";

const TodoStack = createStackNavigator();
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <TodoStack.Navigator mode="modal">
        <TodoStack.Screen
          name="TodoListScreen"
          component={Screens.TodoListScreen}
          options={(data) => ({
            headerTitle: "Todo List",
            headerRight: () => (
              <Ionicons
                name="add-circle"
                size={WP(5)}
                color="green"
                onPress={() => {
                  data.navigation.push("AddTodoScreen");
                }}
              />
            ),
          })}
        />

        <TodoStack.Screen
          name="AddTodoScreen"
          component={Screens.AddTodoScreen}
          options={(data) => ({
            headerTitle: "Add Todo",
          })}
        />

        <TodoStack.Screen
          name="EditTodoScreen"
          component={Screens.EditTodoScreen}
          options={(data) => ({
            headerTitle: "Edit Todo",
          })}
        />
      </TodoStack.Navigator>
    </NavigationContainer>
  );
}
