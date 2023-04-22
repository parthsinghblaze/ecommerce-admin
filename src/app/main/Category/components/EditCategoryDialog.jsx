import { AppBar, Button, Dialog, DialogContent, Icon, TextField, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import FuseUtils from '@fuse/utils';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Autocomplete } from '@mui/lab';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { closeEditDialog, removeError, updateCategory } from '../store/categorySlice';

const categorySchema = yup.object().shape({
  name: yup.string().required('Category Name is required'),
  image: yup.mixed().required('File is required'),
  type: yup.string().required('Type is required'),
});

const categoryType = ['mens', 'womens', 'kids'];

function EditCategoryDialog({ page, rowsPerPage }) {
  const dispatch = useDispatch();

  console.log('page', {page, rowsPerPage});

  const [loading, setLoading] = useState(false);
  const { editDialogOpen, error, editDialogValue } = useSelector(
    ({ Category }) => Category.category
  );
  const [previewImage, setPreviewImage] = useState('');

  // Form initial syntax

  const { handleSubmit, formState, control, watch, setValue, getValues, reset } = useForm({
    mode: 'onChange',
    defaultValues: editDialogValue,
    resolver: yupResolver(categorySchema),
  });

  const { errors } = formState;

  // handle submit

  function onSubmit() {
    setLoading(true);
    const formData = new FormData();

    const categoryID = getValues()._id;

    formData.append('name', getValues().name);
    formData.append('image', getValues().image);
    formData.append('type', getValues().type);

    dispatch(
      updateCategory({
        categoryID,
        formData,
        reset,
        setPreviewImage,
        setLoading,
        page,
        rowsPerPage,
      })
    );
  }

  useEffect(() => {
    setPreviewImage(getValues().image);
  }, []);

  useEffect(() => {
    return () => {
      dispatch(removeError());
    };
  }, []);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={editDialogOpen}
      onClose={() => dispatch(closeEditDialog())}
    >
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Update Category
          </Typography>
        </Toolbar>
      </AppBar>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent classes={{ root: 'p-16 sm:p-32' }}>
          <Typography align="center" variant="subtitle1" color="red">
            {error}
          </Typography>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-16"
                label="Name"
                id="name"
                variant="outlined"
                fullWidth
                error={errors?.name}
                helperText={errors.name?.message}
              />
            )}
          />

          <Controller
            name="type"
            control={control}
            render={({ field }) => {
              return (
                <Autocomplete
                  {...field}
                  id="category-type"
                  disablePortal
                  options={categoryType}
                  onChange={(event, value) => {
                    console.log('value', value);
                    if (value) {
                      field.onChange(value);
                      setValue('type', value);
                    } else {
                      setValue('type', '');
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Type"
                      error={errors?.type}
                      helperText={errors.type?.message}
                    />
                  )}
                />
              );
            }}
          />

          <div className="flex gap-20 mt-8 mb-16 items-center">
            <Controller
              name="image"
              control={control}
              render={({ field: { onChange, value } }) => (
                <label
                  htmlFor="button-file"
                  className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                >
                  <input
                    accept="image/*"
                    className="hidden"
                    id="button-file"
                    type="file"
                    onChange={async (e) => {
                      function readFileAsync() {
                        return new Promise((resolve, reject) => {
                          const file = e.target.files[0];

                          setValue('image', file);

                          if (!file) {
                            return;
                          }
                          const reader = new FileReader();

                          reader.onload = () => {
                            resolve({
                              id: FuseUtils.generateGUID(),
                              url: `data:${file.type};base64,${btoa(reader.result)}`,
                              type: 'image',
                            });
                          };

                          reader.onerror = reject;

                          reader.readAsBinaryString(file);
                        });
                      }

                      const newImage = await readFileAsync();

                      setPreviewImage(newImage.url);
                    }}
                  />
                  <Icon fontSize="large" color="action">
                    cloud_upload
                  </Icon>
                </label>
              )}
            />
            <p className="text-red-500">{errors?.image && errors.image?.message}</p>

            {previewImage && (
              <div
                role="button"
                tabIndex={0}
                className={clsx(
                  'productImageItem flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg'
                )}
              >
                <img className="max-w-none w-auto h-full" src={previewImage} alt="product" />
              </div>
            )}
          </div>

          <Button
            className=""
            variant="contained"
            color="primary"
            type="submit"
            // disabled={_.isEmpty(dirtyFields) || !isValid}
          >
            {loading ? 'Updating...' : 'Update Category'}
          </Button>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default EditCategoryDialog;
