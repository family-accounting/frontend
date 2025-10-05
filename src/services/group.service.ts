import { Api } from '@/config/endpoint.config'
import { httpClient } from '@/config/http.config'
import type { IGroup } from '@/interfaces/group.interface'
import type { IResponseSuccess } from '@/interfaces/response.interface'

export const useGroupService = () => {
  const getAll = async () => {
    const response = await httpClient.get<IResponseSuccess<IGroup[]>>(Api.groups.getAll())
    return response.data
  }

  const createOne = async (group: IGroup) => {
    const response = await httpClient.post<IResponseSuccess<IGroup>>(Api.groups.create(), group)
    return response.data
  }

  const updateById = async (group: IGroup) => {
    const response = await httpClient.put<IResponseSuccess<IGroup>>(
      Api.groups.update(group.id),
      group,
    )
    return response.data
  }

  const deleteById = async (id: IGroup['id']) => {
    const response = await httpClient.delete<IResponseSuccess<IGroup>>(Api.groups.delete(id))
    return response.data
  }

  return {
    getAll,
    createOne,
    updateById,
    deleteById,
  }
}
