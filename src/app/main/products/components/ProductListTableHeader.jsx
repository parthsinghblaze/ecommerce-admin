import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {TableCell} from "@mui/material";

function ProductListTableHeader() {
    return (
        <TableHead>
            <TableRow>
                <TableCell className="p-4 md:p-16 w-[100px] bg-transparent" padding="none">
                    Sr no
                </TableCell>
                <TableCell className="p-4 md:p-16 w-[700px] bg-transparent" padding="none">
                    Name
                </TableCell>
                <TableCell className="p-4 md:p-16  w-[200px] bg-transparent" padding="none">
                    Category Type
                </TableCell>
                <TableCell className="p-4 md:p-16 w-[100px] bg-transparent" padding="none">
                    Qty
                </TableCell>
                <TableCell className="p-4 md:p-16 w-[100px] bg-transparent" padding="none">
                    Price
                </TableCell>
            </TableRow>
        </TableHead>
    )
}

export default ProductListTableHeader