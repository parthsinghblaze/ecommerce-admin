import Table from "@mui/material/Table";
import ProductListTableHeader from "./ProductListTableHeader";
import {TableBody} from "@mui/material";
import ProductListTableRow from "./ProductListTableRow";

function TableView({ products }) {
    return (
        <Table aria-labelledby="tableTitle" style={{ minWidth: '600px' }}>
            <ProductListTableHeader />
            <TableBody>
                {
                    products.map((item, index) => {
                        return <ProductListTableRow item={item} index={index} key={index} />
                    })
                }
            </TableBody>
        </Table>
    )
}

export default TableView