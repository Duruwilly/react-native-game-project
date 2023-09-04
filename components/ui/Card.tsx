import { StyleSheet, View } from "react-native"
import { Colors } from "../../constants/colors"

const Card = ({ children }: { children: React.ReactNode }) => {
    return (
        <View style={styles.inputContainer}>{children}</View>
    )
}

export default Card

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        marginTop: 36,
        marginHorizontal: 24,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elevation: 4,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 1
    },
})