import { NextResponse } from "next/server";

const PRODUCTS_API = "https://dummyjson.com/products";

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const res = await fetch(`${PRODUCTS_API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("Failed to update product");

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const res = await fetch(`${PRODUCTS_API}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete product");

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}