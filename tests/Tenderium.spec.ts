import { Blockchain, SandboxContract, TreasuryContract } from '@ton-community/sandbox';
import { toNano } from 'ton-core';
import { CompleteTodoTenderMSG, NewTender, Tenderium } from '../wrappers/Tenderium';
import '@ton-community/test-utils';
import { TenderChild } from '../wrappers/TenderChild';

describe('Tenderium', () => {
    let blockchain: Blockchain;
    let tenderium: SandboxContract<Tenderium>;
    let deployer: SandboxContract<TreasuryContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        tenderium = blockchain.openContract(await Tenderium.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await tenderium.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: tenderium.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and tenderium are ready to use
    });

    it('should create tenderium', async() => {
        const message: NewTender = {
            $$type: "NewTender",
            buyer: deployer.address,
            to: deployer.address,
            amount: "10.000.000KZT",
            state: false,
            name: "ANSJFJNKANKSJNJC",
            description: "NSCKNJDS",
            image: "ipfs image",
            deadline: "12.12.2024",
        };
        await tenderium.send(deployer.getSender(), {
            value: toNano("0.5"),
        }, message);

        const message2: NewTender = {
            $$type: "NewTender",
            buyer: deployer.address,
            to: deployer.address,
            amount: "20.000.000KZT",
            state: false,
            name: "ANSJFJNKANKSJNJC",
            description: "NSCKNJDS",
            image: "ipfs image",
            deadline: "22.12.2024",
        };
        await tenderium.send(deployer.getSender(), {
            value: toNano("0.5"),
        }, message2);

        const message3: NewTender = {
            $$type: "NewTender",
            buyer: deployer.address,
            to: deployer.address,
            amount: "20.000.000KZT",
            state: false,
            name: "ANSJFJNKANKSJNJC",
            description: "NSCKNJDS",
            image: "ipfs image",
            deadline: "22.12.2024",
        };
        await tenderium.send(deployer.getSender(), {
            value: toNano("0.5"),
        }, message3);

        
        // console.log("details - ", details);

        const completeTender: CompleteTodoTenderMSG = {
            $$type: 'CompleteTodoTenderMSG',
            seqno: 1n
        }
        await tenderium.send(deployer.getSender(), {
            value: toNano("0.5"),
        }, completeTender);

        const tendersSize = await tenderium.getNumTenders();

        for(let i=1; i<=tendersSize; i++){
            const tenderChildAddr = await tenderium.getTenderAddress(BigInt(i));
            const tenderChild = blockchain.openContract(TenderChild.fromAddress(tenderChildAddr));
            console.log(`${i}th tender - `, await tenderChild.getDetails());
        }

    });
});
