import { useQuery } from "@tanstack/react-query";

type UserProfile = {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    role: string;
    officeCode: string;
  };
};

const getUserProfile = async (): Promise<UserProfile> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/verify`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
};

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
    staleTime: 1000 * 60 * 5,
  });
};