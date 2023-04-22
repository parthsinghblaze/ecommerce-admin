import FusePageCarded from '@fuse/core/FusePageCarded';
import { styled } from '@mui/material/styles';
import withReducer from 'app/store/withReducer';
import CategoryHeader from './components/CategoryHeader';
import CategoryTable from './components/CategoryTable';
import reducer from './store';

function Category() {

  const Root = styled(FusePageCarded)(({ theme }) => ({
    '& .FusePageCarded-header': {
      minHeight: 72,
      height: 72,
      alignItems: 'center',
      [theme.breakpoints.up('sm')]: {
        minHeight: 136,
        height: 136,
      },
    },
    '& .FusePageCarded-content': {
      display: 'flex',
    },
    '& .FusePageCarded-contentCard': {
      overflow: 'hidden',
    },
  }));


  return (
    <Root
      header={<CategoryHeader />}
      content={<CategoryTable />}
      // scroll='content'
      innerScroll
    />
  );
}

export default withReducer('Category', reducer)(Category);
