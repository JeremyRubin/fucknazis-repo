module.exports = {
    networks: {
        development: {
            host: "localhost",
            port: 8546,
            network_id: "*" // Match any network id
        },
        live: {
            network_id: 1,
            host: "localhost",
            port: 8545,   // Different than the default below,
            from: "0x32462c291283cb47F87ac727A2bB1768fCd3A359",
        }
    }
};
