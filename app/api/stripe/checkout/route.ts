import { CartItem } from "@/app/[locale]/(dashboard)/(non-tranparent-header)/cart/page";
import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_KEY);

const getActiveProducts = async () => {
  const checkProducts = await stripe.products.list();
  const availableProducts = checkProducts.data.filter(
    (product: any) => product.active === true,
  );
  return availableProducts;
};

export const POST = async (request: NextRequest) => {
  const { products, userId } = await request.json();

  const data: CartItem[] = products;

  let activeProducts = await getActiveProducts();

  try {
    for (const product of data) {
      const productName = product.title.trim().toLowerCase();
      const stripeProduct = activeProducts?.find(
        (stripeProduct: any) =>
          stripeProduct?.name?.trim().toLowerCase() === productName,
      );

      if (!stripeProduct) {
        const prod = await stripe.products.create({
          name: product.title,
          default_price_data: {
            unit_amount: product.price * 100,
            currency: "usd",
          },
        });
        console.log("New product created:", prod);
      } else {
        console.log("Product already exists:", stripeProduct);
      }
    }
  } catch (error) {
    console.error("error in creating a new product", error);
    throw error;
  }

  activeProducts = await getActiveProducts();
  let stripeItems: any = [];
  for (const product of data) {
    const productName = product.title.trim().toLowerCase();
    const stripeProduct = activeProducts?.find(
      (prod: any) => prod?.name?.trim().toLowerCase() === productName,
    );

    if (stripeProduct) {
      stripeItems.push({
        price: stripeProduct?.default_price,
        quantity: product?.quantity,
      });
    }
  }

  const session = await stripe.checkout.sessions.create({
    line_items: stripeItems,
    mode: "payment",
    payment_intent_data: {
      metadata: {
        id: userId,
        productName: data.map((item) => item.title).join(", "),
      },
    },
    success_url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/orders`,
    cancel_url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/cart`,
  });

  return NextResponse.json({ url: session.url });
};
