import "@stdlib/deploy";
import "@stdlib/ownable";
import "./messages";
import "./tender_child";

struct Tender {
    buyer: Address; // заказчик
    to: Address; // Тендер выигравшое лицо или компания
    amount: String; // amount of KZT to be sent
    state: Bool; // finished or not
    name: String; // name of the tender
    description: String; // description of tender
    image: String; // IPFS URL to image
    deadline: String; // deadline of the project (DD/MM/YYYY)
}

contract Tenderium with Deployable, Ownable {

    owner: Address;
    numTenders: Int as uint256 = 0;

    init() {
        self.owner = sender();
    }

    receive(msg: NewTender) {
        self.numTenders = self.numTenders + 1;
        let init: StateInit = initOf TenderChild(myAddress(), self.numTenders);

        send(SendParameters{
            to: contractAddress(init),
            body: NewTender{
                buyer: msg.buyer,
                to: msg.to,
                amount: msg.amount,
                state: msg.state,
                name: msg.name,
                description: msg.description,
                image: msg.image,
                deadline: msg.deadline
            }.toCell(),
            value: ton("0.2"),
            mode: SendIgnoreErrors,
            code: init.code,
            data: init.data
        });

        self.reply(NewTenderResponse{seqno: self.numTenders}.toCell());
    }

    receive(msg: CompleteTodoTenderMSG){
        self.requireOwner();
        require(msg.seqno <= self.numTenders, "Tender does not exist");
        send(SendParameters{
            to: contractAddress(initOf TenderChild(myAddress(), msg.seqno)),
            body: InternalComplete{state: true}.toCell(),
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors
        });
    }

    get fun numTenders(): Int {
        return self.numTenders;
    }

    get fun tenderAddress(seqno: Int): Address{
        return contractAddress(initOf TenderChild(myAddress(), seqno));
    }


}
