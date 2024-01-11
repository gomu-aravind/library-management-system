function SubscriptionList(props) {
  let formatedDate = "-";
  if (props.expireyDate !== null) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const date = new Date(props.expireyDate);
    formatedDate = new Intl.DateTimeFormat("en-US",options).format(date);
  }
  return (
    <tr>
      <td className="table-light">{props.index}</td>
      <td className="table-light">{props.name}</td>
      <td className="table-light">
        {props.plan !== null
          ? props.plan
          : "Not Subscribed"}
      </td>
      <td className="table-light">{formatedDate}</td>
    </tr>
  );
}

export default SubscriptionList;
