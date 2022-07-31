import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Calendario() {
    return (
        <View style={styles.container}>
            <StatusBar style='light' backgroundColor="#0289e0" />
            <Text style={{ fontSize: 35 }}>Calendario</Text>
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
