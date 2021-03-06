import React, { useState, useEffect } from "react";
import {
    Button,
    Text,
    View,
    StyleSheet,
    FlatList,
    ToolbarAndroid,
    ScrollView,
    Dimensions,
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity
} from "react-native";
import TodoItem from "../components/todoItem";
import AddTodo from "../components/addTodo";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

var googleResponse = require('./Analyze').googleResArr;
var todoArr = [];
exports.todoArr = todoArr;


export default function UI({ navigation }) {

    const goToAnalyze = () => {
        navigation.push("Analyze");
    };

    const [todos, setTodos] = useState([]);

    const pressHandler = (key) => {
        setTodos((prevTodos) => {
            return prevTodos.filter((todo) => todo.key != key);
        });
        for (let i = 0; i < todoArr.length; i++) {
            if (todoArr[i] == key) {
                todoArr.splice(i, 1);
                todoArr.splice(i, 1);
            }
        }
    };

    const submitHandler = (text) => {
        if (text.length != 0) {
            let key = Math.random().toString();
            setTodos((prevTodos) => {
                return [{ text: text, key: key }, ...prevTodos];
            });
            todoArr.push(key);
            todoArr.push(text);
        } else {
            Alert.alert("Nothing Entered!", "Type some text before hitting add.", [
                { text: "OK", onPress: () => console.log("Alert Closed!") },
            ]);
        }
    };

    useEffect(() => console.log(todoArr));

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <View style={styles.container}>
                <ScrollView keyboardShouldPersistTaps={"handled"}>
                    <View style={styles.content}>
                        {
                            googleResponse.length != 0 ? console.log("googleResponse has the following contents: \n" + googleResponse) : console.log("googleResponse is empty.")
                        }
                        <AddTodo submitHandler={submitHandler} />
                        <View style={styles.list}>
                            <FlatList
                                data={todos}
                                renderItem={({ item }) => (
                                    <TodoItem item={item} pressHandler={pressHandler} />
                                )}
                            />
                        </View>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={goToAnalyze}
                            style={{
                                backgroundColor: "maroon",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 10,
                                borderRadius: 10,
                            }}
                        >
                            <Text style={{ color: "white" }}>Camera</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
    content: {

    },
    list: {
        borderWidth: 5,
        borderColor: "maroon",
        marginTop: 20,
        height: 600,
        width: 350,
        padding: 10,
        justifyContent: "center",
    },
    button: {
        flex: 1,
        justifyContent: "center",
        marginLeft: (screenWidth - 200) / 2,
        marginRight: (screenWidth - 200) / 2,
        marginTop: 50,
    },
});
