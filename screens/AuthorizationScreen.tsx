import React, { useState, useEffect } from "react"
import { SafeAreaView, StyleSheet, View, TouchableOpacity, TextInput, Text, Platform, StatusBar } from "react-native"

import { Props } from "../navigation/navigation";
import Toast from "react-native-root-toast";

const AIRTABLE_API_KEY = 'pate4IqnDlD2a4IMT.15a3e1e2d20481f6c091a425d48ccaf8079deb217c95870320681fa7c9c1538a'
const BASE_ID = 'appnT8fmhN91cS3Ff'

interface AuthPairs {
    login: string
    password: string
}

const AuthorizationScreen = ({ navigation }: Props) => {
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [authPairs, setAuthPairs] = useState<AuthPairs[]>([])
    const [loginOrRegistr, setLoginOrRegistr] = useState<boolean>(true)

    let Airtable = require('airtable');
    let base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(BASE_ID);

    const loginBtn = () => {
        let navigateJump = false
        for (let i = 0; i < authPairs.length; i++) {
            if (authPairs[i].login === login && authPairs[i].password === password) {
                navigateJump = true
                navigation.navigate('Google')
            }
        }
        if (!navigateJump) {
            Toast.show('Incorrect login or password.', {
                duration: 500,
            });
        }
    }

    const registrationMode = (mode: boolean) => {
        setLoginOrRegistr(mode)
    }

    const registrationBtn = () => {
        base('Table 1').create([
            {
                "fields": {
                    "Login": login,
                    "Password": password
                }
            },
        ], function (err: any) {
            if (err) {
                console.error(err);
                return;
            }
            navigation.navigate('Google')
        });
    }

    useEffect(() => {
        let tmpAuthPairs: AuthPairs[] = []
        base('Table 1').select({
            view: "Grid view"
        }).eachPage(function page(records: any[]) {
            records.forEach(function (record) {
                let log: string = record.get('Login')
                let pass: string = record.get('Password')
                tmpAuthPairs.push({ login: log, password: pass })
            });
            // fetchNextPage();
            setAuthPairs(tmpAuthPairs)
        }, function done(err: any) {
            if (err) { console.error(err); return; }
        })
    }, [])

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.inputFieldsContainer}>
                    <TextInput
                        style={styles.inputFields}
                        placeholder="Login"
                        value={login}
                        onChangeText={(text: string) => setLogin(text)}
                    />
                </View>
                <View style={styles.separator} />
                <View style={styles.inputFieldsContainer}>
                    <TextInput
                        style={styles.inputFields}
                        placeholder="Password"
                        value={password}
                        onChangeText={(text: string) => setPassword(text)}
                    />
                </View>
                <View style={styles.space} />
                {loginOrRegistr
                    ? <View style={{ width: '100%', alignItems: 'center' }}>
                        <TouchableOpacity
                            style={styles.registrationBtn}
                            onPress={() => registrationMode(false)}
                        >
                            <Text style={styles.registrationText}>Registration</Text>
                        </TouchableOpacity>
                        <View style={styles.separator} />
                        <TouchableOpacity
                            style={{
                                ...styles.loginBtn,
                                opacity: (login && password) ? 1 : 0.2
                            }}
                            onPress={() => loginBtn()}
                            disabled={(!login && !password)}
                        >
                            <Text style={styles.loginText}>{'Login'}</Text>
                        </TouchableOpacity>
                    </View>
                    : <View style={{ width: '100%', alignItems: 'center' }}>
                        <TouchableOpacity
                            style={styles.registrationBtn}
                            onPress={() => registrationMode(true)}
                        >
                            <Text style={styles.registrationText}>{'Login'}</Text>
                        </TouchableOpacity>
                        <View style={styles.separator} />
                        <TouchableOpacity
                            style={{
                                ...styles.loginBtn,
                                opacity: (login && password) ? 1 : 0.2
                            }}
                            onPress={() => registrationBtn()}
                            disabled={(!login && !password)}
                        >
                            <Text>{'Registration'}</Text>
                        </TouchableOpacity>
                    </View>
                }

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight! + 20 : 20,
        paddingBottom: 20,
    },
    inputFieldsContainer: {
        height: 40,
        width: '80%',
        borderWidth: 1,
        borderColor: 'grey',
        paddingHorizontal: 10,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    inputFields: {
        height: 40
    },
    separator: {
        height: 10,
    },
    space: {
        flex: 1
    },
    loginBtn: {
        height: 50,
        width: '50%',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    loginText: {
        fontSize: 15,
        fontWeight: '600'
    },
    registrationBtn: {
        padding: 5,
    },
    registrationText: {
        color: 'grey',
        textDecorationLine: 'underline'
    }
})

export default AuthorizationScreen
