import { ImageBackground, StyleSheet, SafeAreaView } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useState } from 'react';
import GameScreen from './screens/GameScreen';
import { Colors } from './constants/colors';
import GameOver from './screens/GameOverScreen';
import { useFonts } from "expo-font"
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  const [userNumber, setUserNumber] = useState<number | null>(null)

  const [guessRounds, setGuessRounds] = useState(0)

  const [isOver, setIsOver] = useState<boolean>(true)

  // Keep the splash screen visible while we fetch resources
  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  })

  useEffect(() => {
    // if the fonts has been loaded, we hide the splash screen
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // if the fonts has not yet been loaded, we return nothing to the screen
  if (!fontsLoaded) {
    return null;
  }

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
