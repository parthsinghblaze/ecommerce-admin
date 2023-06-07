import React from 'react';
import FusePageCarded from "@fuse/core/FusePageCarded/FusePageCarded";
import AddProductHeader from "./components/AddProductHeader";
import AddProductContent from "./components/AddProductContent";

const AddProduct = (props) => {
    return (
        <FusePageCarded
            header={<AddProductHeader />}
            content={<AddProductContent />}
        />
    );
};

export default AddProduct;