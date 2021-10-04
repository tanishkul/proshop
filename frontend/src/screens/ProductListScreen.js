import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { createProduct, deleteProduct, getProducts } from '../actions/product';
import { CREATE_PRODUCT_RESET } from '../actions/types';

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);
  const { userInfo } = user;

  const productList = useSelector(state => state.products);
  const { loading, error, products, success, successCreate, product } =
    productList;

  useEffect(() => {
    dispatch({ type: CREATE_PRODUCT_RESET });
    if (userInfo && !userInfo.isAdmin) {
      history.push('/login');
    }
    if (successCreate) {
      history.push(`/admin/product/${product._id}/edit`);
    } else {
      dispatch(getProducts());
    }
  }, [dispatch, history, userInfo, success, successCreate, product]);

  const deleteHandler = id => {
    if (window.confirm('Are you sure you want to remove the product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = product => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i>Create Product
          </Button>
        </Col>
      </Row>
      {error ? (
        <Message variant='danger'>{error}</Message>
      ) : loading || !products ? (
        <Loader />
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button className='btn-sm' variant='light'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    className='btn-sm'
                    variant='danger'
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
