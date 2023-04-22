import Table from '@mui/material/Table';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import { TableCell, TablePagination, TableRow, Button } from '@mui/material';
import useSWR from 'swr';
import CategoryTableHead from './CategoryTableHead';
import {deleteCategory, openEditDialog, setCategoryList} from '../store/categorySlice';
import AddCategoryDialog from './AddCategoryDialog';
import { getCategory } from '../fetch-api/api';
import CategoryConfirmDialog from './CategoryConfirmDialog';
import EditCategoryDialog from "./EditCategoryDialog";

function CategoryTable(props) {
  const dispatch = useDispatch();

  const { categoryList, totalCount, searchText } = useSelector(({ Category }) => Category.category);

  const [data, setData] = useState(categoryList);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [categoryID, setCategoryID] = useState(null);

  function handleConfirmDialog() {
    setOpen(!open);
  }

  function showModel(id) {
    setCategoryID(id);
    handleConfirmDialog();
  }

  useEffect(() => {
    setData(categoryList);
  }, [categoryList]);

  function deleteCategoryItem() {
    dispatch(deleteCategory({ categoryID, handleConfirmDialog, page, rowsPerPage, searchText }));
  }

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  const {
    data: myData,
    error,
    isLoading: myLoading,
  } = useSWR(
    `admin/category/categories?page=${page}&limit=${rowsPerPage}&keyword=${searchText}`,
    getCategory
  );

  useEffect(() => {
    if (myData) {
      dispatch(setCategoryList(myData));
    }
  }, [myData]);

  if (myLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There are no products!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader aria-labelledby="tableTitle">
          <CategoryTableHead />
          {data.map((item) => {
            const { _id, name, image, type } = item;
            return (
              <TableRow key={_id}>
                <TableCell className="p-4 md:p-16" padding="none">
                  <img
                    alt="hello"
                    src={image}
                    className="w-[50px] h-[50px]"
                  />
                </TableCell>
                <TableCell className="p-4 md:p-16" padding="none">
                  {name}
                </TableCell>
                <TableCell className="p-4 md:p-16" padding="none">
                  {type}
                </TableCell>
                <TableCell className="p-4 md:p-16" padding="none">
                  <Button className='static' variant="contained" color="primary" onClick={() => showModel(_id)}>
                    Delete
                  </Button>
                  <Button className='static' onClick={() => dispatch(openEditDialog(item))}>Edit</Button>
                </TableCell>
              </TableRow>
            );
          })}
        </Table>
      </FuseScrollbars>

      <TablePagination
        className="flex-shrink-0  border-t-1"
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <AddCategoryDialog />
      <EditCategoryDialog />
      <CategoryConfirmDialog
        open={open}
        handleConfirmDialog={handleConfirmDialog}
        deleteCategoryItem={deleteCategoryItem}
      />
    </div>
  );
}

export default withRouter(CategoryTable);
