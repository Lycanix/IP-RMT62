import { configureStore } from "@reduxjs/toolkit";
import myDigimonReducer from "./myDigimonSlice";
import marketReducer from "./marketSlice"; //

export const store = configureStore({
	reducer: {
		myDigimon: myDigimonReducer,
		market: marketReducer,
	},
});
