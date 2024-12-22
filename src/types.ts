interface Pet {
    id: string,
    name: string,
    type: string,
}

interface NewPet {
    name?: string,
    type?: string,
}

export type {
    Pet,
    NewPet,
}