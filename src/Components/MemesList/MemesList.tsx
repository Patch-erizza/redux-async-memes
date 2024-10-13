import {useEffect} from "react";
import {fetchMemes} from "../../Slices/MemesSlice.ts";
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import classes from "./MemesList.module.css"
import {selectTags} from "../../Slices/SelectedTagsSlice.ts";

export const MemesList = () => {
    const dispatch = useAppDispatch();
    const selectedTags = useAppSelector(selectTags);

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchMemes(selectedTags));
    }, [dispatch, selectedTags])

    const memes = useAppSelector((state) => state.memes.value);
    const isLoading = useAppSelector((state) => state.memes.isLoading);
    const error = useAppSelector((state) => state.memes.errorMessage);

    if (isLoading) {
        return 'loading memes...'
    }

    if (error) {
        return 'Error oshibka memesov'
    }

    return (
        <div className={classes.memesList}>
            {memes?.length
                ?
                memes.map((meme) => (
                <div className={classes.memeItem}
                    key={meme.id}>
                    <img className={classes.memeImg} src={meme.image} alt=""/>
                    <div  className={classes.tags}>
                    {meme.tags?.length
                        ?
                        meme.tags.map(tag => (
                        <div className={classes.tag}
                            key={tag.id}>
                            {tag.title}
                        </div>
                    )) : 'tags not found'}
                    </div>
                </div>
            )): 'memes not found'}
        </div>
    );
};