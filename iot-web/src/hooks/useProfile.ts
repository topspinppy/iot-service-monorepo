import axios from "@/utils/axios";
import {
  useQuery,
} from '@tanstack/react-query';

export interface IProfileResponse {
  _id: string;
  userName: string;
  fullName: string;
  email: string;
}

const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;

const fetchData = async (): Promise<IProfileResponse> => {
  const { data: loggedInUser } = await axios.get<IProfileResponse>(`/api/users/profile`);
  return loggedInUser;
};

export default function useProfile() {
  const { data } = useQuery({ queryKey: ['profile'], queryFn: () => fetchData(), staleTime: ONE_HOUR })
  return {
    data,
  };
}
