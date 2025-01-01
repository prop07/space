import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_API_URL;
if (!apiUrl) {
  throw new Error("API URL is not defined. Check your environment variables.");
}

// Async thunk for fetching data
export const getSpaceDetail = createAsyncThunk(
  "space/fetchData",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/space/${id}`);
      const data = await response.json();

      if (!response.ok || data.status === "error") {
        return rejectWithValue(data.message || "Failed to fetch space data");
      }

      return data; // Expecting `status: "success"` and other fields
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const spaceSlice = createSlice({
  name: "space",
  initialState: {
    data: null,
    status: "idle",
    message: null,
  },
  reducers: {
    resetSpace: (state) => {
      state.data = null;
      state.status = "idle";
      state.message = null;
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
        state.data = action.payload.fields;
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

export const { resetSpace } = spaceSlice.actions;
export default spaceSlice.reducer;
