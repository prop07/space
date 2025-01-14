import { configureStore } from "@reduxjs/toolkit";
import spaceReducer from "./features/space/slice";
import fieldReducer from "./features/field/slice";

const store = configureStore({
  reducer: {
    space: spaceReducer,
    field: fieldReducer,
  },
});

export default store;