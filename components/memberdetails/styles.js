import { Platform, StyleSheet, Dimensions } from "react-native";
import { Fonts, Metrics, Colors } from "../../Themes/";

const styles = StyleSheet.create({
  container: {
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,
    backgroundColor: Colors.snow
  },

  textTitle: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(18),
    alignSelf: "center",
    fontFamily: Fonts.type.helveticaNeueLight
  },
  header: {
    fontWeight: "bold",
    backgroundColor: "#181818",
    height: Metrics.HEIGHT * 0.12,
    borderBottomWidth: 0,
    //paddingTop: Metrics.HEIGHT * 0.03,
    elevation: 0,
    paddingLeft: Metrics.WIDTH * 0.05,
    paddingRight: Metrics.WIDTH * 0.05,
    ...Platform.select({
      ios: {
        paddingTop: Metrics.HEIGHT * 0.02
      },
      android: {
        paddingTop: Metrics.WIDTH * 0.05
      }
    }),
    elevation: 0,
    paddingLeft: Metrics.WIDTH * 0.05,
    paddingRight: Metrics.WIDTH * 0.05
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
    height: Metrics.HEIGHT * 0.9,
    backgroundColor: "#2f2f2f"
  },

  mainRow: {
    flexDirection: "row",
    paddingTop: Metrics.HEIGHT * 0.018,
    paddingBottom: Metrics.HEIGHT * 0.025,
    paddingLeft: Metrics.WIDTH * 0.045,
    paddingRight: Metrics.WIDTH * 0.045
  },
  secondRow: { marginTop: Metrics.HEIGHT * -0.258 },
  infoRow: {
    flexDirection: "row",
    width: Metrics.WIDTH * 0.5
  },
  labelHeaderText: {
    color: "#ffffff",
    width: Metrics.WIDTH * 0.9,
    textTransform: "capitalize",
    fontSize: Fonts.moderateScale(18),
    fontFamily: Fonts.type.helveticaNeueLight,
    textAlign: "left",
    fontWeight: "bold",
    paddingLeft: Metrics.WIDTH * 0.05,
    paddingTop: Metrics.WIDTH * 0.088
  },

  labelText: {
    fontWeight: "bold",
    color: "#c3c3c3",
    width: Metrics.WIDTH * 0.2,
    fontSize: Fonts.moderateScale(16),
    fontFamily: Fonts.type.helveticaNeueLight,
    textAlign: "left"
  },

  infoText: {
    width: Metrics.WIDTH * 0.9,
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
  }
});

export default styles;
