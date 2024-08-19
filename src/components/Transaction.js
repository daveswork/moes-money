

function Transaction(transactionItem){
    return(
        <div>
            <span>{transactionItem.date}</span>
            <span>{transactionItem.description}</span>
            <span>{transactionItem.amount}</span>

        </div>
    )
}

export default Transaction