import { create } from "zustand";

interface Store {
    // Première étape
    category: string;
    setCategory: (category: string) => void;

    // Deuxième étape
    title: string;
    setTitle: (title: string) => void;
    description: string;
    setDescription: (description: string) => void;
    guests: number;
    setGuests: (guests: number) => void;
    bedrooms: number;
    setBedrooms: (bedrooms: number) => void;
    bathrooms: number;
    setBathrooms: (bathrooms: number) => void;
    price: number;
    setPrice: (price: number) => void;
    photo: string;
    setPhoto: (photo: string) => void;

    // Troisième étape
    country: string;
    setCountry: (country: string) => void;
    address: string;
    setAddress: (address: string) => void;
    type: string;
    setType: (type: string) => void;

    // Quatrième étape
    instantBooking: boolean;
    setInstantBooking: (instantBooking: boolean) => void;

    // Fonctions utilitaires
    reset: () => void;
}

const initialState = {
    category: '',
    title: '',
    description: '',
    guests: 1,
    bedrooms: 1,
    bathrooms: 1,
    photo: '',
    country: '',
    price: 0,
    address: '',
    type: '',
    instantBooking: false,
};

export const useStore = create<Store>((set, get) => ({
    ...initialState,

    setCategory: (category) => set({ category }),
    setTitle: (title) => set({ title }),
    setDescription: (description) => set({ description }),
    setGuests: (guests) => set({ guests }),
    setBedrooms: (bedrooms) => set({ bedrooms }),
    setBathrooms: (bathrooms) => set({ bathrooms }),
    setPhoto: (photo) => set({ photo }),
    setCountry: (country) => set({ country }),
    setPrice: (price) => set({ price }),
    setAddress: (address) => set({ address }),
    setType: (type) => set({ type }),
    setInstantBooking: (instantBooking) => set({ instantBooking }),

    reset: () => set(initialState),
}));