"use server";

import {
  BaseApiResponse,
  BasePaginationResponse,
} from "@/lib/types/base.types";
import {
  CreateMerchandiseState,
  MerchandiseList,
} from "@/lib/types/merchandise.types";
import { cookies } from "next/headers";

export async function fetchMerchandises(page: number, pageSize: number) {
  const cookieStore = await cookies();
  const authorization = cookieStore.get("Authorization");
  const token = authorization?.value.split(" ")[1];

  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL +
      `/merchandise?page=${page}&size=${pageSize}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data: BaseApiResponse<BasePaginationResponse<MerchandiseList[]>> =
    await response.json();

  return data?.data?.data;
}

export async function createMerchandise(
  prevState: CreateMerchandiseState,
  formData: FormData
) {
  const cookieStore = await cookies();
  const authorization = cookieStore.get("Authorization");
  const token = authorization?.value.split(" ")[1];

  const name = formData.get("name");
  const slug = formData.get("slug");
  const price = formData.get("price");
  const stock = formData.get("stock");
  const description = formData.get("description");
  const rawCategories = formData.getAll("categories");
  const categories = rawCategories
    .flatMap((cat) => (typeof cat === "string" ? cat.split(",") : []))
    .map((cat) => cat.trim());

  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/merchandise",

    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        slug,
        price,
        stock,
        description,
        categories,
      }),
    }
  );

  const data = await response.json();

  if (data?.status !== "success") {
    return {
      ...prevState,
      message: "Creating Merchandise Failed",
      status: false,
    };
  }

  return {
    ...prevState,
    message: "Merchandise created successfully!",
    status: true,
  };
}
