message NewTender{
    buyer: Address; // заказчик
    to: Address; // Тендер выигравшое лицо или компания
    amount: String; // amount of KZT to be sent
    state: Bool; // finished or not
    name: String; // name of the tender
    description: String; // description of tender
    image: String; // IPFS URL to image
    deadline: String; // deadline of the project (DD/MM/YYYY)
}

message InternalSetDeadline {
    deadline: String;
}

message CompleteTodoTenderMSG{
    seqno: Int as uint256;
}

message InternalComplete{
    state: Bool;
}

message NewTenderResponse{
    seqno: Int as uint256;
}