import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const GUNPLA_SEKAI_SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

// const CLIENT_ID = "3aa19c06ac517131fefcfc3e3a9fa26d";
// const CLIENT_SECRET = "e662ac35b988720b1475020dbe19fa93";

export async function GET(req: NextRequest) {
  const domain = process.env.SHOPIFY_DOMAIN;

  const url = `https://${domain}/admin/api/2024-07/products.json?limit=250&fields=id,title,image,variants,body_html`;
  try {
    const result = await axios.get(url, {
      headers: {
        "X-Shopify-Access-Token": GUNPLA_SEKAI_SHOPIFY_ACCESS_TOKEN,
      },
    });

    return NextResponse.json(result.data.products, {
      status: 200,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        message: err.message,
        url,
      },
      {
        status: 200,
      }
    );
  }
}
