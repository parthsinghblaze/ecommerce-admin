import {useEffect, useRef, useState} from 'react'
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
    Autocomplete, Checkbox,
    FormControl, FormControlLabel,
    FormHelperText,
    FormLabel, Icon,
    InputLabel,
    MenuItem, Radio, RadioGroup,
    Select,
    TextField
} from "@mui/material";
import { Editor } from '@tinymce/tinymce-react';
import useSWR from "swr";
import { swrAxiosConfig} from "../product-api/api";


const productSchema = yup.object().shape({
});

function AddProductContent(props) {
    const editorRef = useRef(null);
    const [categoriesList, setCategoriesList] = useState([]);
    const [filterCategoryList, setFilterCategoryList] = useState([]);
    const [categoryFor, setCategoryFor] = useState("");

    const { handleSubmit, formState, control, register, watch, setValue, getValues, reset } = useForm({
        mode: 'onChange',
        defaultValues: {
        },
        resolver: yupResolver(productSchema),
    });

    const { errors } = formState;

    const [images, setImages] = useState([])

    const {
        data,
        error,
        isLoading,
    } = useSWR(`admin/category/categories`, swrAxiosConfig);

    useEffect(() => {
        if(data) {
            setCategoriesList(data.data.categories)
        }
    }, [data])

    console.log('categoryFor', categoryFor)

    useEffect(() => {
        const filterCategory = categoriesList.filter((item) => item.type === categoryFor)
        setFilterCategoryList(filterCategory);
    }, [categoryFor])

    function onSubmit(data) {
        const formData = new FormData();
    }

    console.log('getValues', getValues());

    return (
        <div className="w-full flex flex-col min-h-full">
            <div className="w-full overflow-x-auto overflow-y-auto p-20">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="productName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Product Name"
                                id="productName"
                                variant="outlined"
                                fullWidth
                                error={errors?.productName}
                                helperText={errors.productName?.message}
                            />
                        )}
                    />
                    <Controller
                        name="category_for"
                        control={control}
                        render={({ field }) => (
                            <>
                                <FormLabel id="demo-radio-buttons-group-label">Select the Gender Type</FormLabel>
                                <RadioGroup
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                    onChange={(e) => setCategoryFor(e.target.value)}
                                    className="flex gap-10 flex-row"
                                >
                                    <FormControlLabel {...field} value="womens" control={<Radio />} label="Womens" />
                                    <FormControlLabel {...field} value="mens" control={<Radio />} label="Mens" />
                                    <FormControlLabel {...field} value="kids" control={<Radio />} label="Kids" />
                                </RadioGroup>
                            </>
                        )}
                    />
                    {
                        categoryFor &&  <Controller
                            name="category"
                            control={control}
                            render={({ field }) => (
                                <FormControl variant="outlined" fullWidth error={!!errors?.category}>
                                    <InputLabel htmlFor="category">Category</InputLabel>
                                    <Select
                                        {...field}
                                        className="mt-8 mb-16"
                                        id="category"
                                        label="Category"
                                        fullWidth
                                    >
                                        {
                                            filterCategoryList.length === 0 ? <p>No Data Available</p> : filterCategoryList.map((item) => {
                                                const {name, _id } = item;
                                                return <MenuItem value={_id}>{name}</MenuItem>
                                            })
                                        }

                                    </Select>
                                    {errors?.category && <FormHelperText>{errors.category.message}</FormHelperText>}
                                </FormControl>
                            )}
                        />
                    }

                    <Controller
                        name="price"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="price"
                                id="price"
                                variant="outlined"
                                fullWidth
                                error={errors?.price}
                                helperText={errors.price?.message}
                            />
                        )}
                    />
                    <Controller
                        name="qty"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Quantity"
                                id="qty"
                                variant="outlined"
                                fullWidth
                                error={errors?.qty}
                                helperText={errors.qty?.message}
                            />
                        )}
                    />
                    <Controller
                        name="selling_price"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Selling Price"
                                id="selling_price"
                                variant="outlined"
                                fullWidth
                                error={errors?.selling_price}
                                helperText={errors.selling_price?.message}
                            />
                        )}
                    />
                    <Controller
                        name="feature"
                        control={control}
                        render={({ field }) => (
                            <>
                                <FormControlLabel
                                    className="mt-8 mb-16"
                                    control={<Checkbox {...field} color="primary" />}
                                    label="Want To add as a feature product"
                                />
                            </>
                        )}
                    />
                    <Controller
                        name="searchKeywords"
                        control={control}
                        // defaultValue={[]}
                        render={({ field: { onChange, value } }) => (
                            <Autocomplete
                                className="mt-8 mb-16"
                                multiple
                                freeSolo
                                options={[]}
                                value={value}
                                onChange={(event, newValue) => {
                                    onChange(newValue);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="Select multiple tags"
                                        label="Search Keywords"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        error={errors?.searchKeywords}
                                        helperText={errors.searchKeywords?.message}
                                    />
                                )}
                            />
                        )}
                    />

                    <Controller
                        name="images"
                        control={control}
                        render={({ field }) => (
                            <div>
                                <input
                                    className="mt-8 mb-16"
                                    id="images"
                                    type="file"
                                    multiple
                                    onChange={(event) => {
                                        const fileList = event.target.files;
                                        const imagesArray = Array.from(fileList);
                                        setImages(imagesArray); // Store selected images in component state
                                        field.onChange(imagesArray.map((file) => file)); // Update field value with image names
                                    }}
                                />
                                {images.length > 0 && (
                                    <div>
                                        {images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={URL.createObjectURL(image)}
                                                alt={`Image ${index + 1}`}
                                                style={{ width: '100px', height: '100px' }}
                                            />
                                        ))}
                                    </div>
                                )}
                                {errors?.selling_price && (
                                    <p className="error">{errors.selling_price.message}</p>
                                )}
                            </div>
                        )}
                    />

                    <FormLabel>Description</FormLabel>
                    <Editor
                        apiKey="2lofu2j791j4delby476j9umj73tmpk59ix6rnjqeo9iitn6"
                        onInit={(evt, editor) => editorRef.current = editor}
                        init={{
                            height: 500,
                            plugins: 'advlist lists image table code @tinymce/tinymce-vue',
                            toolbar:
                                'code | media | undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                </form>
            </div>
        </div>
    );
}

export default AddProductContent;
