import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '../../../@fuse/hooks/useThemeMediaQuery';
import ProductHeader from './components/ProductHeader';
import ProductContent from './components/ProductContent';
import reducer from './store';
import {useState} from "react";

function Product() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const [cardView, setCartView] = useState(false);

  return (
      <>
          <ProductHeader setCartView={setCartView} />
          <ProductContent cardView={cardView} />
        </>
    // <FusePageCarded
    //   header={<ProductHeader setCartView={setCartView} />}
    //   content={<ProductContent cardView={cardView} />}
    //   // scroll={isMobile ? 'page' : 'content'}
    // />
  );
}

export default withReducer('Product', reducer)(Product);
