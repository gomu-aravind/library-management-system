function PendingList(props) {
    return (
      <tr>
        <td >{props.index}</td>
        <td >{props.name}</td>
        <td >
          {props.quantity}
        </td>
        <td >{props.totalAmount}</td>
      </tr>
    );
  }
  export default PendingList