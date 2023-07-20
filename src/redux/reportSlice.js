import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";
import { act } from "react-dom/cjs/react-dom-test-utils.production.min";

export const counterSlice = createSlice({
  name: "report",
  initialState: {
    harassment: false,
    suspicious: false,
    abusive: false,
    llegal: false,
    solicting: false,
    isReportOpen: false,
    isReportSubmited: false,
  },
  reducers: {
    setIsHarassment: (state, action) => {
      state.harassment = action.payload;
    },
    setIsSuspicious: (state, action) => {
      state.suspicious = action.payload;
    },
    setIsAbusive: (state, action) => {
      state.abusive = action.payload;
    },
    setIsIllegal: (state, action) => {
      state.illegal = action.payload;
    },
    setIsSolicting: (state, action) => {
      state.solicting = action.payload;
    },
    setIsReportOpen: (state, action) => {
      state.isReportOpen = action.payload;
    },
    setIsReportSubmited: (state, action) => {
      state.isReportSubmited = action.payload;
    },
  },
});
export const {
  setIsHarassment,
  setIsSuspicious,
  setIsAbusive,
  setIsIllegal,
  setIsSolicting,
  setIsReportOpen,
  setIsReportSubmited,
} = counterSlice.actions;
export default counterSlice.reducer;
