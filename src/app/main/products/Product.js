import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '../../../@fuse/hooks/useThemeMediaQuery';
import ProductHeader from './components/ProductHeader';
import ProductContent from './components/ProductContent';
import reducer from './store';

function Product() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<ProductHeader />}
      content={<ProductContent />}
      // scroll={isMobile ? 'page' : 'content'}
    />
  );
}

export default withReducer('Product', reducer)(Product);
