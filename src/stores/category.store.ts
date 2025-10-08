import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ICategory } from '@/interfaces/category.interface'
    import { fakeCategories } from '@/utils/category.fake'

export const useCategoryStore = defineStore('category', () => {
    const categories = ref<ICategory[]>([...fakeCategories])

    const getCategoryById = (categoryId: ICategory['id']) => {
            return categories.value.find((category) => category.id === categoryId) as ICategory
    }

    const createCategory = (category: ICategory) => {
        categories.value.push(category)
    }

    const updateCategory = (category: ICategory) => {
            const index = categories.value.findIndex((category) => category.id === category.id)
        categories.value[index] = category
    }

    const deleteCategory = (categoryId: ICategory['id']) => {
        categories.value = categories.value.filter((category) => category.id !== categoryId)
    }

    return { categories, getCategoryById, createCategory, updateCategory, deleteCategory }
})
