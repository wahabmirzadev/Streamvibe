export const fetchSeriesCategories = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/series/categories`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.categories;
    } catch (error) {
        console.error('Error fetching series categories:', error);
        return [];
    }
};


export const fetchTopRatedCategories = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/series/top-rated?limit=4`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.series;
}


export const getTrendingSeries = async (currentPage, page) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/series/trending-series?page=${currentPage || page || 1}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching trending series:", error);
        return [];
    }
}

export const getNewReleasedSeries = async (currentPage, page) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/series/new-released?page=${currentPage || page || 1}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching trending series:", error);
    }
}

export const getPopularSeries = async (currentPage, page) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/series/popular-series?page=${currentPage || page || 1}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching trending series:", error);
    }
}

export const fetchSingleSeries = async (slug) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/series/${slug}`);
    const data = await res.json();
    return data;
}

export const fetchSingleEpisode = async (series, season, episode) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/episode/${series}/${season}/${episode}`);
        const data = await res.json();
        return data.episode;
    } catch (error) {
        console.log(error);
    }
}


export const downloadEpisodeApi = async (url) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/episode/download`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });
        if (!response.ok) {
            throw new Error(`Failed to download file: ${response.statusText}`);
        }
        return response;
    } catch (error) {
        console.error('Download error:', error);
    }
};

export const fetchGenreSeries = async (genre, currentPage, page,topRated) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/series/seriesByGenre/${genre}?page=${currentPage || page || 1}&topRated=${topRated}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching genre movies:", error);
        return [];
    }
}