import axios from "axios";
import React from "react";
import { useState } from "react";
import {View, Text, StyleSheet, Button, ActivityIndicator} from "react-native"
import { TextInput } from "react-native-gesture-handler";
import { END_POINT } from "../../constants";

export default function AddTodoScreen(){

    const [state, setState] = useState({title: "", description:""});
    const [isLoading, setIsLoading] = useState(false)

    // Olden style of making network call 
    const handleSubmitTodo = () => {
        axios.post(`${END_POINT}?ownerEmail=solomon@gmail.com`, state)
        .then((response)=>{
            console.log(response.data)
            setIsLoading(false)
        }).catch(
            (error)=>{
                setIsLoading(false) 
                console.log(error)
            }
        )
        setIsLoading(true)
    }

    // New way of making network call
    const handleSubmitTodo2 = async () => {
        try {
            setIsLoading(true)
           const response = await  axios.post(`${END_POINT}?ownerEmail=solomon@gmail.com`, state)
           console.log(response.data)
           setIsLoading(false)
        } catch (error) {
            setIsLoading(false) 
        }
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
        margin: 10,
        borderRadius: 1,
        borderColor: "red"
    }
})