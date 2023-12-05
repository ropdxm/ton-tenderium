import { Address, toNano } from 'ton-core';
import { TenderChild } from '../wrappers/TenderChild';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const tenderChild = provider.open(await TenderChild.fromInit());

    await tenderChild.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(tenderChild.address);

    // run methods on `tenderChild`
}
