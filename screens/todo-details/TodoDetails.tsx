import React from "react";
import {View, Text, StyleSheet} from 'react-native';
import {widthPercentageToDP as WP, heightPercentageToDP as HP} from 'react-native-responsive-screen'


export default function TodoDetail({route}){
    const {title, description} = route.params;

    return(
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: WP(90),
        flex: 1,
        alignItems: "center",
    },
    title:{
        marginTop: WP(5),
        fontSize: WP(8),
        borderWidth: 2,
        borderColor: "green",
        padding: WP(2),
        borderRadius: 10,
    }, 
    description:{
        backgroundColor: "white",
        fontSize: WP(6),
        marginTop: WP(5),
        padding: WP(2),
    }
})