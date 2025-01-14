import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSpaceDetail } from "../space/slice";
import fetchWithErrorHandling from "@/utils/fetchWithErrorHandling";

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error("API URL is not defined. Check your environment variables.");
}

export const addField = createAsyncThunk(
  "field/addField",
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

    if (data.status === "success") {
      const { space_code } = getState().space || {};
      if (space_code) {
        dispatch(getSpaceDetail(space_code));
      } else {
        console.error("space_code not found in the state");
      }
    }

    return data;
  }
);

export const updateField = createAsyncThunk(
  "field/updateField",
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
      const { space_code } = getState().space || {};
      if (space_code) {
        dispatch(getSpaceDetail(space_code));
      } else {
        console.error("space_code not found in the state");
      }
    }

    return data;
  }
);

export const deleteField = createAsyncThunk(
  "field/deleteField",
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
      const { space_code } = getState().space || {};
      if (space_code) {
        dispatch(getSpaceDetail(space_code));
      } else {
        console.error("space_code not found in the state");
      }
    }

    return data;
  }
);
