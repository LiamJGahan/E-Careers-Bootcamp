const sales = 
[
    {item: "PS4 Pro", stock: 3, orignal: 399.99},
    {item: "Xbox One X", stock: 1, orignal: 499.99, discount: 0.1},
    {item: "Nintendo Switch", stock: 4, orignal: 299.99},
    {item: "PS2 Console", stock: 1, orignal: 299.99, discount: 0.8},
    {item: "Nintendo 64", stock: 2, orignal: 199.99, discount: 0.65}
]

function salesProfiler()
{
    for (let i = 0; i < sales.length; i++) 
    {
        let stock = sales[i].stock;
        let orignal = sales[i].orignal;
        let discount = sales[i].discount;

        console.log("Item: " + sales[i].item);
        console.log("Stock: " + stock);
        console.log("Original " + orignal);

        if (sales[i].discount != undefined)
        {
            let discountedPrice = orignal - discount;

            console.log("Discount: " + discount);
            console.log("Sale: " + discountedPrice);
            console.log("Total: " + (discountedPrice * stock));
        }
        else
        {
            console.log("Total: " + (orignal * stock));
        }

        console.log("");
    }
}

salesProfiler();