import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type login = {
  username: string;
  password: string;
};

const loginAPI = async (loginData: login) => {
  const res = await axios.post("/auth/customer/login", loginData);
  return res;
};

export const useLogin = ({ username, password }: login) => {
  const query = useQuery({
    queryKey: ["login", username, password],
    queryFn: () => loginAPI({ username, password }),
    enabled: false,
  });
  return query;
};
