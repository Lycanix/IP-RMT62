import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const fetchMarketDigimons = createAsyncThunk(
	"market/fetchMarketDigimons",
	async (page = 1) => {
		const limit = 20;
		const res = await fetch("https://digimon-api.vercel.app/api/digimon");
		const allData = await res.json();
		const start = (page - 1) * limit;
		const end = start + limit;
		return allData.slice(start, end);
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
				if (action.meta.arg === 1) {
					// Jika page 1, replace data
					state.digimons = action.payload;
				} else {
					// Jika page > 1, tambahkan data
					state.digimons = [...state.digimons, ...action.payload];
				}
				state.hasMore = action.payload.length > 0;
				state.loading = false;
			})
			.addCase(fetchMarketDigimons.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default marketSlice.reducer;
