import { Platform, StyleSheet, Dimensions } from "react-native";
import { Fonts, Metrics, Colors } from "../../Themes/";

const styles = StyleSheet.create({
  main: {
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,
    backgroundColor: Colors.transparent,
    flexDirection: "column"
  },

  header: {
    backgroundColor: Colors.snow,
    height: Metrics.HEIGHT * 0.1,
    width: Metrics.WIDTH,
    flexDirection: "row",
    borderBottomColor: Colors.snow,
    justifyContent: "space-between",
    paddingTop: Metrics.HEIGHT * 0.045
  },

  titleTxt: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(18),
    fontFamily: Fonts.type.sfuiDisplaySemibold
  },

  filterTxt: {
    fontSize: Fonts.moderateScale(16),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    color: Colors.snow
  },

  navigationItem: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  tabIcon: {
    height: Metrics.HEIGHT * 0.03,
    width: Metrics.HEIGHT * 0.03,
    resizeMode: "contain",
    justifyContent: "center"
  },

  activeTabText: {
    fontSize: Fonts.moderateScale(12),
    color: "#49fd52"
  },

  normalTabText: {
    fontSize: Fonts.moderateScale(12),
    color: "#929292"
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

  cartImgBg: {
    width: Metrics.WIDTH * 0.15,
    marginBottom: Metrics.HEIGHT * 0.01,
    alignItems: "center",
    justifyContent: "center"
  },

  cartImage: {
    width: Metrics.WIDTH * 0.075,
    height: Metrics.WIDTH * 0.075,
    resizeMode: "contain",
    alignSelf: "center"
  },

  searcgBarBg: {
    alignItems: "center",
    flexDirection: "row",
    width: Metrics.WIDTH * 0.82,
    backgroundColor: "#f3f3f3",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    marginLeft: Metrics.WIDTH * 0.03,
    marginBottom: Metrics.HEIGHT * 0.01
  },

  footerTabBg: {
    backgroundColor: Colors.panther
  },
  drawercontainer: {
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT,
    backgroundColor: "#2d324f"
  },
  headerSec: {
    backgroundColor: Colors.transparent,
    height: Metrics.WIDTH * 0.15,
    borderBottomWidth: 0,
    ...Platform.select({
      ios: {},
      android: {
        marginTop: Fonts.moderateScale(25)
      }
    }),
    elevation: 0
  },
  left: {
    flex: 0.5,
    backgroundColor: "transparent"
  },
  backArrow: {
    width: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  body: {
    flex: 3,
    alignItems: "center",
    backgroundColor: "transparent"
  },
  textTitle: {
    color: "#fff",
    fontSize: Fonts.moderateScale(16),
    marginTop: 5,
    alignSelf: "center",
    fontFamily: Fonts.type.sfuiDisplaySemibold
  },
  right: {
    flex: 0.5
  },
  mainText: {
    color: "#0691ce",
    fontSize: Fonts.moderateScale(17),
    height: Metrics.HEIGHT * 0.05,
    width: Metrics.WIDTH,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "transparent",
    top: Metrics.HEIGHT * 0.44,
    fontFamily: Fonts.type.sfuiDisplayRegular
  },

  /*Menu Section START*/
  menuContainer: {
    backgroundColor: "#11142a",
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT
    // paddingTop: Fonts.moderateScale(25),
  },
  menucontrolPanel: {
    // flex: 1,
    // paddingLeft: Fonts.moderateScale(20),
  },
  userProfiles: {
    width: Metrics.WIDTH * 0.84,
    paddingTop: Fonts.moderateScale(50),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0c0e1d"
  },
  userImageStyle: {
    width: Metrics.WIDTH * 0.2,
    height: Metrics.WIDTH * 0.2,
    borderRadius: Metrics.WIDTH * 0.1,
    borderWidth: 2,
    borderColor: Colors.snow,
    marginLeft: 10,
    marginRight: 10
  },
  userDetailsStyle: {
    backgroundColor: "transparent",
    alignItems: "center",
    height: 50,
    justifyContent: "center",
    marginLeft: Fonts.moderateScale(10),
    marginBottom: Fonts.moderateScale(10)
  },
  userDetailsText: {
    fontSize: Fonts.moderateScale(15),
    color: Colors.snow
  },
  menumainview: {
    width: Metrics.WIDTH * 0.84,
    marginTop: Fonts.moderateScale(25),
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  listrow: {
    backgroundColor: "transparent",
    flexDirection: "row",
    width: Metrics.WIDTH * 0.84,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: Fonts.moderateScale(20),
    marginTop: Fonts.moderateScale(10),
    marginBottom: Fonts.moderateScale(10)
  },
  rowtxt: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(18),
    backgroundColor: "transparent",
    marginLeft: Fonts.moderateScale(15),
    textAlign: "center",
    fontFamily: Fonts.type.sfuiDisplayLight
  },
  notiCountSec: {
    backgroundColor: "#d9b63e",
    marginLeft: 10,
    marginTop: 3,
    borderRadius: 10,
    height: 17,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    // position: 'absolute',
    // right: 0,
    zIndex: 11111
  },
  notiCount: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(13)
  },
  userProfilestyleSec: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: Fonts.moderateScale(10)
  }
});

export default styles;
