import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView } from "react-native"
import PrimaryButtons from "../components/ui/PrimaryButtons"
import Title from "../components/ui/Title"
import { Colors } from "../constants/colors"

type propsType = {
  roundsNumber: number,
  userNumber: number,
  onStartNewGame: () => void
}

const GameOver = ({ roundsNumber, userNumber, onStartNewGame }: propsType) => {

  const { width, height } = useWindowDimensions()

  let imageSize = 350

  let borderRadius = 200

  if (width < 380) {
    imageSize = 175
  }

  if (height < 380) {
    imageSize = 175
  }

  if (width < 380) {
    borderRadius = 112
  }

  const imageStyle = {
    height: imageSize,
    width: imageSize,
    borderRadius: borderRadius
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.rootContainer}>
        <Title title="GAME OVER" />
        <View style={[styles.imageContainer, imageStyle]}>
          <Image style={styles.image} source={require("../assets/images/game-over.jpg")} />
        </View>
        <Text style={styles.summaryText}>
          Your phone needed
          <Text style={styles.highlight}>{roundsNumber}</Text>
          rounds to guess the numbe <Text style={styles.highlight}>{userNumber}</Text>
        </Text>
        <PrimaryButtons onPress={onStartNewGame}>Restart</PrimaryButtons>
      </View>
    </ScrollView>
  )
}

export default GameOver

// const deviceWidth = Dimensions.get("window").width

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  imageContainer: {
    // width: deviceWidth < 380 ? 175 : 350,
    // height: deviceWidth < 380 ? 175 : 350,
    // borderRadius: deviceWidth < 380 ? 112 : 200,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36
  },
  image: {
    width: "100%",
    height: "100%"
  },
  summaryText: {
    // fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24
  },
  highlight: {
    // fontFamily: "open-sans-bold",
    color: Colors.primary500
  }
})