import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteUser, listUsers} from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Button, Table, Row, Col} from "react-bootstrap";
import {AiOutlineCheck, AiOutlineEdit} from "react-icons/ai"
import {BsFillTrashFill} from "react-icons/bs"
import {Link, useNavigate} from "react-router-dom";
import {listProducts, deleteProduct} from "../actions/productActions";


const ProductListScreen = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const productList = useSelector(state => state.productList)
  const {loading, error, products} = productList

  const productDelete = useSelector(state => state.productDelete)
  const {loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete this product?")) {
      dispatch(deleteProduct(id))
      window.location.reload()
    }
  }

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts())
    } else {
      navigate("/login")
    }
  }, [dispatch, navigate, userInfo, successDelete])

  const createProductHandler = (product) => {
    //create product

  }


  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i>
            Create Product
          </Button>
        </Col>
      </Row>

      {loadingDelete && <Loader/>}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> :
        <Table striped bordered hover responsive className="table-sm">
          <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>Price</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
          </tr>

          </thead>

          <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>

              <td>
                <Link to={`/admin/product/${product._id}/edit`}>
                  <Button variant="light" className="btn-sm">
                    <AiOutlineEdit size="20"/>
                  </Button>
                </Link>
                <Button variant="danger" className="btn-sm" onClick={() => {
                  deleteHandler(product._id)
                }}>
                  <BsFillTrashFill size="16"/>
                </Button>
              </td>
            </tr>))}
          </tbody>
        </Table>}
    </div>
  );
};

export default ProductListScreen;