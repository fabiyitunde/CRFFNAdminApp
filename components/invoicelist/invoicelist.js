import React, { Component } from "react";
import {
  View,
  BackHandler,
  ScrollView,
  Text,
  ActivityIndicator,
  Image,
  StatusBar,
  Platform,
  TouchableOpacity
} from "react-native";
import { SearchBar } from "react-native-elements";

const drawerStyles = {
  drawer: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 0
  }
};
import * as linq from "linq";

import tweens from "./tweens";
import styles from "./styles";
import { connect } from "react-redux";
import { loadInvoiceList } from "../../redux/actions/invoiceAction";

class InvoiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isprocessing: false,
      data: [],
      filtereddata: [],
      searchtext: ""
    };
  }
  componentWillMount() {
    var that = this;
    BackHandler.addEventListener("hardwareBackPress", function() {
      that.props.navigation.navigate("Social");
      return true;
    });
  }
  handleOnViewDetail = selecteditem => {
    this.props.navigation.navigate("InvoiceItem", {
      invoiceid: selecteditem.id,
      crffnmasterid: selecteditem.crffnmasterid
    });
  };
  componentDidMount() {
    this.setState({ isprocessing: true });
    this.props.loadInvoiceList(() => {
      this.setState({
        isprocessing: false,

        data: this.props.invoicelist,
        filtereddata: this.props.invoicelist
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
          a.invoiceheader.payername
            .toLowerCase()
            .indexOf(text.toLowerCase()) !== -1 ||
          a.invoiceheader.category.toLowerCase().indexOf(text.toLowerCase()) !==
            -1
      )
      .toArray();

    this.setState({ filtereddata: filteredlist });
  };
  transformDataForDisplay = serverdata => {
    const returndata = {
      id: Number(serverdata.invoiceheader.id),

      name: `${serverdata.invoiceheader.payername} - [${serverdata.invoiceheader.category}] `,

      isSelected: false
    };

    return returndata;
  };

  render() {
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#2d324f", true);
      StatusBar.setTranslucent(true);
    }
    if (this.state.isprocessing == true || !this.state.data)
      return <ActivityIndicator size="large" color="#0000ff" />;
    return (
      <View>
        <View androidStatusBarColor={"#0e1130"} style={styles.header}>
          <SearchBar
            style={styles.searcbarstyle}
            round //To make the searchbar corner round (default square)
            searchIcon={{ size: 24 }} //Size of the search icon
            onChangeText={text => this.SearchFilterFunction(text)}
            onClear={text => this.SearchFilterFunction("")}
            placeholder="Search Invoice..."
            value={this.state.searchtext}
          />
        </View>

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
                <View style={styles.rowView}>
                  <View style={styles.namePostView}>
                    <Text style={styles.rowNameTxt}>{item.name}</Text>
                  </View>
                  <View style={{ justifyContent: "center" }}>
                    <TouchableOpacity
                      style={styles.followBgSelected}
                      onPress={() => this.handleOnViewDetail(item)}
                    >
                      <Text style={styles.followTxtSelected}>Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={
                    index === this.state.data.length - 1
                      ? null
                      : styles.dividerHorizontal
                  }
                />
              </View>
            );
          })}
        </View>
      </View>
    );
  }
  _fnChangeItem(listId) {
    // const newArray = this.state.data;
    const newArray = this.state.data;

    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].id == listId) {
        // alert(listId + ' prag ' +this.state.data[i].id)
        const newArray1 = [];

        for (var i = 0; i < this.state.data.length; i++) {
          if (this.state.data[i].id == listId) {
            newArray1.push({
              id: this.state.data[i].id,

              name: this.state.data[i].name,
              post: this.state.data[i].post,
              isSelected: !this.state.data[i].isSelected
            });
          } else {
            newArray1.push({
              id: this.state.data[i].id,

              name: this.state.data[i].name,
              post: this.state.data[i].post,
              isSelected: this.state.data[i].isSelected
            });
          }
        }

        this.setState({ data: newArray1 });
        // console.log("pragnesh");
        // console.log(newArray1);
      }
    }
  }
}
function mapStateToProps(state, props) {
  return {
    invoicelist: state.invoices.invoicelist
  };
}

//Connect everything
export default connect(
  mapStateToProps,
  { loadInvoiceList }
)(InvoiceList);
