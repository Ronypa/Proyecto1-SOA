import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e5e5e5",
    backgroundColor: "#125698"
  },
  cointainerModal: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)"
  },
  //para elemento rosado en gridwiew
  GridViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    margin: 5,
    backgroundColor: "#7B1FA2",
    width: 180,
    borderRadius: 25
  },
  //para elemento rosado en gridwiew
  GridViewContainer2: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    width: 180,
    margin: 5,
    backgroundColor: "#ff1154",
    borderRadius: 25
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
  imageCamera: {
    width: "100%",
    resizeMode: "contain"
  },
  imageDoor: {
    width: "60%",
    height: "60%",
    resizeMode: "contain"
  },
  imageMessage: {
    width: "80%",
    height: "80%",
    resizeMode: "contain"
  },
  listContainer: {
    flexDirection: "column",
    alignItems: "center"
  },
  modalCloseButtonContainer: {
    margin: 0,
    padding: 10
  },
  modalElements: {
    width: "85%",
    height: "60%",
    backgroundColor: "#bbbbbb",
    alignItems: "center",
    justifyContent: "center"
  },
  modalHeaderContainer: {
    alignContent: "flex-end",
    alignItems: "flex-end",
    flexDirection: "row-reverse",
    borderBottomWidth: 0.5,
    width: "97%"
  },
  modalImage: {
    flex: 1,
    margin: "5%",
    resizeMode: "contain",
    width: "100%"
  },
  modalTitle: {
    fontSize: 30,
    color: "#000000"
  },
  modalTitleContainer: {
    alignSelf: "center",
    marginRight: "8%",
    alignContent: "center",
    alignItems: "center",
    fontSize: 30
  },
  textUnderLocksIcons: {
    fontSize: 20,
    marginTop: 10,
    color: "black"
  }
});
