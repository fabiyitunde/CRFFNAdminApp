import React, { Component } from "react";
import { Text, View, ImageBackground } from "react-native";

import styles from "./styles";
import Images from "../../../Themes/Images";
const Invoice = ({ header, details }) => {
  return (
    <View>
      <View style={styles.detailContainer}>
        <View>
          <View style={styles.productDetail}>
            <Text style={styles.textStyleBold}>{header.payername}</Text>
            <Text style={styles.textStyle}>{header.payerphonenumber}</Text>
            <Text style={styles.textStyle}>{header.payeremail}</Text>
            <Text style={styles.textStyle}>{header.address}</Text>

            <View style={styles.row}>
              <Text style={styles.textStyle}>Status</Text>
              <Text style={styles.discountPrise}> {header.status}</Text>
            </View>
          </View>

          <View style={styles.contentSpace}>
            <View style={styles.row}>
              <Text style={styles.textStyle}>Category </Text>
              <Text style={[styles.textStyleBrand, styles.textStyle]}>
                {header.category}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.textStyle}>Ref. Date </Text>
              <Text style={[styles.textStyleBrand, styles.textStyle]}>
                {header.refdate}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.textStyle}>Invoice Amount </Text>
              <Text style={[styles.textStyleBrand, styles.textStyle]}>
                {header.totalinvoiceamount}
              </Text>
            </View>
          </View>

          <View style={styles.contentSpace}>
            <Text style={styles.textStyle}>{header.narration}</Text>
          </View>

          <View style={styles.contentSpace}>
            {details.map((item, index) => {
              return (
                <View key={index} style={styles.row}>
                  <Text style={styles.textStyle}> {item.category}</Text>

                  <Text style={styles.textStyle}>-- {item.amount}</Text>
                </View>
              );
            })}
          </View>

          <View style={[styles.divider, styles.contentSpace]} />
        </View>
      </View>
    </View>
  );
};

export default Invoice;
