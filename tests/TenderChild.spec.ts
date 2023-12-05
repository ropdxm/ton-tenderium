import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { toNano } from 'ton-core';
import { TenderChild } from '../wrappers/TenderChild';
import '@ton-community/test-utils';

describe('TenderChild', () => {
    let blockchain: Blockchain;
    let tenderChild: SandboxContract<TenderChild>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        const deployer = await blockchain.treasury('deployer');

        tenderChild = blockchain.openContract(await TenderChild.fromInit(deployer.address, 0n));

        const deployResult = await tenderChild.send(
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
            to: tenderChild.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        console.log("Tender Child test")
    });
});
