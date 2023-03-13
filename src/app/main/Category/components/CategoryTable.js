import Table from '@mui/material/Table';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import { Checkbox, TableCell, TablePagination, TableRow, Button } from '@mui/material';
import CategoryTableHead from './CategoryTableHead';
import { getCategorys } from '../store/categorySlice';


const products = [
  {
    id: 1,
    name: 'T-shirts',
  },
];

function CategoryTable(props) {
  const dispatch = useDispatch();

  const { categoryList, isLoading, totalCount, searchText } = useSelector(
    ({ Category }) => Category.category
  );

  const [data, setData] = useState(categoryList);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const debouncedSearch = debounce(async (query) => {
    dispatch(getCategorys({ page: page + 1, limit: rowsPerPage, keyword: searchText }));
  }, 500);

  useEffect(() => {
    if(searchText) {
      debouncedSearch();
    } else {
      dispatch(getCategorys({ page: page + 1, limit: rowsPerPage, keyword: '' }));
    }
  }, [page, rowsPerPage, searchText]);

  useEffect(() => {
    setData(categoryList);
  }, [categoryList]);

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  if (isLoading) {
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
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <CategoryTableHead />
          {data.map((item) => {
            const { name } = item;

            return (
              <TableRow>
                <TableCell className="p-4 md:p-16" padding="none">
                  <Checkbox onClick={(event) => event.stopPropagation()} />
                </TableCell>
                <TableCell className="p-4 md:p-16" padding="none">
                  {name}
                </TableCell>
                <TableCell className="p-4 md:p-16" padding="none">
                  <Button variant='contained' color='primary'>Delete</Button>
                  <Button>Edit</Button>
                </TableCell>
              </TableRow>
            );
          })}
        </Table>
      </FuseScrollbars>
      <TablePagination
        className="shrink-0 border-t-1"
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
    </div>
  );
}

export default withRouter(CategoryTable);
