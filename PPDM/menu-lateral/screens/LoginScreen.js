import React, { useState } from "react";

import { View, Text, TextInput, Button, StyleSheet } from "react-native";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login realizado com sucesso!");
            navigation.navigate("Home");
        } catch (error) {

            alert("Erro ao fazer login: " + error.message);
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput style={styles.input} placeholder="Email"
                onChangeText={setEmail} />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                onChangeText={setPassword}
            />
            <Button title="Entrar" onPress={handleLogin} />
            <Button title="Cadastrar" onPress={() =>
                navigation.navigate("Register")} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
    input: {
        borderWidth: 1, marginBottom: 10, padding: 10,
        borderRadius: 5
    },
});