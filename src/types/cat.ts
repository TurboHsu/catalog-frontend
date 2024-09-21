export type Cat = {
    uuid: string;
    caption: string;
    image: string;
    thumbnail: string;
    created_at: string;
    reactions: Reaction[];
}

export type Reaction = {
    emoji: string;
    count: number;
    is_reacted: boolean;
}