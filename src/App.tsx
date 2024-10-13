import './App.css'
import {MemesList} from "./Components/MemesList/MemesList.tsx";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchTags} from "./Slices/TagsSlice.ts";
import {useAppSelector} from "./hooks.ts";
import {ITag} from "./models/ITag.ts";
import AsyncSelect from "react-select/async";
import axiosInstance from "./axios.ts";
import {ISelectOption} from "./models/ISelectOption.ts";
import {OnChangeValue} from "react-select";
import {setSelectedTags} from "./Slices/SelectedTagsSlice.ts";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchTags());
    }, [dispatch]);

    // const tags = useAppSelector((state) => state.tags.value);
    const isLoading = useAppSelector((state) => state.tags.isLoading);
    const error = useAppSelector((state) => state.memes.errorMessage);

    if (isLoading) {
        return 'loading tags...'
    }

    if (error) {
        return 'Error oshibka tags'
    }
    const promiseOptions = async (inputValue: string): Promise<ISelectOption[]> => {
        const res = await axiosInstance.get('http://192.168.1.42:5678/api/Tags/SearchByTitle?TagTitle=' + inputValue);
        return res.data.map((tag: ITag) => {
            return {value: tag.id, label: tag.title};
        });
    }
    const onTagsSelected = (changeTags: OnChangeValue<ISelectOption, true>) => {
        dispatch(setSelectedTags(changeTags));
    }

    return (
        <>
            <AsyncSelect
                isMulti
                cacheOptions
                defaultOptions
                loadOptions={promiseOptions}
                onChange={onTagsSelected}/>
            <MemesList/>
        </>
    )
}

export default App
