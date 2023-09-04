import { useState } from "react"
import { StyleSheet, TextInput, View, Alert, useWindowDimensions, KeyboardAvoidingView, ScrollView } from "react-native"
import Card from "../components/ui/Card"
import InstructionText from "../components/ui/instructionText"
import PrimaryButtons from "../components/ui/PrimaryButtons"
import Title from "../components/ui/Title"
import { Colors } from "../constants/colors"

const StartGameScreen = ({ onPickedNum }: { onPickedNum: (pickedNumer: number) => void }) => {
    const [enteredNum, setEnteredNum] = useState<string>("")

    const { width, height } = useWindowDimensions()

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

    const marginTop = height < 400 ? 30 : 100

    return (
        <ScrollView>
            <KeyboardAvoidingView style={styles.screen} behavior="position">
                <View style={[styles.rootContainer, { marginTop: marginTop }]}>
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
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default StartGameScreen

// const deviceHeight = Dimensions.get("window").height

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    rootContainer: {
        flex: 1,
        // marginTop: deviceHeight < 400 ? 30 : 100,
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