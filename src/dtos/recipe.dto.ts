export interface CreateRecipeDto {
    title: string;
    description: string;
    ingredients: string [];
    instructions: string;
}

export interface UpdateRecipeDto {
    title?: string;
    description?: string;
    ingredients?: string [];
    instructions?: string;
}


export interface SearchRecipeDto {
    name: string;
}