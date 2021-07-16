import axios from "axios";
import React from "react";
import { useState } from "react";
import {View, Text, StyleSheet, Button, ActivityIndicator} from "react-native"
import { TextInput } from "react-native-gesture-handler";
import { END_POINT } from "../../constants";
import {widthPercentageToDP as WP, heightPercentageToDP as HP} from "react-native-responsive-screen";
import showToast from "../../components/toast";


export default function AddTodoScreen(){

    const [state, setState] = useState({title: "", description:""});
    const [isLoading, setIsLoading] = useState(false)

    // New way of making network call
    const handleSubmitTodo2 = async () => {
        try {
            setIsLoading(true)
           const response = await  axios.post(`${END_POINT}?ownerEmail=solomon@gmail.com`, state)
           showToast(response.data.message)
           setIsLoading(false)
        } catch (error) {
            showToast(error)
            setIsLoading(false) 
        }
    }

    return(
        <View style={styles.container}>

            <TextInput 
             placeholder="Please enter title" style={styles.input}
            onChangeText={(title)=>{setState({...state, title})}}
            selectTextOnFocus= {true}
            />
            <TextInput placeholder="Please enter description" style={styles.input}
            onChangeText={(description)=>{setState({...state, description})}}
            />
            <Button title="submit" onPress={()=>{
            handleSubmitTodo2()
            }}
            color="green" />
            {/* tenarry operator */}
            {isLoading? <ActivityIndicator color="red" />: null}
            {/* Conditional render */}
            {/* {isLoading && <ActivityIndicator color="red" />}  */}

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,  
        backgroundColor: 'white',
        alignItems: "center"
    },
    input:{
        margin: HP(1),
        borderRadius: 1,
        borderColor: "red"
    },
    inputFocus:{
        borderStartColor: "red"
    }
})