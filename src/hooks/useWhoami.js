import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  setId,
  clean,
  setIsSuperUser,
  setNeonName,
  setChatLink,
} from "../redux/accountSlice";

import accountService from "../services/account";

export default function useWhoami(props) {
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    if (!account.token) {
      return;
    }

    accountService
      .whoami(account.token)
      .then((response) => {
        console.debug(response);
        if (response.status === 200) {
          dispatch(setId(response.data._id));
          dispatch(setIsSuperUser(response.data.isSuper));
          dispatch(setNeonName(response.data.firstName));
          dispatch(setChatLink(response.data.chatConnectionString));
        }

        if (response.status === 401) {
          dispatch(clean());

          history.push("/");
        }
      })
      .catch((error) => console.error(error));
  }, [account.token]);
}
