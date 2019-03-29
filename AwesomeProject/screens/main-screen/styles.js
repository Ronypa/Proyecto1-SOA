import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e5e5e5",
    backgroundColor: "#125698"
  },
  listContainer: {
    flexDirection: "column",
    alignItems: "center"
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
  GridViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    margin: 5,
    backgroundColor: "#7B1FA2",
    width: 300,
    borderRadius: 25
  },
  GridViewContainer2: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    width: 300,
    margin: 5,
    backgroundColor: "#ff1154",
    borderRadius: 25
  },
  imageOptions: {
    width: "80%",
    height: "80%",
    resizeMode: "contain"
  },
  imageHouse: {
    width: "80%",
    height: "80%",
    resizeMode: "contain"
  }
});
