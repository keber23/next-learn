"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { ApiData, Movie, SearchParams } from "@/types";
import { buildApiUrl } from "@/utils/buildApiUrl";

// Make the `request` function generic
// to specify the return data type:
function request<TResponse>(
  url: string,
  // `RequestInit` is a type for configuring
  // a `fetch` request. By default, an empty object.
  config: RequestInit = {}

  // This function is async, it will return a Promise:
): Promise<TResponse> {
  // Inside, we call the `fetch` function with
  // a URL and config given:
  return (
    fetch(url, config)
      // When got a response call a `json` method on it
      .then((response) => response.json())
      // and return the result data.
      .then((data) => data as TResponse)
  );

  // We also can use some post-response
  // data-transformations in the last `then` clause.
}

export async function fetchMovies(
  searchQuery?: string,
  selectedGenre?: string,
  selectedSort?: string
) {
  noStore();

  const apiUrl = await buildApiUrl(searchQuery, selectedGenre, selectedSort);

  const response = await request<ApiData>(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    //body: JSON.stringify(searchParams),
  });

  return response.data;
}

export async function fetchMovie(movieId: string) {
  noStore();

  const apiUrl = `http://localhost:4000/movies/${movieId}`;

  const response = await request<Movie>(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}

// const FormSchema = z.object({
//   id: z.string(),
//   customerId: z.string({
//     invalid_type_error: "Please select a customer.",
//   }),
//   amount: z.coerce
//     .number()
//     .gt(0, { message: "Please enter an amount greater than $0." }),
//   status: z.enum(["pending", "paid"], {
//     invalid_type_error: "Please select an invoice status.",
//   }),
//   date: z.string(),
// });

// const CreateInvoice = FormSchema.omit({ id: true, date: true });

// export type State = {
//   errors?: {
//     customerId?: string[];
//     amount?: string[];
//     status?: string[];
//   };
//   message?: string | null;
// };

// export async function createInvoice(prevState: State, formData: FormData) {
//   const validatedFields = CreateInvoice.safeParse({
//     customerId: formData.get("customerId"),
//     amount: formData.get("amount"),
//     status: formData.get("status"),
//   });

//   console.log(validatedFields);

//   // If form validation fails, return errors early. Otherwise, continue.
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: "Missing Fields. Failed to Create Invoice.",
//     };
//   }

//   const { customerId, amount, status } = validatedFields.data;

//   const amountInCents = amount * 100;
//   const date = new Date().toISOString().split("T")[0];

//   try {
//     await sql`
//   INSERT INTO invoices (customer_id, amount, status, date)
//   VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
// `;
//   } catch (error) {
//     return {
//       message: "Database Error: Failed to Create Invoice.",
//     };
//   }
//   revalidatePath("/dashboard/invoices");
//   redirect("/dashboard/invoices");
// }

// const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// export async function updateInvoice(
//   id: string,
//   prevState: State,
//   formData: FormData
// ) {
//   const validatedFields = UpdateInvoice.safeParse({
//     customerId: formData.get("customerId"),
//     amount: formData.get("amount"),
//     status: formData.get("status"),
//   });

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: "Missing Fields. Failed to Update Invoice.",
//     };
//   }

//   const { customerId, amount, status } = validatedFields.data;
//   const amountInCents = amount * 100;

//   try {
//     await sql`
//       UPDATE invoices
//       SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
//       WHERE id = ${id}
//     `;
//   } catch (error) {
//     return {
//       message: "Database Error: Failed to Update Invoice.",
//     };
//   }
//   revalidatePath("/dashboard/invoices");
//   redirect("/dashboard/invoices");
// }

// export async function deleteInvoice(id: string) {
//   throw new Error("Failed to Delete Invoice");

//   try {
//     await sql`DELETE FROM invoices WHERE id = ${id}`;
//     revalidatePath("/dashboard/invoices");
//     return { message: "Deleted Invoice." };
//   } catch (error) {
//     return {
//       message: "Database Error: Failed to DELETE Invoice.",
//     };
//   }
// }

// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData
// ) {
//   try {
//     await signIn("credentials", formData);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case "CredentialsSignin":
//           return "Invalid credentials.";
//         default:
//           return "Something went wrong.";
//       }
//     }
//     throw error;
//   }
// }
