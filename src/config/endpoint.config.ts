import type { IGroup } from '@/interfaces/group.interface'

export const Api = {
  groups: {
    getAll: (): string => '/groups',
    create: (): string => `/groups`,
    update: (id: IGroup['id']): string => `/groups/${id}`,
    delete: (id: IGroup['id']): string => `/groups/${id}`,
  },
}
