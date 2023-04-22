import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import withReducer from 'app/store/withReducer';
import CategoryHeader from './components/CategoryHeader';
import CategoryTable from './components/CategoryTable';
import reducer from './store';

function Category() {

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<CategoryHeader />}
      content={<CategoryTable />}
      // scroll='content'
      scroll={isMobile ? 'page' : 'content'}
    />
  );
}

export default withReducer('Category', reducer)(Category);
