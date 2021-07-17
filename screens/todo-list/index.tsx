import React from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
} from "react-native-responsive-screen";
import dimensions from "../../constants/dimensions";
import { fetchTodo } from "../../server";

import showToast from "../../components/toast";


interface PropType {}
export default function TodoList(props: PropType) {
  const {data, isLoading } = fetchTodo()

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={data?.data.payload}
        keyExtractor={(_, index) => `${index}`}
        renderItem={(renderTodo) => {
          return (
            <View style={styles.itemContainer}>
              <Text style={styles.item}>{renderTodo.item.title}</Text>
              <View style={styles.actionStyle}>
                <Feather name="edit" size={WP(6)} color="blue" />
                <MaterialIcons
                  name="delete"
                  size={WP(6)}
                  color="red"
                  onPress={() => {
                    // handleDelete()
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
  },
  itemContainer: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    width: WP(dimensions.todoListPadding),
    padding: 3,
    marginVertical: WP(2),
    flexDirection: "row",
  },
  actionStyle: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    width: WP(18),
  },
});
