import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userReducer";
import reminderSlice from "./slices/alarmReducer";

export const store = configureStore({
  reducer: {
    user: userSlice,
    reminder: reminderSlice,
  },
});
