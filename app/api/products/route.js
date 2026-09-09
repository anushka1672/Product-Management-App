import { NextResponse } from "next/server";

const PRODUCTS_API = "https://dummyjson.com/products";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    const category = searchParams.get("category");

    let endpoint = PRODUCTS_API;

    if (query) {
      endpoint = `${PRODUCTS_API}/search?q=${encodeURIComponent(query)}`;
    } else if (category && category !== "All") {
      endpoint = `${PRODUCTS_API}/category/${encodeURIComponent(category)}`;
    }

    const res = await fetch(endpoint);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const res = await fetch(`${PRODUCTS_API}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("Failed to create product");

    const data = await res.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}