import React from "react"
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Platform, StatusBar } from "react-native"

import { Props } from "../navigation/navigation"
import { WebView } from "react-native-webview";

const GoogleScreen = ({ navigation }: Props) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableOpacity
                        style={styles.logoutBtn}
                        onPress={() => navigation.replace('Authorization')}
                    >
                        <Text style={styles.logoutText}>{'Logout'}</Text>
                    </TouchableOpacity>
                </View>
                <WebView
                    style={styles.container}
                    source={{ uri: 'https://google.com' }}
                />
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
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    topBar: {
        height: 30,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    logoutBtn: {
        padding: 5,
    },
    logoutText: {
        fontWeight: '600'
    }
})

export default GoogleScreen
