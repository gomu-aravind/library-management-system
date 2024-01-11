function FineList(props){
    const fineDate=new Intl.DateTimeFormat('en-US',{
    year: "numeric",
    month: "long",
    day: "numeric",
    }).format(new Date(props.fineDate))
    return <tr>
        <td>{props.index}</td>
        <td>{props.title}</td>
        <td>{props.fineAmount}</td>
        <td>{fineDate}</td>
    </tr>
}

export default FineList