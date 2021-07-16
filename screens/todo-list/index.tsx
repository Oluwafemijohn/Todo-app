import React, { useEffect, useState } from "react";
import {FlatList, View, Text, StyleSheet, ActivityIndicator} from "react-native";
import { useRecoilState } from "recoil";
import { todoState } from "../store/todo";
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {widthPercentageToDP as WP, heightPercentageToDP as HP} from "react-native-responsive-screen";
import dimensions from "../../constants/dimensions";
import axios from "axios";
import { END_POINT } from "../../constants";
import showToast from "../../components/toast";
// import colors from 'constants'

interface PropType{};
export default function TodoList(props:PropType){
    const [globalTodo, setGlobalTodo] = useRecoilState(todoState)
    // const todoGlobalState = useRecoilValue(todoState)
    // const [state, setState] = useState({title: "", description:""});
    const [isLoading, setIsLoading] = useState(false)
    const [state, setState] = useState([])

    const fetchTodo = async () => {
        try {
            setIsLoading(true)
           const response = await  axios.get(`${END_POINT}?ownerEmail=solomon@gmail.com`)
           console.log(response.data)
           setGlobalTodo(response.data.payload)
           showToast(response.data.message)
           console.log(response.data)
           setIsLoading(false)
        } catch (error) {
            showToast(error)
            setIsLoading(false) 
        }
    }

    useEffect(()=>{
        fetchTodo()
    }, [])

    return(
        <View style={styles.container}>
             <FlatList 
             contentContainerStyle={styles.contentContainer}
             data={globalTodo} renderItem={(renderTodo)=>{
                 return(
                     <View style={styles.itemContainer}>
                         <Text style={styles.item}>{renderTodo.item.title}</Text>
                         <View style={styles.actionStyle}>
                         <Feather name="edit" size={WP(6)} color="black" />
                         <MaterialIcons name="delete" size={WP(6)} color="black" />
                         </View>
                     </View>
                 )
             }} 
             ListEmptyComponent={()=> isLoading? <ActivityIndicator color="red" />: <Text style={{marginTop: HP(8), fontSize: WP(7)}}>List is empty</Text>} />
        </View>
       
    );
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
        fontSize: WP(5),
        alignItems: "center"
    },
    itemContainer:{
        backgroundColor: "white",
        justifyContent: "center", 
        alignItems: "center",
        borderRadius: 2,
        width: WP(dimensions.todoListPadding),
        padding:3,
        marginVertical: WP(2)
    },
    actionStyle:{
        padding: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        // height: HP(dimensions.actionStyleHeight),
        width: WP(dimensions.todoListPadding),
    }
})
