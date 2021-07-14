import React from "react";
import {FlatList, View, Text, StyleSheet} from "react-native";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { todoState } from "../store/todo";

interface PropType{};
export default function TodoList(props:PropType){
    // const [globalTodo, setGLobalTodo] = useSetRecoilState(todoState)
    const todoGlobalState = useRecoilValue(todoState)
    return(
        <View style={styles.container}>
             <FlatList 
             contentContainerStyle={styles.contentContainer}
             data={todoGlobalState} renderItem={(renderTodo)=>{
                 return(<Text>{renderTodo.item.title}</Text>)
             }} 
             ListEmptyComponent={()=> <Text style={{marginTop: 40, fontSize: 18}}>List is empty</Text>} />
        </View>
       
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        flex: 1,  
        alignItems: "center",
        justifyContent: "center"
    }
})
