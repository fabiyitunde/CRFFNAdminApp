import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator
} from "react-navigation";
import Home from "../components/home/home";
import Invoicelist from "../components/invoicelist/invoicelist";
import FilterMembers from "../components/filtermembers/filtermembers";
import ControlPanel from "../components/home/ControlPanel";
import Login from "../components/login/login";
import AuthLoading from "../components/authloading";
import MemberDetails from "../components/memberdetails/memberdetails";
import InvoiceDetails from "../components/invoicedetails/invoicedetails";
import QRCodeScanner from "../components/qrcodescanner/qrcodescanner";
import ScannedInvoiceDetails from "../components/scannedinvoicedetails/scannedinvoicedetails";
import ScannedIDDetails from "../components/scannediddetails/scannediddetails";
import HomePage from "../components/homepage/homepage";
import InvoiceItem from "../components/invoiceitem/invoiceitem";
import MemberItem from "../components/memberitem/memberitem";
import SelectedMembersList from "../components/selectedmemberslist/selectedmemberslist";
import MessageHome from "../components/message/message";

const DrawerStack = createDrawerNavigator(
  {
    Home: Home,
    QRCodeScanner: QRCodeScanner
  },
  {
    gesturesEnabled: false,
    contentComponent: ControlPanel
  }
);
const AppStack = createStackNavigator(
  {
    HomePage: HomePage,
    MemberDetails: MemberDetails,
    MemberItem: MemberItem,
    InvoiceDetails: InvoiceDetails,
    ScannedInvoiceDetails: ScannedInvoiceDetails,
    ScannedIDDetails: ScannedIDDetails,
    Home: Home,
    QRCodeScanner: QRCodeScanner,
    Invoicelist: Invoicelist,
    InvoiceItem: InvoiceItem,
    FilterMembers: FilterMembers,
    SelectedMembersList: SelectedMembersList,

    MessageHome: MessageHome
  },
  // {navigationOptions:{headerRight:(<SelectedMemberIcon/>)}},
  {
    headerMode: "none",
    navigationOptions: ({ navigation }) => ({
      gesturesEnabled: false
    })
  }
);

const MainStack = createStackNavigator(
  {
    Main: {
      screen: AppStack
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);
const AuthStack = createStackNavigator(
  { SignIn: Login },
  { headerMode: "none" }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      App: MainStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
