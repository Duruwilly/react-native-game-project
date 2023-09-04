import { Text, StyleSheet } from "react-native"
import { Colors } from "../../constants/colors"

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
        // fontFamily: "open-sans-bold",
        fontWeight: "bold",
        color: "white",
        borderWidth: 2,
        borderColor: "white",
        padding: 12
    }
})