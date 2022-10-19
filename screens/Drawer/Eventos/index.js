import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Eventos() {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={{ fontSize: 35 }}>Eventos</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
