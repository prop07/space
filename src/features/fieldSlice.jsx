import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_API_URL;
if (!apiUrl) {
  throw new Error("API URL is not defined. Check your environment variables.");
}

// Reusable fetch function
const fetchWithErrorHandling = async (url, options, rejectWithValue) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok || data.status === "error") {
      return rejectWithValue(data.message || "Operation failed");
    }
    return data;
  } catch (error) {
    return rejectWithValue(error.message || "Something went wrong");
  }
};

export const addField = createAsyncThunk(
  "space/addField",
  async ({ id, fieldData }, { rejectWithValue }) =>
    fetchWithErrorHandling(
      `${apiUrl}/space/${id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fieldData),
      },
      rejectWithValue
    )
);

export const updateField = createAsyncThunk(
  "space/updateField",
  async ({ id, fieldData }, { rejectWithValue }) =>
    fetchWithErrorHandling(
      `${apiUrl}/space/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fieldData),
      },
      rejectWithValue
    )
);

export const deleteField = createAsyncThunk(
  "space/deleteField",
  async ({ id, fieldData }, { rejectWithValue }) =>
    fetchWithErrorHandling(
      `${apiUrl}/space/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fieldData),
      },
      rejectWithValue
    )
);

const fieldSlice = createSlice({
  name: "field",
  initialState: {
    data: null,
    status: "idle",
    message: null,
  },
  reducers: {
    resetField: (state) => {
      state.data = null;
      state.status = "idle";
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.status = "loading";
      state.message = null;
    };

    const handleFulfilled = (state, action, successMessage) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.message = successMessage;
    };

    const handleRejected = (state, action, failureMessage) => {
      state.status = "failed";
      state.message = action.payload || failureMessage;
    };

    builder
      .addCase(addField.pending, handlePending)
      .addCase(addField.fulfilled, (state, action) =>
        handleFulfilled(state, action, "Field added successfully!")
      )
      .addCase(addField.rejected, (state, action) =>
        handleRejected(state, action, "Failed to add field.")
      );

    builder
      .addCase(updateField.pending, handlePending)
      .addCase(updateField.fulfilled, (state, action) =>
        handleFulfilled(state, action, "Field updated successfully!")
      )
      .addCase(updateField.rejected, (state, action) =>
        handleRejected(state, action, "Failed to update field.")
      );

    builder
      .addCase(deleteField.pending, handlePending)
      .addCase(deleteField.fulfilled, (state, action) =>
        handleFulfilled(state, action, "Field deleted successfully!")
      )
      .addCase(deleteField.rejected, (state, action) =>
        handleRejected(state, action, "Failed to delete field.")
      );
  },
});

export const { resetField } = fieldSlice.actions;
export default fieldSlice.reducer;
