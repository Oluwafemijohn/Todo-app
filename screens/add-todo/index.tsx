import axios from "axios";
import React from "react";
import { useState } from "react";
import {View, Text, StyleSheet, Button, ActivityIndicator} from "react-native"
import { TextInput } from "react-native-gesture-handler";
import { END_POINT } from "../../constants";

export default function AddTodoScreen(){

    const [state, setState] = useState({title: "", description:""});

    const handleSubmitTodo = () => {
        axios.post(`${END_POINT}?ownerEmail=solomon@gmail.com`, state)
    }

    return(
        <View style={styles.container}>

            <TextInput placeholder="Please enter title" style={styles.input}
            onChangeText={(title)=>{setState({...state, title})}}
            />
            <TextInput placeholder="Please enter description" style={styles.input}
            onChangeText={(description)=>{setState({...state, description})}}
            />
            <Button title="submit" onPress={()=>{
            handleSubmitTodo()
            }}
            color="green" />
            {<ActivityIndicator color="red" />}
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
        margin: 10,
        borderRadius: 1,
        borderColor: "red"
    }
})