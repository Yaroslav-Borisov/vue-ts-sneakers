import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import type { Card } from "../types/Card";

interface CardStore {
    cards: Ref<Card[]>,
    getCardById: (id: number) => Card | undefined,
    updateCard: (id: number, card: Partial<Card>) => void,
}

export const useCardStore = defineStore('cardStore', (): CardStore => {
    const cards = ref<Card[]>([
        {
            id: 1,
            image: "/sneakers/1.jpg",
            title: "Мужские Кроссовки Nike Blazer Mid Suede",
            price: 12999,
            isFavorite: true,
            isCart: false,
        },
        {
            id: 2,
            image: "/sneakers/2.jpg",
            title: "Мужские Кроссовки Nike Air Max 270",
            price: 12999,
            isFavorite: false,
            isCart: true,
        },
        {
            id: 3,
            image: "/sneakers/3.jpg",
            title: "Мужские Кроссовки Nike Blazer Mid Suede",
            price: 8499,
            isFavorite: true,
            isCart: false,
        },
        {
            id: 4,
            image: "/sneakers/4.jpg",
            title: "Кроссовки Puma X Aka Boku Future Rider",
            price: 8499,
            isFavorite: false,
            isCart: false,
        },
        {
            id: 5,
            image: "/sneakers/5.jpg",
            title: "Мужские Кроссовки Under Armour Curry 8",
            price: 15199,
            isFavorite: true,
            isCart: true,
        },
        {
            id: 6,
            image: "/sneakers/6.jpg",
            title: "Мужские Кроссовки Nike Kyrie 7",
            price: 11299,
            isFavorite: false,
            isCart: false,
        },
        {
            id: 7,
            image: "/sneakers/7.jpg",
            title: "Мужские Кроссовки Jordan Air Jordan 11",
            price: 10799,
            isFavorite: false,
            isCart: true,
        },
        {
            id: 8,
            image: "/sneakers/8.jpg",
            title: "Мужские Кроссовки Nike LeBron XVIII",
            price: 16499,
            isFavorite: true,
            isCart: false,
        },
        {
            id: 9,
            image: "/sneakers/9.jpg",
            title: "Мужские Кроссовки Nike LeBron XVIII Low",
            price: 13999,
            isFavorite: false,
            isCart: false,
        },
        {
            id: 10,
            image: "/sneakers/10.jpg",
            title: "Мужские Кроссовки Nike Kyrie Flytrap IV",
            price: 11299,
            isFavorite: true,
            isCart: false,
        },
    ]);

    const getCardById = (id: number) => {
        return cards.value.find((c) => c.id === id);
    };

    const updateCard = (id: number, card: Partial<Card>) => {
        const targetCard = getCardById(id);

        if (targetCard) {
            const updatedCard = { ...targetCard, ...card };
            cards.value = cards.value.map((c) => (c.id === id ? updatedCard : c));
        }
    };

    return {
        cards,
        getCardById,
        updateCard
    }
})