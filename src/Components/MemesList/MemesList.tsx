import {useEffect} from "react";
import {fetchMemes} from "../../Slices/MemesSlice.ts";
import {useAppDispatch, useAppSelector} from "../../hooks.ts";

export const MemesList = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchMemes())
    }, [dispatch])

    const memes = useAppSelector((state) => state.memes.value);
    const isLoading = useAppSelector((state) => state.memes.isLoading);
    const error = useAppSelector((state) => state.memes.errorMessage);

    if (isLoading) {
        return 'loading...'
    }

    if (error) {
        return 'Error'
    }

    return (
        <>
            {memes.map((meme) => (
                <div
                    key={meme.id}>{meme.image}</div>
            ))}
        </>
    );
};