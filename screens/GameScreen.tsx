import { useEffect, useState } from "react";
import { View, StyleSheet, Alert, FlatList, useWindowDimensions } from "react-native"
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/instructionText";
import PrimaryButtons from "../components/ui/PrimaryButtons";
import Title from "../components/ui/Title"
import { Ionicons } from "@expo/vector-icons"
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min: number, max: number, exclude: number): number {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundry = 1;
let maxBoundary = 100


const GameScreen = ({ userNumber, onGameOver }: { userNumber: number, onGameOver: () => void }) => {
    const initialGuess = generateRandomBetween(1, 100, userNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [guessRounds, setGuessRounds] = useState([initialGuess])

    const nextGuestHandler = (direction: string) => {
        if ((direction === "lower" && currentGuess < userNumber) || (direction === "higher" && currentGuess > userNumber)) {
            Alert.alert("Don't lie!", "You know this this is wrong...", [{ text: "Sorry!", style: "cancel" }])
            return;
        }
        if (direction === "lower") {
            maxBoundary = currentGuess
        } else {
            minBoundry = currentGuess + 1
        }
        const newRndNum = generateRandomBetween(minBoundry, maxBoundary, currentGuess)
        setCurrentGuess(newRndNum)
        setGuessRounds((prevRounds) => [newRndNum, ...prevRounds])
    }

    const { width, height } = useWindowDimensions();

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver()
        }
    }, [currentGuess, userNumber, onGameOver])

    useEffect(() => {
        minBoundry = 1;
        maxBoundary = 100
    }, [])

    const guessRoundsListLength = guessRounds.length

    let content = <>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
            <InstructionText style={styles.instructionText}>Higher or Lower</InstructionText>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButtons onPress={nextGuestHandler.bind(this, "lower")}>
                        <Ionicons name="md-remove" size={24} color="white" />
                    </PrimaryButtons>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButtons onPress={nextGuestHandler.bind(this, "higher")}>
                        <Ionicons name="md-add" size={24} color="white" />
                    </PrimaryButtons>
                </View>
            </View>
        </Card>
    </>

    // if we are already in landscape mode or a width bigger than 500 show a diff view
    if (width > 500) {
        content =
            <>
                {/* <InstructionText style={styles.instructionText}>Higher or Lower</InstructionText> */}
                <View style={styles.buttonsContainerWide}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButtons onPress={nextGuestHandler.bind(this, "lower")}>
                            <Ionicons name="md-remove" size={24} color="white" />
                        </PrimaryButtons>
                    </View>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <View style={styles.buttonContainer}>
                        <PrimaryButtons onPress={nextGuestHandler.bind(this, "higher")}>
                            <Ionicons name="md-add" size={24} color="white" />
                        </PrimaryButtons>
                    </View>
                </View>
            </>
    }

    return (
        <View style={styles.screens}>
            <Title title="Opponent's Game" />
            {content}
            <View style={styles.listContainer}>
                {/* {guessRounds.map(round => <Text key={round}>{round}</Text>)} */}
                <FlatList data={guessRounds} renderItem={(itemData) => {
                    return (
                        // <Text key={itemData.item}>{itemData.item}</Text>
                        <GuessLogItem roundNumber={guessRoundsListLength - itemData.index} guess={itemData.item} />
                    )
                }} alwaysBounceVertical={false}
                    keyExtractor={(item) => item.toString()} />
            </View>
        </View>
    )
}

export default GameScreen

const styles = StyleSheet.create({
    screens: {
        flex: 1,
        padding: 24,
        alignItems: "center"
    },
    instructionText: {
        marginBottom: 12,
    },
    buttonsContainer: {
        flexDirection: "row"
    },
    buttonContainer: {
        flex: 1
    },
    listContainer: {
        flex: 1,
        padding: 16
    },
    buttonsContainerWide: {
        flexDirection: "row",
        alignItems: "center"
    }
})