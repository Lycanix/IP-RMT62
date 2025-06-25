import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const fetchMarketDigimons = createAsyncThunk(
	"market/fetch",
	async () => {
		const { data } = await axios.get(`${BASE_URL}/market`);
		return data;
	}
);

const marketSlice = createSlice({
	name: "market",
	initialState: {
		digimons: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMarketDigimons.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchMarketDigimons.fulfilled, (state, action) => {
				state.loading = false;
				state.digimons = action.payload;
			})
			.addCase(fetchMarketDigimons.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default marketSlice.reducer;
