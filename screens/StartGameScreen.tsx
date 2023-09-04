import { useState } from "react"
import { StyleSheet, TextInput, View, Alert, Text } from "react-native"
import Card from "../components/ui/Card"
import InstructionText from "../components/ui/instructionText"
import PrimaryButtons from "../components/ui/PrimaryButtons"
import Title from "../components/ui/Title"
import { Colors } from "../constants/colors"

const StartGameScreen = ({ onPickedNum }: { onPickedNum: (pickedNumer: number) => void }) => {
    const [enteredNum, setEnteredNum] = useState<string>("")

    const numberInputHandler = (enteredVal: string) => {
        setEnteredNum(enteredVal)
    }

    const resetInputHandler = () => {
        setEnteredNum("")
    }

    const confirmInput = () => {
        const chosenNumber = parseInt(enteredNum)

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                "Invalid Number!",
                "Number has to a number between 1 and 99.",
                [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
            )
            return;
        }
        onPickedNum(chosenNumber)

    }

    return (
        <View style={styles.rootContainer}>
            <Title title="Guess My Number" />
            <Card>
                <InstructionText>Enter a Number</InstructionText>
                <TextInput
                    style={styles.numberInput}
                    maxLength={2}
                    keyboardType="number-pad"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={numberInputHandler}
                    value={enteredNum}
                />
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButtons onPress={resetInputHandler}>Reset</PrimaryButtons>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButtons onPress={confirmInput}>Confirm</PrimaryButtons>
                    </View>
                </View>
            </Card>
        </View>
    )
}

export default StartGameScreen

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        marginTop: 100,
        alignItems: "center"
    },
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: "bold",
        textAlign: "center"
    },
    buttonsContainer: {
        flexDirection: "row"
    },
    buttonContainer: {
        flex: 1
    }
})