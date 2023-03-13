import React, { useState } from "react"
import { SafeAreaView, StyleSheet, View, TouchableOpacity, TextInput, Text, ToastAndroid } from "react-native"
import Airtable from 'airtable';
import { useEffect } from 'react';
import { Props } from "../navigation/navigation";

Airtable.configure({ apiKey: 'pate4IqnDlD2a4IMT.15a3e1e2d20481f6c091a425d48ccaf8079deb217c95870320681fa7c9c1538a' })
const AIRTABLE_API_KEY = 'pate4IqnDlD2a4IMT.15a3e1e2d20481f6c091a425d48ccaf8079deb217c95870320681fa7c9c1538a'

interface AuthPairs {
    login: string
    password: string
}

const AuthorizationScreen = ({route, navigation}: Props) => {
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [authPairs, setAuthPairs] = useState<AuthPairs[]>([])

    const loginBtn = () => {
        for (let i = 0; i < authPairs.length; i++) {
            if (authPairs[i].login === login && authPairs[i].password === password) {
                navigation.navigate('Google')
            } else {
                ToastAndroid.show('Request sent successfully!', ToastAndroid.SHORT);
            }
        }
        console.log('authPairs', authPairs)
    }

    useEffect(() => {
        console.log(navigation)
        let tmpAuthPairs: AuthPairs[] = []
        var Airtable = require('airtable');
        var base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base('appnT8fmhN91cS3Ff');

        base('Table 1').select({
            view: "Grid view"
        }).eachPage(function page(records: any[]) {
            records.forEach(function (record) {
                let log: string = record.get('Login')
                let pass: string = record.get('Password')
                tmpAuthPairs.push({login: log, password: pass})
                // console.log('Login:', record.get('Login'))
                // console.log('Password:', record.get('Password'))
            });

            // fetchNextPage();
            setAuthPairs(tmpAuthPairs)

        }, function done(err) {
            if (err) { console.error(err); return; }
        })
        console.log('---------------------------------')
    }, [])

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.inputFields}>
                    <TextInput
                        placeholder="Login"
                        value={login}
                        onChangeText={(text: string) => setLogin(text)}
                    />
                </View>
                <View style={styles.separator} />
                <View style={styles.inputFields}>
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={(text: string) => setPassword(text)}
                    />
                </View>
                <View style={styles.space} />
                <TouchableOpacity
                    style={{ ...styles.loginBtn, opacity: (login && password) ? 1 : 0.2 }}
                    onPress={() => loginBtn()}
                    disabled={(!login && !password)}
                >
                    <Text style={styles.loginText}>{'Login'}</Text>
                </TouchableOpacity>
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
        paddingVertical: 20,
    },
    inputFields: {
        height: 40,
        width: '80%',
        borderWidth: 1,
        borderColor: 'grey',
        paddingHorizontal: 10,
        justifyContent: 'center',
        backgroundColor: '#fff'
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
    }
})

export default AuthorizationScreen
