import { toNano } from 'ton-core';
import { Tenderium } from '../wrappers/Tenderium';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const tenderium = provider.open(await Tenderium.fromInit());

    await tenderium.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(tenderium.address);

    // run methods on `tenderium`
}
