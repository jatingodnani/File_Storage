// TODO 6 - Call add entrypoint in the storage contract
import {tezos} from "./tezos"

export const addOperation = async (ImgHash) => {
    try{
        const contract = await tezos.wallet.at("KT1CXMpNtA2GMu35mbAWwnVfKvTjb8YoBsPz");
        const op =await contract.methods.add(ImgHash).send()
        await op.confirmation(1);
    }
    catch(err){
        throw err;
    }
};

// TODO 10 - Call allow entrypoint in the storage contract 

export const display_operation = async (address) => {
    try{
        const contract = await tezos.wallet.at("KT1CXMpNtA2GMu35mbAWwnVfKvTjb8YoBsPz")
        const op = await contract.methods.display(address).send()
        await op.confirmation(1)
    }
    catch (err){
        throw err;
    }
};
