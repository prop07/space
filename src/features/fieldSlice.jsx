import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSpaceDetail } from "./spaceSlice";

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
    return rejectWithValue({
      status: "error",
      message: error.message || "Unknown error occurred",
    });
  }
};

export const addField = createAsyncThunk(
  "space/addField",
  async ({ id, fieldData }, { rejectWithValue, dispatch, getState }) => {
    const data = await fetchWithErrorHandling(
      `${apiUrl}/space/${id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fieldData),
      },
      rejectWithValue
    );

    // Call getSpaceDetail after successful operation
    if (data.status === "success") {
      const reduxStore = getState();
      const space_code = reduxStore.space?.space_code;

      if (space_code) {
        console.log("space_code: ", space_code);
        dispatch(getSpaceDetail(space_code));
      } else {
        console.error("space_code not found in the state");
      }
    }

    return data;
  }
);

export const updateField = createAsyncThunk(
  "space/updateField",
  async ({ id, fieldData }, { rejectWithValue, dispatch, getState }) => {
    const data = await fetchWithErrorHandling(
      `${apiUrl}/space/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fieldData),
      },
      rejectWithValue
    );

    if (data.status === "success") {
      const reduxStore = getState();
      const space_code = reduxStore.space?.space_code;

      if (space_code) {
        console.log("space_code: ", space_code);
        dispatch(getSpaceDetail(space_code));
      } else {
        console.error("space_code not found in the state");
      }
    }

    return data;
  }
);

export const deleteField = createAsyncThunk(
  "space/deleteField",
  async ({ id, fieldData }, { rejectWithValue, dispatch, getState }) => {
    const data = await fetchWithErrorHandling(
      `${apiUrl}/space/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fieldData),
      },
      rejectWithValue
    );

    if (data.status === "success") {
      const reduxStore = getState();
      const space_code = reduxStore.space?.space_code;

      if (space_code) {
        console.log("space_code: ", space_code);
        dispatch(getSpaceDetail(space_code));
      } else {
        console.error("space_code not found in the state");
      }
    }

    return data;
  }
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
      state.data = null;
      state.status = "loading";
      state.message = null;
    };

    const handleFulfilled = (state, action, successMessage) => {
      state.data = action.payload.data;
      state.status = "success";
      state.message = action.payload.message || successMessage;
    };

    const handleRejected = (state, action, failureMessage) => {
      state.status = "error";
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
