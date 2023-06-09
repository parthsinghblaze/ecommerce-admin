import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import {Link} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import {Icon} from "@mui/material";

function AddProductHeader(props) {
    return (
        <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
            <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
            >
                <Typography
                    className="flex text-24 items-center sm:mb-12"
                    component={Link}
                    role="button"
                    to="/products"
                    color="inherit"
                >
                    <Icon className="text-20">
                        arrow_back
                    </Icon>
                    <span className="mx-4 font-extrabold">Add Product</span>
                </Typography>
            </motion.div>
        </div>
    );
}

export default AddProductHeader;
