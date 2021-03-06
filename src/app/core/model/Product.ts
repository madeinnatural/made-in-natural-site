export class Product {
  constructor(
    public id: number,
    public productName: string,
    public weight: number,
    public price: number,
    public product_type: string,
    public amount: number,
    public categoria?: string,
  ){}
}


export class Item {
  constructor(
    public id: number,
    public product: Product,
    public amount: number,
    public parcial_price: number, // QUANTIDADE * PREÇO DO PRODUTO
  ){}
}

export class CartProduct {
  constructor(
      amount: number,
      id: number,
      parcial_price: number,
      product: Product
  ){}
}

export class Purchase {
  constructor(
    public  id: 1,
    public product_name: string,
    public weight: number,
    public category: string,
    public product_type: string,
    public amount: number,
    public price: number,
    public purchase_id: number,
    public created_at: Date,
    public updated_at: Date
  ){}
}

export class PurchaseHistory {
  constructor(
    public ano: number,
    public mes: string,
    public purchases: Array<Purchase>
  ){}
}
