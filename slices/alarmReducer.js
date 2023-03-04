import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  reminder: null,
};
export const reminderSlice = createSlice({
  name: "reminder",
  initialState,
  reducers: {
    addReminder: (state, action) => {
      state.reminder = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addReminder } = reminderSlice.actions;
export const selectReminder = (state) => state.reminder.reminder;

export default reminderSlice.reducer;
