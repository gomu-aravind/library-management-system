function OrderList(props){
    return <div className="card mb-3" style={{maxWidth:"50rem"}}>
    <div className="card-body">
      <h4 className="card-title">Order Id :{props.id}</h4>
      <div className="card-text mb-3">
        <ul className="list-group">
          {props.orders.map(order=><li className="list-group-item d-flex justify-content-between align-items-center" key={order._id.toString()}>
            <span>{order.book.name}</span>
            <div>

            <span className="me-5">₹{order.book.price}/book</span>
            <span>Quantity: <span className="badge bg-dark rounded-pill">{order.quantity}</span></span>
            </div>
          </li>)}
        </ul>
      </div>
      <h6>Total Amount :₹{props.totalAmount}</h6>
    </div>
  </div>
}

export default OrderList