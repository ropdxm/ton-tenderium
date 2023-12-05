import "@stdlib/deploy";
import "./messages";

struct TenderDetails{
    buyer: Address; // заказчик
    to: Address; // Тендер выигравшое лицо или компания
    amount: String; // amount of KZT to be sent
    state: Bool; // finished or not
    name: String; // name of the tender
    description: String; // description of tender
    image: String; // IPFS URL to image
    deadline: String; // deadline of the project (DD/MM/YYYY)
}

contract TenderChild with Deployable {
    parent: Address;
    seqno: Int as uint256; // ID

    buyer: Address; // заказчик
    to: Address; // Тендер выигравшое лицо или компания
    amount: String = ""; // amount of KZT to be sent
    state: Bool = false; // finished or not
    name: String = ""; // name of the tender
    description: String = ""; // description of tender
    image: String = ""; // IPFS URL to image
    deadline: String = ""; // deadline of the project (DD/MM/YYYY)

    init(parent: Address, seqno: Int) {
        self.parent = parent;
        self.seqno = seqno;
        self.buyer = myAddress();
        self.to = myAddress();
    }

    receive(msg: InternalSetDeadline) {
        require(sender()==self.parent, "Parent Only");
        self.deadline = msg.deadline;
    }

    receive(msg: InternalComplete){
        require(sender()==self.parent, "Parent Only");
        self.state = true;
    }

    receive(msg: NewTender) {
        self.buyer = msg.buyer;
        self.to = msg.to;
        self.amount = msg.amount;
        self.state = msg.state;
        self.name = msg.name;
        self.description = msg.description;
        self.image = msg.image;
        self.deadline = msg.deadline;
    }

    get fun details(): TenderDetails {
        return TenderDetails{
            buyer: self.buyer,
            to: self.to,
            amount: self.amount,
            state: self.state,
            name: self.name,
            description: self.description,
            image: self.image,
            deadline: self.deadline
        };
    }
}