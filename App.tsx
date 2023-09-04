import { ImageBackground, StyleSheet, SafeAreaView } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import { LinearGradient } from "expo-linear-gradient"
import { useState } from 'react';
import GameScreen from './screens/GameScreen';
import { Colors } from './constants/colors';
import GameOver from './screens/GameOverScreen';
import { useFonts } from "expo-font"
import AppLoading from "expo-app-loading"

export default function App() {
  const [userNumber, setUserNumber] = useState<number | null>(null)

  const [guessRounds, setGuessRounds] = useState(0)

  const [isOver, setIsOver] = useState<boolean>(true)

  // const [fontsLoading] = useFonts({
  //   "open-sans": require("./assets/fonts/whatever"),
  //   "open-sans-bold": require("./assets/fonts/whatever-bold"),
  // })

  // if (!fontsLoading) {
  //   return <AppLoading />
  // }

  const pickedUserNum = (pickedNumer: number) => {
    setUserNumber(pickedNumer)
    setIsOver(false)
  }

  const gameOver = () => {
    setIsOver(true)
  }

  const startNewGame = () => {
    setUserNumber(null)
    setGuessRounds(0)
  }

  let screen = <StartGameScreen onPickedNum={(pickedNumer: number) => pickedUserNum(pickedNumer)} />

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOver} />
  }

  if (isOver && userNumber) {
    screen = <GameOver roundsNumber={guessRounds} userNumber={userNumber} onStartNewGame={startNewGame} />
  }


  return (
    <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>
          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.25
  }
});
