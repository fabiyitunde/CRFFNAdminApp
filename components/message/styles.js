import { Platform, StyleSheet, Dimensions } from "react-native";
import { Fonts, Metrics, Colors } from "../../Themes/";

const styles = StyleSheet.create({
  container: {
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,
    backgroundColor: Colors.transparent
  },

  left: {
    flex: 0.5,
    backgroundColor: Colors.transparent
  },

  backArrow: {
    justifyContent: "center",
    alignItems: "center"
  },

  body: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.transparent
  },

  textTitle: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(18),
    alignSelf: "center",
    fontFamily: Fonts.type.helveticaNeueLight
  },
  signInBtn: {
    backgroundColor: "#0b8e14",
    height: Metrics.HEIGHT * 0.08,
    width: Metrics.WIDTH * 0.84,
    borderRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    elevation: 3
  },
  rowView: {
    flexDirection: "row",
    marginBottom: Metrics.HEIGHT * 0.015
  },

  signInBtnText: {
    color: "#fff",
    fontSize: Fonts.moderateScale(17),
    justifyContent: "space-between",
    width: Metrics.WIDTH * 0.84,
    textAlign: "center",
    fontFamily: Fonts.type.sfuiDisplaySemibold
  },

  right: {
    flex: 0.5,
    backgroundColor: Colors.transparent,
    alignItems: "center",
    ...Platform.select({
      ios: {},
      android: {
        paddingTop: Metrics.WIDTH * 0.02
      }
    })
  },

  alertBg: {
    width: Metrics.WIDTH * 0.03,
    height: Metrics.WIDTH * 0.03,
    borderRadius: Metrics.WIDTH * 0.015,
    backgroundColor: "#ff0000",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -(Metrics.WIDTH * 0.018)
  },

  alertTxt: {
    fontSize: Fonts.moderateScale(8),
    fontFamily: Fonts.type.sfuiDisplayMedium,
    color: Colors.snow
  },

  bagIcon: {
    marginLeft: Metrics.WIDTH * 0.04,
    color: Colors.snow
  },

  heartBg: {
    width: Metrics.WIDTH * 0.054,
    height: Metrics.WIDTH * 0.054,
    borderRadius: Metrics.WIDTH * 0.027,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.snow,
    alignItems: "center",
    justifyContent: "center"
  },

  heartIcon: {
    color: Colors.snow,
    alignSelf: "center"
  },

  mainView: {
    height: Metrics.HEIGHT * 0.9
  },

  mainRow: {
    flexDirection: "row",
    paddingTop: Metrics.HEIGHT * 0.018,
    paddingBottom: Metrics.HEIGHT * 0.025,
    paddingLeft: Metrics.WIDTH * 0.045,
    paddingRight: Metrics.WIDTH * 0.045
  },
  secondRow: { marginTop: Metrics.HEIGHT * -0.218 },
  infoRow: {
    flexDirection: "row",
    width: Metrics.WIDTH * 0.5
  },
  labelHeaderText: {
    color: "#ffffff",
    width: Metrics.WIDTH * 0.9,
    fontSize: Fonts.moderateScale(18),
    fontFamily: Fonts.type.helveticaNeueLight,
    textAlign: "left",
    fontWeight: "bold",
    paddingLeft: Metrics.WIDTH * 0.05,
    paddingTop: Metrics.WIDTH * 0.088
  },

  labelText: {
    color: "#a3a3a3",
    width: Metrics.WIDTH * 0.2,
    fontSize: Fonts.moderateScale(16),
    fontFamily: Fonts.type.helveticaNeueLight,
    textAlign: "left"
  },

  infoText: {
    width: Metrics.WIDTH * 0.5,
    fontSize: Fonts.moderateScale(16),
    fontFamily: Fonts.type.helveticaNeueLight,
    textAlign: "left"
  },

  dividerHorizontal: {
    height: Metrics.HEIGHT * 0.001,
    backgroundColor: "#e1e1e1",
    marginLeft: Metrics.WIDTH * 0.045,
    marginRight: Metrics.WIDTH * 0.045
  },

  changePasswordView: {
    marginTop: Metrics.HEIGHT * 0.025,
    marginLeft: Metrics.WIDTH * 0.045
  },

  editInfoMainView: {
    bottom: 0,
    position: "absolute",
    width: Metrics.WIDTH
  },

  editDivider: {
    height: Metrics.HEIGHT * 0.001,
    backgroundColor: "#e1e1e1"
  },

  editInfoView: {
    padding: Metrics.HEIGHT * 0.015,
    margin: Metrics.HEIGHT * 0.015,
    backgroundColor: "#ffc700",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },

  editInfoText: {
    color: "#04920b",
    fontSize: Fonts.moderateScale(16),
    fontFamily: Fonts.type.helveticaNeueLight
  },
  profileImg: {
    width: Metrics.WIDTH * 0.32,
    height: Metrics.WIDTH * 0.32,
    borderRadius: Metrics.WIDTH * 0.06,
    alignSelf: "flex-start"
  },
  header: {
    backgroundColor: "#181818",
    height: Metrics.HEIGHT * 0.1,
    borderBottomWidth: 0,
    paddingTop: Metrics.HEIGHT * 0.03,
    elevation: 0,
    paddingLeft: Metrics.WIDTH * 0.05,
    paddingRight: Metrics.WIDTH * 0.05
  },

  left: {
    flex: 0.5,
    backgroundColor: Colors.transparent
  },
  backArrow: {
    width: 30,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  menuIconWhite: {
    justifyContent: "center",
    alignItems: "center"
  },
  view2: {
    borderRadius: 5,
    width: Metrics.WIDTH * 0.8,
    height: Metrics.HEIGHT * 0.33,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "transparent"
  },
  view4: {
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT * 0.33,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "transparent"
  },
  itememail: {
    alignSelf: "center",
    width: Metrics.WIDTH * 0.8,
    height: Metrics.HEIGHT * 0.08
  },
  inputemail: {
    fontFamily: Fonts.type.SFUIDisplayRegular,
    color: Colors.hintblue
  },

  iconitem: {
    color: Colors.hintblue
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 70
    // marginTop: 100
  },

  buttondialogsignup: {
    backgroundColor: Colors.loginGreen,
    alignSelf: "center",

    borderRadius: 40,
    width: Metrics.WIDTH * 0.65,
    height: Metrics.HEIGHT * 0.07,

    marginTop: 100,
    justifyContent: "center"
  },
  buttonsignin: {
    alignSelf: "center",
    fontSize: 15,
    fontFamily: Fonts.type.SFUIDisplaySemibold,
    color: "white"
  },

  view3: {
    width: Metrics.WIDTH,
    justifyContent: "center",
    backgroundColor: "transparent",
    flexDirection: "row",
    marginTop: Metrics.HEIGHT * 0.05,
    marginBottom: Metrics.HEIGHT * 0.05
  },
  screenBg: {
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT,
    backgroundColor: "black"
  },

  logostyle: {
    alignSelf: "center",
    width: Metrics.WIDTH * 0.28,
    height: Metrics.WIDTH * 0.28,
    backgroundColor: "transparent",
    resizeMode: "contain"
  },

  buttontext: {
    alignSelf: "center",
    fontFamily: Fonts.type.SFUIDisplayRegular,
    color: "white",
    fontSize: Fonts.moderateScale(16)
  },

  signInTxtBg: {
    paddingLeft: Metrics.WIDTH * 0.01
  },
  body: {
    flex: 3,
    alignItems: "center",
    backgroundColor: Colors.transparent
  },

  textTitle: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(16),
    marginTop: Metrics.HEIGHT * 0.001,
    alignSelf: "center",
    fontFamily: Fonts.type.sfuiDisplayRegular
  },

  right: {
    flex: 0.5
  },

  main: {
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,
    backgroundColor: Colors.snow,
    flexDirection: "column"
  },

  rowBg: {
    borderTopColor: "#000000",
    borderTopWidth: Metrics.WIDTH * 0.003,
    width: Metrics.WIDTH,
    backgroundColor: Colors.snow,
    paddingLeft: Metrics.WIDTH * 0.025,
    paddingTop: Metrics.WIDTH * 0.028,
    marginTop: Metrics.HEIGHT * 0.004
  },
  listcontainer: {
    paddingBottom: Metrics.WIDTH * 0.5,
    marginBottom: Metrics.WIDTH * 0.5
  },
  block: {
    height: Metrics.WIDTH * 0.5,
    paddingBottom: Metrics.WIDTH * 0.5,
    marginBottom: Metrics.WIDTH * 0.5
  },
  profileImg: {
    width: Metrics.WIDTH * 0.12,
    height: Metrics.WIDTH * 0.12,
    borderRadius: Metrics.WIDTH * 0.06,
    alignSelf: "flex-start"
  },

  rowNameTxt: {
    color: "#6f6f6f",
    fontSize: Fonts.moderateScale(16),
    fontFamily: Fonts.type.sfuiDisplayMedium,
    textAlign: "left"
  },

  rowDesignationTxt: {
    color: "#b7b7b7",
    fontSize: Fonts.moderateScale(13),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    textAlign: "left"
  },

  dividerHorizontal: {
    width: Metrics.WIDTH * 0.99 + 5,
    height: Metrics.HEIGHT * 0.001,
    backgroundColor: "#D7D7D7",
    alignSelf: "flex-end"
  },

  followBgNotSelected: {
    width: Metrics.WIDTH * 0.18,
    height: Metrics.HEIGHT * 0.035,
    borderRadius: Metrics.HEIGHT * 0.045,
    borderWidth: 1,
    borderColor: "#0691ce",
    marginRight: Metrics.WIDTH * 0.03,
    justifyContent: "center"
  },

  followBgSelected: {
    width: Metrics.WIDTH * 0.18,
    height: Metrics.HEIGHT * 0.035,
    borderRadius: Metrics.HEIGHT * 0.045,
    backgroundColor: "#00aa08",
    marginRight: Metrics.WIDTH * 0.03,
    justifyContent: "center",
    shadowColor: "#2AC062",
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20
  },

  followTxtSelected: {
    fontSize: Fonts.moderateScale(11),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    color: Colors.snow,
    alignSelf: "center"
  },

  followTxtNotSelected: {
    fontSize: Fonts.moderateScale(11),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    color: "#0691ce",
    alignSelf: "center"
  },

  listMainView: {
    width: Metrics.WIDTH,
    flex: 1
  },

  rowView: {
    flexDirection: "row",
    borderBottomColor: "#e3e3e3",
    marginBottom: Metrics.HEIGHT * 0.015
  },

  namePostView: {
    flexDirection: "column",
    marginLeft: Metrics.WIDTH * 0.045,
    width: Metrics.WIDTH * 0.58,
    justifyContent: "center"
  },
  searchInput: {
    color: "#a0a0a0",
    fontSize: Fonts.moderateScale(16),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    width: Metrics.WIDTH * 0.75,
    marginLeft: Metrics.WIDTH * 0.02,
    textAlignVertical: "top",
    ...Platform.select({
      ios: {},
      android: {
        paddingTop: 5,
        paddingBottom: 0
      }
    })
  },

  searchIcon: {
    marginLeft: Metrics.WIDTH * 0.02
  },
  searcgBarBg: {
    alignItems: "center",
    flexDirection: "row",
    width: Metrics.WIDTH,
    backgroundColor: "#f3f3f3",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    marginLeft: Metrics.WIDTH * 0.03,
    marginBottom: Metrics.HEIGHT * 0.01
  },
  searcbarstyle: {
    color: "#a3a3a3",
    width: Metrics.WIDTH * 0.9,
    fontSize: Fonts.moderateScale(16),
    fontFamily: Fonts.type.helveticaNeueLight,
    textAlign: "left"
  }
});

export default styles;
