import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import CategoryHeader from "./components/CategoryHeader";
import React from "react";
import CategoryTable from "./components/CategoryTable";
import withReducer from "app/store/withReducer";
import reducer from './store';

function Category() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<CategoryHeader />}
      content={<CategoryTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('Category', reducer)(Category);
