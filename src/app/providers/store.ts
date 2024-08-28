import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "../../features/editUser/api/usersApi";
import { departmentsApi } from "../../features/editUser/api/departmentsApi";
import { countriesApi } from "../../features/editUser/api/countriesApi";
import { statusesApi } from "../../features/editUser/api/statusesApi";
import AddUserModalSlice from "../../features/addUser/slices/AddUserModalSlice";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [departmentsApi.reducerPath]: departmentsApi.reducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
    [statusesApi.reducerPath]: statusesApi.reducer,
    addUserModal: AddUserModalSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      usersApi.middleware,
      departmentsApi.middleware,
      countriesApi.middleware,
      statusesApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
