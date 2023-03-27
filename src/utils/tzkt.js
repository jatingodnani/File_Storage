// TODO 8 - Fetch storage of the Lottery by completing fetchStorage

import axios from "axios";

export const fetchStorage = async () => {
    const res = await axios.get(
        "https://api.ghostnet.tzkt.io/v1/contracts/KT1BwoKYL4AU6h7X8i3VPndfGjqLVPvQfsed/storage"
    );
    return res.data;
};
