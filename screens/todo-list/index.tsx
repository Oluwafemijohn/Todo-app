import React from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
} from "react-native-responsive-screen";
import dimensions from "../../constants/dimensions";
import { fetchTodo, useDeleteTodo } from "../../server";
import showToast from "../../components/toast";



// interface PropType {}
export default function TodoList(props:any) {
  const {data, isLoading } = fetchTodo()
  const {mutateAsync} = useDeleteTodo()

  const handleDelete = async (title:string) => {
    try {
      const response = await mutateAsync(title)
      showToast(response.data.message);
      // setClearTextInput("");
    } catch (error) {
      showToast(error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={data?.data.payload}
        keyExtractor={(ITodo, index) => `${index}`}
        renderItem={(renderTodo) => {
          return (
            <View style={styles.itemContainer}>
              <TouchableOpacity onPress={()=>{
                props.navigation.push('TodoDetail', renderTodo.item)
              }}>
              <Text style={styles.item}>{renderTodo.item.title}</Text>
              </TouchableOpacity>
              <View style={styles.actionStyle}>
                <Feather name="edit" size={WP(6)} color="blue"
                onPress={()=>
                  props.navigation.navigate('EditTodoScreen', renderTodo.item)
                }
                />
                <MaterialIcons
                  name="delete"
                  size={WP(6)}
                  color="red"
                  onPress={() => {
                    handleDelete(renderTodo.item.title)
                  }}
                />
              </View>
            </View>
          );
        }}
        ListEmptyComponent={() =>
          isLoading ? (
            <ActivityIndicator color="red" />
          ) : (
            <Text style={{ marginTop: HP(8), fontSize: WP(7) }}>
              List is empty
            </Text>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc",
  },
  contentContainer: {
    padding: 20,
    alignItems: "center",
  },
  item: {
    fontSize: WP(5),
    alignItems: "center",
    width: WP(70),
    padding: WP(2),
  },
  itemContainer: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    width: WP(dimensions.todoListPadding),
    padding: WP(0.5),
    marginVertical: WP(2),
    flexDirection: "row",

  },
  actionStyle: {
    padding: WP(1),
    flexDirection: "row",
    justifyContent: "space-between",
    width: WP(18),
  },
});
