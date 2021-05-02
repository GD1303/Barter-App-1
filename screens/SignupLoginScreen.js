import React from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import firebase from 'firebase';

import db from '../Config';

export default class SignupLoginScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            emailId: '',
            password: '',
        }
    }

    userLogin = (emailId, password) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(emailId, password)
        .then(() => {
            return alert('Login Successful.');
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            return alert(errorMessage);
        })
    }

    userSignUp = (emailId, password) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(emailId, password)
        .then((response) => {
            return alert('User Created Successfully.');
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            return alert(errorMessage);
        })
    }

    render() {
        return(
            <View style = { styles.container}>
                <View style = { styles.profileContainer }>
                    <Image
                        source = {require('../assets/barter.png')}
                        style = { styles.image } />
                    <Text style = { styles.title }>
                        Barter
                    </Text>
                    <Text style = { styles.subtitle }>
                        A Trading Method
                    </Text>
                </View>
                <View style = { styles.login }>
                    <Text style = { styles.tinyHeader }>
                        EMAIL ADDRESS
                    </Text>
                    <TextInput
                        style = { styles.loginBar }
                        keyboardType = 'email-address'
                        onChangeText = {(text) => {
                            this.setState({
                                emailId: text
                            })
                        }} />
                </View>
                <View>
                    <Text style = { styles.tinyHeader }>
                        PASSWORD
                    </Text>
                    <TextInput
                        style = { styles.loginBar }
                        secureTextEntry = { true }
                        onChangeText = {(text) => {
                            this.setState({
                                password: text
                            })
                        }} />
                </View>
                <View style = { styles.buttonContainer }>
                    <TouchableOpacity
                        style = { styles.button }
                        onPress = {() => {
                            this.userLogin(this.state.emailId, this.state.password)
                        }}>
                        <Text style = { styles.buttonText }>
                            LOGIN
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style = {[ styles.button, { marginTop: 10 } ]}
                        onPress = {() => {
                            this.userSignUp(this.state.emailId, this.state.password)
                        }}>
                        <Text style = { styles.buttonText }>
                            SIGN UP
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffe0b2',
        alignItems: 'center',
    },
    profileContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
        marginTop: 25,
    },
    title: {
        fontSize: 60,
        fontWeight: 300,
        fontFamily: "AvenirNext-Heavy",
        color: "#ff9800",
    },
    subtitle: {
        color: "#ff8a65",
    },
    tinyHeader: {
        color: '#ff5722',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginBar: {
        width: 300,
        height: 35,
        borderBottomWidth: 1.5,
        borderColor: "#ffab91",
        fontSize: 20,
        marginBottom: 20,
        marginTop: 5,
        color: "#ff8a65",
    },
    buttonContainer: {
        flex: 1,
    },
    button: {
        width: 300,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        backgroundColor: "#ffffff",
        elevation: 10,
    },
    buttonText: {
        color: "#ff5722",
        fontSize: 18,
        fontWeight: "bold",
    },
    image: {
        width: 150,
        height: 150,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: "#ff8a65",
    },
    login: {
        marginTop: 7,
    }
})