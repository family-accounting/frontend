import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ITag } from '@/interfaces/tag.interface'
import { fakeTags } from '@/utils/tag.fake'

export const useTagStore = defineStore('tag', () => {
    const tags = ref<ITag[]>([...fakeTags])

    const getTagById = (tagId: ITag['id']) => {
        return tags.value.find((tag) => tag.id === tagId) as ITag
    }

    const createTag = (tag: ITag) => {
        tags.value.push(tag)
    }

    const updateTag = (tag: ITag) => {
            const index = tags.value.findIndex((tag) => tag.id === tag.id)
        tags.value[index] = tag
    }

    const deleteTag = (tagId: ITag['id']) => {
        tags.value = tags.value.filter((tag) => tag.id !== tagId)
    }

    return { tags, getTagById, createTag, updateTag, deleteTag }
})
