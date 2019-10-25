import React, { Component } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
    ActivityIndicator,
    Text,
    View,
    Image,
    StatusBar,
    TouchableOpacity,
    ImageBackground,
    Platform,
    BackHandler,
    I18nManager,
    AsyncStorage,
    ScrollView,
    Dimensions
} from "react-native";
import * as linq from "linq";
import {
    Content,
    Container,
    Right,
    Header,
    Left,
    Body,
    Button,
    Title
} from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import styles from "./styles";
import Images from "../../Themes/Images";
import { connect } from "react-redux";
import MemberInvoiceList from "../memberinvoicelist/memberinvoicelist";
import ScrollableTabView, {
    ScrollableTabBar
} from "../../UIComponents/react-native-scrollable-tab-view";
import { SearchBar } from "react-native-elements";
import { loadMembersList } from "../../redux/actions/membersAction";
import { mapDispatchToProps } from "../../redux/actions/selectedmembersAction";
import { SelectedMembersIcon } from "../selectedmembersicon/selectedmembersicon";

class FilterMembers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isprocessing: false,
            data: [],
            filtereddata: [],
            searchtext: ""
        };
    }

    onChangePasswordClick() {
        this.props.navigation.navigate("ECommerceChangePassword");
    }

    onBackClick() {
        this.props.navigation.navigate("HomePage");
    }

    componentWillMount() {
        var that = this;
        BackHandler.addEventListener("hardwareBackPress", function () {
            that.props.navigation.navigate("HomePage");
            return true;
        });
    }
    handleOnAdd(item) {
        this.props.mapDispatchToProps(item);
    }

    _handleBagNavigation() {
        AsyncStorage.multiSet([["ArrivedFrom", "ECommerceMyInformation"]]);
        this.props.navigation.navigate("ECommerceMyBag");
    }

    _handleWishListNavigation() {
        AsyncStorage.multiSet([["ArrivedForWishList", "ECommerceMyInformation"]]);
        this.props.navigation.navigate("ECommerceWishList");
    }
    componentDidMount() {
        this.setState({ isprocessing: true });
        this.props.loadMembersList(() => {
            this.setState({
                isprocessing: false,
                data: this.props.memberslist,
                filtereddata: this.props.memberslist
            });
        });
    }
    SearchFilterFunction = text => {
        this.setState({ searchtext: text });
        const { data } = this.state;

        if (data == null || data == undefined) {
            this.setState({ filtereddata: [] });
            return;
        }
        if (text == "") {
            this.setState({ filtereddata: data });
            return;
        }

        var filteredlist = linq
            .from(data)
            .where(
                a =>
                    a.CustomerName.toLowerCase().indexOf(text.toLowerCase()) !== -1 ||
                    a.MembershipNumber.toLowerCase().indexOf(text.toLowerCase()) !== -1 ||
                    a.FreightForwaderCategoryDescr.toLowerCase().indexOf(
                        text.toLowerCase()
                    ) !== -1
            )
            .toArray();

        this.setState({ filtereddata: filteredlist });
    };
    viewSelectedMembers() {
        this.props.navigation.navigate("SelectedMembersList");
    }
    transformDataForDisplay = serverdata => {
        const returndata = {
            id: Number(serverdata.Id),
            profileImage: serverdata.picturestring,
            name: `${serverdata.CustomerName} - [${serverdata.MembershipNumber}] `,
            post: serverdata.FreightForwaderCategoryDescr,
            isSelected: false
        };

        return returndata;
    };
    render() {
        StatusBar.setBarStyle("light-content", true);
        if (Platform.OS === "android") {
            StatusBar.setBackgroundColor("#04920b", true);
            StatusBar.setTranslucent(true);
        }
        if (this.state.isprocessing == true || !this.state.data)
            return <ActivityIndicator size="large" color="#0000ff" />;

        return (
            <Container style={styles.container}>
                <Header androidStatusBarColor={"#04920b"} style={styles.header}>
                    <Left style={styles.left}></Left>
                    <Body style={styles.body}>
                        <Text style={styles.textTitle}>Search Practitioner</Text>
                    </Body>
                    <Right style={styles.right}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("Drawer")}
                            style={styles.backArrow}
                        >
                            <Text
                                style={{
                                    position: "absolute",
                                    backgroundColor: "rgba(11,142,20,0.8)",
                                    color: "white",
                                    height: 30,
                                    width: 30,
                                    borderRadius: 15,
                                    right: 15,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    zIndex: 2000
                                }}
                            >
                                {this.props.selectedmembers.length}
                            </Text>
                            <Ionicons name="ios-person" size={30} color="#ffffff" />
                        </TouchableOpacity>
                    </Right>
                </Header>

                <ScrollableTabView
                    initialPage={0}
                    tabBarBackgroundColor={"white"}
                    tabBarActiveTextColor={"#04920b"}
                    tabBarInactiveTextColor={"#789079"}
                    tabBarUnderlineStyle={{ backgroundColor: "#036408" }}
                    renderTabBar={() => <ScrollableTabBar />}
                >
                    <View tabLabel="Individual">
                        <View style={styles.mainView}>
                            <View>
                                <Button
                                    style={styles.signInBtn}
                                    onPress={() => this.viewSelectedMembers()}
                                >
                                    <Text style={styles.signInBtnText}>View Selected</Text>
                                </Button>
                            </View>
                            <SearchBar
                                style={styles.searcbarstyle}
                                round //To make the searchbar corner round (default square)
                                searchIcon={{ size: 24 }} //Size of the search icon
                                onChangeText={text => this.SearchFilterFunction(text)}
                                onClear={text => this.SearchFilterFunction("")}
                                placeholder="Search Individual..."
                                value={this.state.searchtext}
                            />

                            {this.state.filtereddata.map((serveritem, index) => {
                                const item = this.transformDataForDisplay(serveritem);

                                return (
                                    <View style={styles.rowBg} key={index}>
                                        {item.post === "Executive" || item.post === "Staff" ? (
                                            <View style={styles.rowView}>
                                                <Image
                                                    source={{ uri: item.profileImage }}
                                                    style={styles.profileImg}
                                                />
                                                <View style={styles.namePostView}>
                                                    <Text style={styles.rowNameTxt}>{item.name}</Text>
                                                    <Text style={styles.rowDesignationTxt}>
                                                        {item.post}
                                                    </Text>
                                                </View>
                                                <View style={{ justifyContent: "center" }}>
                                                    <TouchableOpacity
                                                        style={styles.followBgSelected}
                                                        onPress={() => this.handleOnAdd(item)}
                                                    >
                                                        <Text style={styles.followTxtSelected}>Add</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View
                                                    style={
                                                        index === this.state.data.length - 1
                                                            ? null
                                                            : styles.dividerHorizontal
                                                    }
                                                />
                                            </View>
                                        ) : null}
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                    <View tabLabel="Corporate">
                        <ScrollView>
                            <View>
                                <Button
                                    style={styles.signInBtn}
                                    onPress={() => this.viewSelectedMembers()}
                                >
                                    <Text style={styles.signInBtnText}>View Selected</Text>
                                </Button>
                            </View>
                            <SearchBar
                                style={styles.searcbarstyle}
                                round //To make the searchbar corner round (default square)
                                searchIcon={{ size: 24 }} //Size of the search icon
                                onChangeText={text => this.SearchFilterFunction(text)}
                                onClear={text => this.SearchFilterFunction("")}
                                placeholder="Search Corporate..."
                                value={this.state.searchtext}
                            />

                            <View
                                style={styles.listMainView}
                                animation="zoomInDown"
                                duration={1100}
                                delay={1400}
                            >
                                {this.state.filtereddata.map((serveritem, index) => {
                                    const item = this.transformDataForDisplay(serveritem);

                                    return (
                                        <View style={styles.rowBg} key={index}>
                                            {item.post === "ServiceProvider" ||
                                                item.post === "Company" ? (
                                                    <View style={styles.rowView}>
                                                        <Image
                                                            source={{ uri: item.profileImage }}
                                                            style={styles.profileImg}
                                                        />
                                                        <View style={styles.namePostView}>
                                                            <Text style={styles.rowNameTxt}>{item.name}</Text>
                                                            <Text style={styles.rowDesignationTxt}>
                                                                {item.post}
                                                            </Text>
                                                        </View>
                                                        <View style={{ justifyContent: "center" }}>
                                                            <TouchableOpacity
                                                                style={styles.followBgSelected}
                                                                onPress={() => this.handleOnAdd(item)}
                                                            >
                                                                <Text style={styles.followTxtSelected}>Add</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View
                                                            style={
                                                                index === this.state.data.length - 1
                                                                    ? null
                                                                    : styles.dividerHorizontal
                                                            }
                                                        />
                                                    </View>
                                                ) : null}
                                        </View>
                                    );
                                })}
                            </View>
                        </ScrollView>
                    </View>
                </ScrollableTabView>
            </Container>
        );
    }
}
function mapStateToProps(state, props) {
    return {
        memberslist: state.members.memberslist,
        selectedmembers: state.selectedmembers.selectedmemberslist
    };
}

//Connect everything
export default connect(
    mapStateToProps,

    { mapDispatchToProps, loadMembersList }
)(FilterMembers);
