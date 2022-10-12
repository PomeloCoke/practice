import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import action from "./action";
import state from "./state";

const store: STORE = makeAutoObservable({
  data: state,
  ...action
})

const useStore = () => useContext(createContext(store))

export default useStore