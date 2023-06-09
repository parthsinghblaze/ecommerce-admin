import {TableCell} from "@mui/material";
import TableRow from "@mui/material/TableRow";

function ProductListTableRow({ item, index }) {
    const { category_name, name, price, qty } = item;
    return (
        <TableRow>
            <TableCell className="p-4 md:p-16" padding="none">
                {index + 1}
            </TableCell>
            <TableCell className="p-4 md:p-16" padding="none">
                {name}
            </TableCell>
            <TableCell className="p-4 md:p-16" padding="none">
                {category_name}
            </TableCell>
            <TableCell className="p-4 md:p-16" padding="none">
                {qty}
            </TableCell>
            <TableCell className="p-4 md:p-16" padding="none">
                {price}
            </TableCell>
        </TableRow>
    )
}

export default ProductListTableRow