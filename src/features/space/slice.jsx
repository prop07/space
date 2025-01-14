import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSpaceDetail } from "./api";

const initialState = {
  data: null,
  status: "idle",
  message: null,
  space_code: null,
};

// Async thunk for fetching space details
export const getSpaceDetail = createAsyncThunk(
  "space/fetchData",
  async (id, { rejectWithValue }) => {
    try {
      const data = await fetchSpaceDetail(id);
      return data; // Assuming `data` is the response object
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const spaceSlice = createSlice({
  name: "space",
  initialState,
  reducers: {
    resetSpace: (state) => {
      state.data = null;
      state.status = "idle";
      state.message = null;
    },
    updateSpaceCode: (state, action) => {
      state.space_code = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSpaceDetail.pending, (state) => {
        state.status = "pending";
        state.message = null;
      })
      .addCase(getSpaceDetail.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload.data.fields;
        state.message =
          action.payload.message || "Data retrieved successfully.";
      })
      .addCase(getSpaceDetail.rejected, (state, action) => {
        state.status = "error";
        state.data = null;
        state.message = action.payload || "Failed to fetch space data";
      });
  },
});

export const { resetSpace, updateSpaceCode } = spaceSlice.actions;
export default spaceSlice.reducer;
