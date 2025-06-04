import { ref } from "vue"

export const useModal = () => {
    const isModalVisible = ref<boolean>(false)

    const openModal = () => {
        isModalVisible.value = true
    }

    const closeModal = () => {
        isModalVisible.value = false
    }

    return {
        isModalVisible,
        openModal,
        closeModal,
    }
}