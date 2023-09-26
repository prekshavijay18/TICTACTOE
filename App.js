import react, { useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
// import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { AppLoading } from "expo";

//SplashScreen.preventAutoHideAsync();
// const fetchFonts = () => {
//   return Font.loadAsync({
//     barbie: require("./assets/fonts/Bartex.ttf"),
//   });
// };
export default function App() {
  // const [dataLoaded, setDataLoaded] = react.useState(false);
  // if (!dataLoaded) {
  //   return (
  //     <AppLoading
  //       startAsync={fetchFonts}
  //       onFinish={() => setDataLoaded(true)}
  //     />
  //   );
  // }
  // const [number, setNumber] = react.useState(0);
  // const [isLoaded] = useFonts({
  //   barbie: require("./assets/fonts/Bartex.ttf"),
  // });
  // const handleOnLayout = useCallback(async () => {
  //   if (isLoaded) {
  //     await SplashScreen.hideAsync(); //hide the splashscreen
  //   }
  // }, [isLoaded]);
  // if (!isLoaded) {
  //   return null;
  // }

  const [isFontLoaded, setFontLoaded] = react.useState(false);
  const _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        'barbie': require("./assets/fonts/Barbie-font.ttf"),
      }),
    ]);
  };
  react.useEffect(() => {
    _loadResourcesAsync().then(() => {
      setFontLoaded(true);
    });
  }, []);

  if (!isFontLoaded) {
    return <View />;
  }

  const [refresh, setRefresh] = react.useState(false);
  const [noti, setNoti] = react.useState("Player X to start !");
  const [ele, setEle] = react.useState([
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
  ]);
  const [curr, setCurr] = react.useState("X");
  const move = (index) => {
    let newEle = ele;
    if (newEle[index] != "X" && newEle[index] != "O") {
      if (curr == "X") {
        newEle[index] = "X";
        setCurr("O");
        setNoti("Player O to move!");
      } else {
        newEle[index] = "O";
        setCurr("X");
        setNoti("Player X to move!");
      }
      setEle(newEle);
      setRefresh(!refresh);
      checkwin();
    }
  };
  const checkwin = () => {
    if (ele[0] == ele[1] && ele[1] == ele[2] && ele[2] != " ") {
      //alert("Player " + ele[0] + " WON");
      winner(ele[0]);
    } else if (ele[3] == ele[4] && ele[4] == ele[5] && ele[5] != " ") {
      //alert("Player " + ele[3] + " WON");
      winner(ele[3]);
    } else if (ele[6] == ele[7] && ele[7] == ele[8] && ele[8] != " ") {
      //alert("Player " + ele[6] + " WON");
      winner(ele[6]);
    } else if (ele[0] == ele[4] && ele[4] == ele[8] && ele[8] != " ") {
      //alert("Player " + ele[0] + " WON");
      winner(ele[0]);
    } else if (ele[2] == ele[4] && ele[4] == ele[6] && ele[6] != " ") {
      //alert("Player " + ele[2] + " WON");
      winner(ele[2]);
    } else if (ele[0] == ele[3] && ele[3] == ele[6] && ele[6] != " ") {
      //alert("Player " + ele[0] + " WON");
      winner(ele[0]);
    } else if (ele[1] == ele[4] && ele[4] == ele[7] && ele[7] != " ") {
      //alert("Player " + ele[1] + " WON");
      winner(ele[1]);
    } else if (ele[2] == ele[5] && ele[5] == ele[8] && ele[8] != " ") {
      //alert("Player " + ele[2] + " WON");
      winner(ele[2]);
    }
  };
  const winner = async (winner) => {
    setNoti("Player " + winner + " WON!");
    setTimeout(() => {
      setEle([" ", " ", " ", " ", " ", " ", " ", " ", " "]);
      if (winner == "O") {
        setNoti("Player X to start!");
      } else {
        setNoti("Player O to start!");
      }
    }, 2000);
  };
  return (
    <View style={styles.container}>
      <Image source={require("./assets/bg2.jpeg")} style={styles.bg} />
      <Text style={styles.txt}>TICTACTOE</Text>
      <Text style={styles.noti}>{noti}</Text>
      <View style={styles.listContainer}>
        <Image source={require("./assets/ttt.png")} style={styles.img} />
        <FlatList
          style={styles.list}
          data={ele}
          numColumns={3}
          refreshing={true}
          extraData={refresh}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.box}
              onPress={() => {
                move(index);
              }}
            >
              <Text style={styles.noti}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* <Text>This is my first app :')</Text>
      <Text>The number is: {number}</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          setNumber(number + 1);
        }}>
      <Text style={styles.txt}>ADD</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  txt: {
    color: "white",
    fontSize: 50,
    backgroundColor: "hotpink",
    fontWeight: "bold",
    fontFamily: "Cochin",
  },
  noti: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Cochin",
  },
  btn: {
    backgroundColor: "lightgrey",
    padding: 5,
    borderRadius: 10,
  },
  list: {
    width: 300,
    height: 300,
  },
  listContainer: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 300,
    height: 300,
    position: "absolute",
  },
  bg: {
    width: "100%",
    height: "100%",
    zIndex: -1,
    position: "absolute",
  },
  box: {
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
