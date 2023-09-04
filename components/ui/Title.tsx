import { Text, StyleSheet, Platform } from "react-native"

const Title = ({ title }: { title: string }) => {
    return (
        <Text style={styles.title}>{title}</Text>
    )
}

export default Title

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        textAlign: "center",
        fontFamily: "open-sans-bold",
        // fontWeight: "bold",
        color: "white",
        // borderWidth: Platform.OS === "android" ? 2 : 0,
        borderWidth: Platform.select({ ios: 0, android: 2 }),
        borderRadius: 2,
        borderColor: "white",
        padding: 12,
        maxWidth: "80%",
        width: 300
    }
})