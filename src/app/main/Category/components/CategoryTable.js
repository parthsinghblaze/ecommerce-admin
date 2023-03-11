import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import CategoryTableHead from "./CategoryTableHead";
import {getCategorys} from "../store/categorySlice";

const products = [
    {
        id: 1,
        name: 'T-shirts'
    }
]

function CategoryTable(props) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState([]);
    const [data, setData] = useState(products);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState({
        direction: 'asc',
        id: null,
    });

    useSelector((state) => console.log(state));

    useEffect(() => {
        dispatch(getCategorys())
    }, [])


    if (loading) {
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
                </Table>
            </FuseScrollbars>
        </div>
    )


}

export default withRouter(CategoryTable);