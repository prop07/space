import { configureStore } from "@reduxjs/toolkit";
import spaceReducer from "./features/spaceSlice";
import fieldReducer from "./features/fieldSlice";

const store = configureStore({
  reducer: {
    space: spaceReducer,
    field: fieldReducer,
  },
});

export default store;
