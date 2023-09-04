import { StyleSheet, Text, TextStyle } from "react-native"
import { Colors } from "../../constants/colors"

const InstructionText = ({ children, style }: { children: string, style?: TextStyle }) => {
    return (
        <Text style={[styles.instructionText, style]}>{children}</Text>
    )
}

export default InstructionText

const styles = StyleSheet.create({
    instructionText: {
        fontFamily: "open-sans",
        color: Colors.accent500,
        fontSize: 24,
    },
})