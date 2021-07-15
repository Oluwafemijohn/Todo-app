import React from "react";
import {FlatList, View, Text, StyleSheet} from "react-native";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { todoState } from "../store/todo";
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

interface PropType{};
export default function TodoList(props:PropType){
    // const [globalTodo, setGLobalTodo] = useSetRecoilState(todoState)
    const todoGlobalState = useRecoilValue(todoState)
    return(
        <View style={styles.container}>
             <FlatList 
             contentContainerStyle={styles.contentContainer}
             data={todoGlobalState} renderItem={(renderTodo)=>{
                 return(
                     <View style={styles.itemContainer}>
                         <Text style={styles.item}>{renderTodo.item.title}</Text>
                         <View style={styles.actionStyle}>
                         <Feather name="edit" size={24} color="black" />
                         <MaterialIcons name="delete" size={24} color="black" />
                         </View>
                     </View>
                 )
             }} 
             ListEmptyComponent={()=> <Text style={{marginTop: 40, fontSize: 18}}>List is empty</Text>} />
        </View>
       
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ccc"
    },
    contentContainer: {
        padding: 20,
        alignItems: "center",
    },
    item:{
        fontSize: 24,
        color: 'red',
        alignItems: "center"
    },
    itemContainer:{
        backgroundColor: "white",
        justifyContent: "center", 
        alignItems: "center",
        borderRadius: 2,
        width: 350,
        padding:3,
    },
    actionStyle:{
        padding: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        height: 30,
        width: 345,
        borderWidth:1, 
    }
})
