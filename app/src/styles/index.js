"use strict";

import { StyleSheet, Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const scale = Math.min(SCREEN_WIDTH / 360, 1.2);

export function normalize(size) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

const iconText = normalize(9);
const extraSmallText = normalize(10);
const smallText = normalize(12);
const descriptionText = normalize(13);
const normalText = normalize(16);
const largeText = normalize(18);
const extraLargeText = normalize(20);

export const colors = {
  primary: "#eb4447",
  secondary: "#eb4447",
  bg: "#f8f8fb",
  bgDark: "#d3defd",
  empty: "#848ca3",
  shadow: "rgba(0,0,0,0.2)",
  frost: "rgba(255,255,255,0.2)",
  text: "#212121",
  statusBar: "#243463",
  header: "#000",
  lightGrey: "#f8f8fb",
  grey: "#5e5f61",
  darkGrey: "#2f3032",
  black: "#000",
  red: "#eb4447",
  green: "#44eb95",
  blue: "#147efb",
  white: "#fff",
  border: "rgba(0,0,0,0.3)",
  icon: "#212121"
};

export default {
  headerTransparent: {
    borderBottomColor: "transparent",
    elevation: 0,
    shadowOpacity: 0,
    paddingLeft: 10,
    paddingRight: 10
  },
  container: { flex: 1, backgroundColor: colors.bg },
  modalContainer: { flex: 1, backgroundColor: colors.secondary },
  textGrey: { color: colors.grey, fontSize: normalText },
  textLink: { color: colors.secondary, fontSize: smallText },

  textIcon: { color: colors.text, fontSize: iconText },
  textIconWhite: { color: colors.white, fontSize: iconText },

  textExtraSmall: { color: colors.text, fontSize: extraSmallText },
  textExtraSmallWhite: { color: colors.white, fontSize: extraSmallText },

  textSmall: { color: colors.text, fontSize: smallText },
  textSmallWhite: { color: colors.white, fontSize: smallText },

  textDescription: { color: colors.text, fontSize: descriptionText },
  textDescriptionWhite: { color: colors.white, fontSize: descriptionText },

  text: { color: colors.text, fontSize: normalText },
  textWhite: { color: colors.white, fontSize: normalText },

  textLarge: { color: colors.text, fontSize: largeText },
  textLargeWhite: { color: colors.white, fontSize: largeText },

  textExtraLarge: {
    color: colors.text,
    fontSize: extraLargeText,
    letterSpacing: 0.5
  },
  textExtraLargeWhite: { color: colors.white, fontSize: extraLargeText },

  altText: { color: colors.empty, fontSize: normalText },
  textSmallAlt: { color: colors.empty, fontSize: smallText },

  titleSmall: {
    color: colors.darkGrey,
    fontWeight: "bold",
    fontSize: smallText
  },
  titleSmallWhite: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: smallText
  },

  title: {
    color: colors.darkGrey,
    fontWeight: "bold",
    fontSize: normalText
  },
  titleWhite: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: normalText
  },

  titleLarge: {
    color: colors.darkGrey,
    fontWeight: "bold",
    fontSize: largeText
  },
  titleLargeWhite: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: largeText
  },

  titleExtraLarge: {
    color: colors.text,
    fontWeight: "bold",
    fontSize: extraLargeText
  },
  titleExtraLargeWhite: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: extraLargeText
  },
  textAvatar: { color: colors.white, fontWeight: "bold", fontSize: 18 },
  listDescription: { color: colors.white, fontSize: 15 },

  row: { flexDirection: "row", alignItems: "center" },
  itemContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    padding: 15
  },
  itemContainerWhite: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    backgroundColor: colors.white,
    padding: 15
  },
  itemRowContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    padding: 15
  },
  itemRowContainerWhite: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: 15
  },

  borderBottom: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border
  },
  listHeader: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.secondary
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: "rgba(0,0,0,0.45)"
  },
  listSubHeader: {
    backgroundColor: colors.lightGrey,
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border
  },
  listContent: {
    backgroundColor: colors.white,
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  buttonText: { color: colors.white, fontWeight: "bold", fontSize: 16 },
  inputContainer: {
    margin: 10,
    width: "90%",
    maxWidth: 300
  },
  inputHeader: {
    color: colors.white,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 18
  },
  input: {
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.white,
    padding: 8,
    height: 45,
    flexDirection: "column",
    justifyContent: "center"
  },
  textInput: {
    borderBottomWidth: 2,
    borderBottomColor: colors.black,
    paddingVertical: 10
  },
  textArea: {
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.white,
    padding: 8,
    paddingVertical: 10,
    flexDirection: "column",
    justifyContent: "center",
    minHeight: 100,
    textAlignVertical: "top"
  }
};
