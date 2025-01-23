export const likeApi = async (userId, media) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/like/like`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                media,
            }),
        });
    } catch (error) {
        console.error(error);
    }
}


export const unlikeApi = async (userId, media) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/like/unlike`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                media,
            }),
        });
    } catch (error) {
        console.error(error);
    }
}


export const likeStatusApi = async (userId, media) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/like/status/${userId}/${media}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}