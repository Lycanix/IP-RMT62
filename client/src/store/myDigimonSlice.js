import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// === Async Thunks ===

export const fetchMyDigimons = createAsyncThunk("myDigimon/fetch", async () => {
	const token = localStorage.getItem("access_token");
	const { data } = await axios.get(`${BASE_URL}/mydigimons`, {
		headers: { Authorization: `Bearer ${token}` },
	});
	return data;
});

export const feedDigimon = createAsyncThunk("myDigimon/feed", async (id) => {
	const token = localStorage.getItem("access_token");
	const { data } = await axios.patch(
		`${BASE_URL}/mydigimons/${id}/feed`,
		null,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return data;
});

export const trainDigimon = createAsyncThunk("myDigimon/train", async (id) => {
	const token = localStorage.getItem("access_token");
	const { data } = await axios.patch(
		`${BASE_URL}/mydigimons/${id}/train`,
		null,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return data;
});

export const playDigimon = createAsyncThunk("myDigimon/play", async (id) => {
	const token = localStorage.getItem("access_token");
	const { data } = await axios.patch(
		`${BASE_URL}/mydigimons/${id}/play`,
		null,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return data;
});

export const deleteDigimon = createAsyncThunk(
	"myDigimon/delete",
	async (id) => {
		const token = localStorage.getItem("access_token");
		await axios.delete(`${BASE_URL}/mydigimons/${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		return id; // return id to remove from state
	}
);

export const buyDigimon = createAsyncThunk("myDigimon/buy", async (digimon) => {
	const token = localStorage.getItem("access_token");
	const { data } = await axios.post(`${BASE_URL}/market/buy`, digimon, {
		headers: { Authorization: `Bearer ${token}` },
	});
	return data;
});

// === Slice ===

const myDigimonSlice = createSlice({
	name: "myDigimon",
	initialState: {
		digimons: [],
		loading: false,
		error: null,
		lastInteracted: null,
		lastAction: null,
	},
	reducers: {
		setLastInteracted(state, action) {
			state.lastInteracted = action.payload.digimon;
			state.lastAction = action.payload.action;
		},
	},
	extraReducers: (builder) => {
		builder
			// === FETCH ===
			.addCase(fetchMyDigimons.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchMyDigimons.fulfilled, (state, action) => {
				state.loading = false;
				state.digimons = action.payload;
			})
			.addCase(fetchMyDigimons.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(buyDigimon.fulfilled, (state, action) => {
				state.digimons.push(action.payload);
			})

			// === FEED ===
			.addCase(feedDigimon.fulfilled, (state, action) => {
				const updated = action.payload;
				const index = state.digimons.findIndex((d) => d.id === updated.id);
				if (index !== -1) state.digimons[index] = updated;
			})

			// === TRAIN ===
			.addCase(trainDigimon.fulfilled, (state, action) => {
				const updated = action.payload;
				const index = state.digimons.findIndex((d) => d.id === updated.id);
				if (index !== -1) state.digimons[index] = updated;
			})

			// === PLAY ===
			.addCase(playDigimon.fulfilled, (state, action) => {
				const updated = action.payload;
				const index = state.digimons.findIndex((d) => d.id === updated.id);
				if (index !== -1) state.digimons[index] = updated;
			})

			// === DELETE ===
			.addCase(deleteDigimon.fulfilled, (state, action) => {
				state.digimons = state.digimons.filter((d) => d.id !== action.payload);
			});
	},
});

export const { setLastInteracted } = myDigimonSlice.actions;
export default myDigimonSlice.reducer;
