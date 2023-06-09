import { createSlice } from "@reduxjs/toolkit";
import { setIsLoading } from "./isLoading.slice";
import axios from "axios";

export const newsSlice = createSlice({
  name: "news",
  initialState: [],
  reducers: {
    setNews: (state, action) => {
      return action.payload;
    }
  }
});

export const { setNews } = newsSlice.actions;

export default newsSlice.reducer;

// redux thunk / middlewares
// Se ejecutan entre el dispatch y la accion

/*
export const myFunctionThunk = () => dispatch => {
    //Tareas a realizar
    dispatch( actionName1() )

    //Mas tareas
    dispatch( actionName2() )
}
*/

export const getNewsThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));

  axios
    .get("https://news-app-api.academlo.tech/news/")
    .then((resp) => {
      dispatch(setNews(resp.data));
      console.log(resp.data);
    })
    .catch((error) => console.error(error))
    .finally(() => dispatch(setIsLoading(false)));
  //.finally(() => {}) -> metodo que se ejecuta cuando la promesa es resuelta (no importa si fue satisfactoria o rechazada)
};

export const filterCategoryThunk = (id) => (dispatch) => {
  dispatch(setIsLoading(true));

  axios
    .get(`https://news-app-api.academlo.tech/news/?category=${id}`)
    .then((resp) => dispatch(setNews(resp.data)))
    .catch((error) => console.error(error))
    .finally(() => dispatch(setIsLoading(false)));
};

export const filterHeadlineThunk = (value) => (dispatch) => {
  dispatch(setIsLoading(true));

  axios
    .get(
      `https://news-app-api.academlo.tech/news/?headline__icontains=${value}`
    )
    .then((resp) => dispatch(setNews(resp.data)))
    .catch((error) => console.error(error))
    .finally(() => dispatch(setIsLoading(false)));
};
