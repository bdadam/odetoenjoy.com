export type Image = {
    url: string;
    width: number;
    height: number;
};

export type Video = {
    title: string;
    video: string;
    image: Image;
    thumbnail: Image;
    durationSeconds: number;
    durationFormatted: string;
    description: string;
    featured: boolean;
    tags: string[];
    slug: string;
    quality: number;
    // alternativeVideos?: string[];
    artists?: [{ name: string; type: string }];
};
