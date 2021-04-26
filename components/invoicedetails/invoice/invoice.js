import React, { Component } from "react";
import { Text, View, ImageBackground } from "react-native";

import styles from "./styles";
import Images from "../../../Themes/Images";
import images from "../../../Themes/Images";
const Invoice = ({ header, details }) => {
  return (
    <View>
      <View style={styles.detailContainer}>
        <View style={{ width: "100%", height: "20%" }}>
          <ImageBackground
            source={Images.invoicebg}
            style={{ width: "100%", height: "100%" }}
          >
            <View style={styles.headerTxt}>
              <Text style={styles.textStyleBold2}>Invoice</Text>
              <Text style={styles.textStyleBold3}>{header.payername}</Text>
              <Text style={(styles.textStyle, { color: "white" })}>
                {header.payeremail},
              </Text>

              <Text style={(styles.textStyle, { color: "white" })}>
                {header.payerphonenumber},
              </Text>
              <Text style={(styles.textStyle, { color: "white" })}>
                {header.address}
              </Text>
              <Text style={styles.textStyleRef}>
                Ref. Date: {header.refdate}
              </Text>
              <Text style={styles.textStyleRef}></Text>
            </View>
            <View style={styles.row}></View>
          </ImageBackground>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.rowField}>
            <Text style={styles.textStyle}>{header.narration}</Text>
          </View>

          <View style={styles.rowBg}>
            {details.map((item, index) => {
              return (
                <View key={index}>
                  <View style={styles.rowField}>
                    <Text style={styles.fieldLabelTxt}> {item.category}</Text>

                    <Text style={styles.fieldDescriptionTxt}>
                      -- {item.amount}
                    </Text>
                  </View>
                  <View style={styles.rowListDivider} />
                </View>
              );
            })}
          </View>
          <View>
            <View style={styles.rowField}>
              <Text style={styles.fieldLabelTxt}>Category </Text>
              <Text style={[styles.fieldDescriptionTxt]}>
                {header.category}
              </Text>
            </View>
          </View>

          <View style={styles.productDetail}>
            <View style={styles.rowField}>
              <View style={{ width: "50%" }}>
                <Text style={styles.fieldLabelTxt}>Status</Text>
                <Text
                  style={[styles.discountPrise, { backgroundColor: "#e2e2e2" }]}
                >
                  {header.status}
                </Text>
              </View>

              <View style={{ width: "50%" }}>
                <Text style={styles.textStyle}>Invoice Amount </Text>
                <View>
                  <ImageBackground
                    source={Images.pricebg}
                    style={{
                      width: "100%",
                      height: "70%",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Text style={[styles.textStylePrice]}>
                      {header.totalinvoiceamount}
                    </Text>
                  </ImageBackground>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Invoice;
