import { createSlice } from "@reduxjs/toolkit";
import { addField, updateField, deleteField } from "./api";

const initialState = {
  data: null,
  status: "idle",
  message: null,
};

const fieldSlice = createSlice({
  name: "field",
  initialState,
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
