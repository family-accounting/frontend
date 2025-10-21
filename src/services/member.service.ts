import api from "@/config/api.config";
import { IMember } from "@/interfaces/member.interface";

export const useMemberService = () => {
  const getMembers = async () => {
    const response = await api.get("/members");
    return response.data;
  };

  const getMember = async (id: IMember["id"]) => {
    const response = await api.get(`/members/${id}`);
    return response.data;
  };

  const createMember = async (
    member: Pick<IMember, "name" | "icon" | "groupId" | "isAdmin" | "isActive" | "isDeleted" | "isBlocked" | "isVerified" | "isEmailVerified" | "isPhoneVerified">,
  ) => {
    const response = await api.post("/members", member);
    return response.data;
  };

  const updateMember = async (
    id: IMember["id"],
    member: Partial<IMember>,
  ) => {
    const response = await api.put(`/members/${id}`, member);
    return response.data;
  };

  const deleteMember = async (id: IMember["id"]) => {
    const response = await api.delete(`/members/${id}`);
    return response.data;
  };
  return { getMembers, getMember, createMember, updateMember, deleteMember };
};
