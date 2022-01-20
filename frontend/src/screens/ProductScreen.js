import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  Card,
  ListGroup,
  Button,
  ListGroupItem,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import { createProductReview, getProductDetail } from '../actions/product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { CREATE_PRODUCT_REVIEW_RESET } from '../actions/types';

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const { product, loading, error, success, errorReview } = useSelector(state => state.products);

  const userLogin = useSelector(state => state.user);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (success) {
      alert('Review submitted!');
      setRating(0);
      setComment('');
      dispatch({ type: CREATE_PRODUCT_REVIEW_RESET });
    }
    dispatch(getProductDetail(match.params.id));
  }, [dispatch, history, match.params.id, success]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(match.params.id, {
      rating, comment
    }))
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <h2>{product.name}</h2>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroupItem>
                <ListGroupItem>Price: ${product.price}</ListGroupItem>
                <ListGroupItem>Description: {product.description}</ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroupItem>
                    <Row>
                      <Col>Price</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Status</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroupItem>
                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={e => setQty(e.target.value)}
                            style={{ padding: 0, appearance: 'auto' }}
                          >
                            {[...Array(product.countInStock).keys()].map(x => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}
                  <ListGroupItem>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {errorReview && <Message variant='danger'>{errorReview}</Message>}
              {
                product.reviews.length === 0 ? <Message>No reviews</Message> :
                  <ListGroup variant='flush'>
                    {
                      product.reviews.map(review => (
                        <ListGroupItem key={review._id}>
                          <strong>{review.name}</strong>
                          <Rating value={review.rating}></Rating>
                          <p>{review.createdAt.substring(0, 10)}</p>
                          <p>{review.comment}</p>
                        </ListGroupItem>
                      ))
                    }
                    <ListGroupItem>
                      <h2>Write a customer review</h2>
                      {userInfo ? (<Form onSubmit={submitHandler}>
                        <FormGroup controlId='rating'>
                          <FormLabel>
                            Rating
                          </FormLabel>
                          <FormControl as='select' value={rating} onChange={e => setRating(e.target.value)}>
                            <option value=''>Select...</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                          </FormControl>
                        </FormGroup>
                        <FormGroup controlId='comment'>
                          <FormLabel>
                            Comment
                          </FormLabel>
                          <FormControl row='3' as='textarea' value={comment} onChange={e => setComment(e.target.value)}>
                          </FormControl>
                        </FormGroup>
                        <Button type='submit' variant='primary'>
                          Submit
                        </Button>
                      </Form>) : <Message>Please <Link to='/login'> sign in</Link>to write a review.</Message>}
                    </ListGroupItem>
                  </ListGroup>
              }
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
