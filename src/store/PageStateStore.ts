import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { PageState } from "../enums/PageState";

interface PageStateStore {
    pageState: Ref<PageState>,
    changePageState: (newPageState: PageState) => void,

}

export const usePageStateStore = defineStore('pageStateStore', (): PageStateStore => {
    const pageState = ref<PageState>(PageState.All);

    const changePageState = (newPageState: PageState) => {
        pageState.value = newPageState;
    };

    return {
        pageState,
        changePageState,
    }
})