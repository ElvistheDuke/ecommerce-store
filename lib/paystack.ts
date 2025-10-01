export interface ProductsResponse {
  status: boolean;
  message: string;
  data: Product[];
  meta: Meta;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  product_code: string;
  slug: string;
  currency: string;
  price: number;
  quantity: number;
  quantity_sold: number;
  active: boolean;
  domain: string;
  type: "good" | "service"; // inferred from examples
  in_stock: boolean;
  unlimited: boolean;
  metadata: Metadata;
  files: File[];
  success_message: string | null;
  redirect_url: string | null;
  split_code: string | null;
  notification_emails: string | null;
  minimum_orderable: number;
  maximum_orderable: number | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  digital_assets: unknown[]; // unknown shape, adjust if needed
  variant_options: unknown[]; // unknown shape, adjust if needed
  is_shippable: boolean;
  shipping_fields: ShippingFields;
  integration: number;
  low_stock_alert: number;
}

export interface ProductSimplified {
  id: number;
  name: string;
  description: string;
  price: number;
  product_code: string;
  imageUrl: string[]; // Array of image URLs
}

export interface Metadata {
  background_color: string;
}

export interface File {
  original_filename: string;
  key: string;
  path: string;
  type: string;
}

export interface ShippingFields {
  delivery_note: "optional" | "disabled" | string; // from your data
  shipping_fees: unknown[]; // adjust type if known
}

export interface Meta {
  total: number;
  skipped: number;
  perPage: number;
  page: number;
  pageCount: number;
}

export async function getProducts(id: number | null = null) {
  const response = await fetch("https://api.paystack.co/product", {
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    },
    cache: "no-store",
  });

  const data = await response.json();
  // console.log("The files are" + data.data[0].files[0].path);
  const products = data.data.map((item: Product) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price / 100, // Assuming price is in kobo, convert to Naira
    product_code: item.product_code,
    imageUrl: item.files?.map((file: File) => file.path) ?? [], // Get the first image URL or an empty string if none exists
  }));

  if (id !== null) {
    console.log("The id is ", id);
    return products.find(
      (product: ProductSimplified) => Number(product.id) === Number(id)
    );
  }

  return products;
}
