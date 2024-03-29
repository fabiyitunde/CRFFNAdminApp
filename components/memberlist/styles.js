import { Platform, StyleSheet, Dimensions } from "react-native";

// Screen Styles
import { Fonts, Metrics, Colors } from "../../Themes/";

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#181818",
    height: Metrics.HEIGHT * 0.1,
    borderBottomWidth: 0,
    paddingTop: Metrics.HEIGHT * 0.03,
    elevation: 0,
    paddingLeft: Metrics.WIDTH * 0.05,
    paddingRight: Metrics.WIDTH * 0.05
  },
  isloading: {
    position: "absolute",
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    height: "auto",
    width: Metrics.WIDTH,

    backgroundColor: Colors.transparent
  },
  container2: {
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,

    backgroundColor: Colors.transparent
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
    textAlign: "left",
    textTransform: "capitalize"
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
    width: Metrics.WIDTH
  },

  rowView: {
    flexDirection: "row",
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
