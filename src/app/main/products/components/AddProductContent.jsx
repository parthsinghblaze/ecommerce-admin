import {useEffect, useRef, useState} from 'react'
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
    Autocomplete, Backdrop, Button, Checkbox, CircularProgress, Dialog,
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
import {useDispatch, useSelector} from "react-redux";
import {addProduct} from "../store/productSlice";
import {useNavigate} from "react-router-dom";
import styled from 'styled-components'

const productSchema = yup.object().shape({
    images: yup
        .array()
        .min(2, 'At least 2 images are required')
        .required('Images are required'),
    searchKeywords: yup
        .array()
        .min(3, 'At least 3 search keywords are required')
        .required('Search keywords are required'),
    selling_price: yup
        .number()
        .max(yup.ref('price'), 'Selling price should not be greater than price')
        .required('Selling price is required'),
    qty: yup.number().required('Quantity is required'),
    price: yup.number().required('Price is required'),
    category: yup.string().required('Category is required'),
    productName: yup.string().required('Product name is required'),
});

function AddProductContent(props) {
    const editorRef = useRef(null);
    const [categoriesList, setCategoriesList] = useState([]);
    const [filterCategoryList, setFilterCategoryList] = useState([]);
    const [categoryFor, setCategoryFor] = useState("");
    const {addingProductLoading} = useSelector((state) => state.Product.product);

    const { handleSubmit, formState, control, register, watch, setValue, getValues, reset } = useForm({
        mode: 'onChange',
        defaultValues: {
            images: "",
            searchKeywords: [],
            feature: false,
            selling_price: 0,
            qty: 0,
            price: 0,
            category: '',
            productName: '',
            description: ''
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

    useEffect(() => {
        const filterCategory = categoriesList.filter((item) => item.type === categoryFor)
        setFilterCategoryList(filterCategory);
    }, [categoryFor])

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function onSubmit(values) {
        const formData = new FormData();
        formData.append('name', values.productName);
        formData.append('category', values.category);
        // formData.append('images', values.images);
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }
        formData.append('price', values.price);
        formData.append('qty', values.qty);
        formData.append('feature', values.feature)
        formData.append('selling_price', values.selling_price)
        formData.append('description', editorRef.current.getContent());
        dispatch(addProduct({formData, navigate}))
    }

    return (
        <div className="w-full flex flex-col min-h-full">
            <div className="w-full overflow-x-auto overflow-y-auto p-20">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid lg:grid-cols-[60%_40%] gap-20">
                        <div>
                            <div>
                                <Controller
                                    name="productName"
                                    control={control}
                                    render={({field}) => (
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
                            </div>
                            <div className="grid grid-cols-3 gap-10">
                                <div>
                                    <Controller
                                        name="price"
                                        control={control}
                                        render={({field}) => (
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
                                </div>
                                <div>
                                    <Controller
                                        name="qty"
                                        control={control}
                                        render={({field}) => (
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
                                </div>
                                <div>
                                    <Controller
                                        name="selling_price"
                                        control={control}
                                        render={({field}) => (
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
                                </div>
                            </div>
                            <div>
                                <Controller
                                    name="searchKeywords"
                                    control={control}
                                    // defaultValue={[]}
                                    render={({field: {onChange, value}}) => (
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
                            </div>
                            <div>
                                <FormLabel className='font-extrabold'>Description</FormLabel>
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
                            </div>
                            <div
                                className="mt-12 mb-16"
                            >
                                <Controller
                                    name="category_for"
                                    control={control}
                                    render={({field}) => (
                                        <>
                                            <FormLabel id="demo-radio-buttons-group-label" className='font-extrabold'>Select the Gender
                                                Type</FormLabel>
                                            <RadioGroup
                                                defaultValue="female"
                                                name="radio-buttons-group"
                                                onChange={(e) => setCategoryFor(e.target.value)}
                                                className="flex gap-10 flex-row"
                                            >
                                                <FormControlLabel {...field} value="womens" control={<Radio/>}
                                                                  label="Womens"/>
                                                <FormControlLabel {...field} value="mens" control={<Radio/>}
                                                                  label="Mens"/>
                                                <FormControlLabel {...field} value="kids" control={<Radio/>}
                                                                  label="Kids"/>
                                            </RadioGroup>
                                        </>
                                    )}
                                />
                            </div>
                            <div>
                                {
                                    categoryFor && <Controller
                                        name="category"
                                        control={control}
                                        render={({field}) => (
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
                                                        filterCategoryList.length === 0 ? <p>No Data
                                                            Available</p> : filterCategoryList.map((item) => {
                                                            const {name, _id} = item;
                                                            return <MenuItem value={_id}>{name}</MenuItem>
                                                        })
                                                    }

                                                </Select>
                                                {errors?.category &&
                                                <FormHelperText>{errors.category.message}</FormHelperText>}
                                            </FormControl>
                                        )}
                                    />
                                }
                            </div>
                            <div className="mb-24">
                                <Controller
                                    name="images"
                                    control={control}
                                    render={({field}) => (
                                        <label
                                            htmlFor="images"
                                            className="flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                                        >
                                            <input
                                                className="mt-8 mb-16 hidden"
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
                                            <Icon fontSize="large" color="action">
                                                cloud_upload
                                            </Icon>
                                        </label>
                                    )}
                                />
                                {images.length > 0 && (
                                    <div className="flex flex-wrap gap-10">
                                        {images.map((image, index) => (
                                            <div className='p-4 border-1'>
                                                <img
                                                    key={index}
                                                    src={URL.createObjectURL(image)}
                                                    alt={`Image ${index + 1}`}
                                                    style={{width: '100px', height: '100px'}}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="font-extrabold">
                                <Controller
                                    name="feature"
                                    control={control}
                                    render={({field}) => (
                                        <>
                                            <FormControlLabel
                                                className="mt-8 mb-16 "
                                                control={<Checkbox {...field} color="primary"/>}
                                                label="Want To add as a feature product"
                                            />
                                        </>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <Button type="submit" variant={"contained"} color="primary" className="mt-24">{
                        addingProductLoading ? 'Adding...' : 'Add'
                    }</Button>
                </form>
            </div>
        </div>
    );
}

export default AddProductContent;
