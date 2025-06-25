import { configureStore } from "@reduxjs/toolkit";
import myDigimonReducer from "./myDigimonSlice";

export const store = configureStore({
	reducer: {
		myDigimon: myDigimonReducer,
	},
});
