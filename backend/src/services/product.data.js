const PRODUCTS = [
    {
        name: "Feuerwehr Uniform HotStuff",
        description: "Schützt vor Feuer",
        ean: "9498347fjai234",
        images: [],
        deliveryDays: 123,
        priceLevel: [
            {
                unitPrice: 500,
                unit: "Stück",
                minQty: 30,
            },
            {
                unitPrice: 200,
                unit: "Stück",
                minQty: 1000,
            },
        ],
        certificates: ["Fairtrade Textile Production"],
        supplier: "GreenTech",
        categories: ["Textilien", "Feuerwehruniformen"],
    },
    {
        name: "Hose",
        description: "Office Look",
        ean: "949asdfi234",
        images: [],
        deliveryDays: 13,
        priceLevel: [
            // {
            //     "unitPrice": 20,
            //     "minQty": 20
            // },
            {
                unitPrice: 15,
                minQty: 100,
            },
        ],
        certificates: [
            "Cradle to Cradle - Textilien",
            "Fair Labor Association (FLA)",
        ],
        supplier: "GreenTech",
        categories: ["Textilien"],
    },
    {
        name: "Rathaus PC",
        description: "Zuverlässiges Teil",
        ean: "asf234",
        images: [],
        deliveryDays: 50,
        priceLevel: [
            {
                unitPrice: 800,
                unit: "Stück",
                minQty: 5,
            },
            {
                unitPrice: 600,
                minQty: 10,
            },
        ],
        certificates: ["EU Ecolabel - Laptops & Co."],
        supplier: "GreenTech",
        categories: ["IT & Zubehör", "Computer & Endgeräte"],
    },
    {
        name: "Stapel Papier",
        description: "Umweltschonend verarbeitet",
        ean: "asasdfadf34",
        images: [],
        deliveryDays: 10,
        priceLevel: [
            {
                unitPrice: 0.8,
                unit: "Stück",
                minQty: 100,
            },
            {
                unitPrice: 0.6,
                unit: "Stück",
                minQty: 1000,
            },
            {
                unitPrice: 0.4,
                unit: "Stück",
                minQty: 2000,
            },
        ],
        certificates: ["Blauer Engel - Papier"],
        supplier: "GreenTech",
        categories: ["Bürobedarf", "Papier"],
    },
];

export default PRODUCTS;
