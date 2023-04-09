import type {
    ActionFunction,
    LinksFunction,
  } from "@remix-run/node";
  import {
    useActionData,
    useSearchParams,
  } from "@remix-run/react";

import { createUserSession, login, register } from "~/utils/session.server";

import { json } from "@remix-run/node";
import { useState } from "react";

function validateemail(email: unknown) {
    if (typeof email !== "string" || email.length < 3) {
        return `emails must be at least 3 characters long`;
    }
}
function validatePassword(password: unknown) {
    if (typeof password !== "string" || password.length < 6) {
        return `Passwords must be at least 6 characters long`;
    }
}
function validateUrl(url: any) {
    let urls = ["/"];
    if (urls.includes(url)) {
        return url;
    }
    return "/";
}
const badRequest = (data: any) =>
    json(data, { status: 400 }
);

  export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    const loginType = form.get("loginType");
    const email = form.get("email");
    const password = form.get("password");
    const username = form.get("name") || undefined;
    const redirectTo = validateUrl(form.get("redirectTo"));
    if (
        typeof loginType !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string" ||
        (typeof username !== "string" && username !== undefined) ||
        typeof redirectTo !== "string"
    ) {
        return badRequest({
            formError: `Form not submitted correctly.`,
        });
    }
    const fields = { loginType, email, password, username };
    const fieldErrors = {
        email: validateemail(email),
        password: validatePassword(password),
    };
    if (Object.values(fieldErrors).some(Boolean))
        return badRequest({ fieldErrors, fields });
    switch (loginType) {
        case "login": {
            const user = await login({ email, password });
            if (!user) {
                return badRequest({
                    fields,
                    formError: `email/Password combination is incorrect`,
                });
            }
            return createUserSession(user.id, redirectTo);
        }
        case "register": {
            const user = await register({ email, username, password });
            if (!user) {
                return badRequest({
                    fields,
                    formError: `Something went wrong trying to create a new user.`,
                });
            }
            return createUserSession(user.id, redirectTo);
        }
        default: {
            return badRequest({
                fields,
                formError: `Login type invalid`,
            });
        }
    }
};
  
  const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg text-purple-900 outline-purple-300 `;

  export default function LoginRoute() {
      const actionData = useActionData();
      const [searchParams] = useSearchParams();
      const [type, setType] = useState("Login");
      return (
          <div className=" bg-gradient-to-br from-orange-100 via-neutral-100 to-orange-100 w-screen h-screen flex justify-center items-center text-white">
              <div className="bg-orange-500 font-bold px-5 py-6 rounded-md shadow-2xl w-1/2">
                  <form method="post">
                      <h1 className="text-center text-2xl text-white mb-2">Login</h1>
                      <input
                          type="hidden"
                          name="redirectTo"
                          value={
                              searchParams.get("redirectTo") || "/"
                          }
                      />
                      <fieldset className="w-100 justify-center flex space-between gap-x-8">
                          <legend className="sr-only">
                              Login or Register?
                          </legend>
                          <label>
                              <input
                                  type="radio"
                                  name="loginType"
                                  value="login"
                                  onClick={() => setType("Login")}
                                  defaultChecked={
                                      !actionData?.fields?.loginType ||
                                      actionData?.fields?.loginType === "login"
                                  }
                              />{" "}
                              Login
                          </label>
                          <label>
                              <input
                                  type="radio"
                                  name="loginType"
                                  value="register"
                                  onClick={() => setType("Register")}
                                  defaultChecked={
                                      actionData?.fields?.loginType ===
                                      "register"
                                  }
                              />{" "}
                              Register
                          </label>
                      </fieldset>
                      {type == "Register" && <label className="text-lg leading-7 text-white">
                          Name:
                          <input
                              type="text"
                              className={inputClassName}
                              name="name"
                              required
                              minLength={3}
                              defaultValue={actionData?.fields?.email}
                              aria-invalid={Boolean(
                                  actionData?.fieldErrors?.email
                              )}
                              aria-errormessage={
                                  actionData?.fieldErrors?.email
                                      ? "name-error"
                                      : undefined
                              }
                          />
                          {actionData?.fieldErrors?.email ? (
                              <p
                                  className="text-red-500"
                                  role="alert"
                                  id="name-error"
                              >
                                  {actionData.fieldErrors.name}
                              </p>
                          ) : null}
                      </label>}
                      <label className="text-lg leading-7 text-white">
                          Email:
                          <input
                              type="text"
                              className={inputClassName}
                              name="email"
                              required
                              minLength={3}
                              defaultValue={actionData?.fields?.email}
                              aria-invalid={Boolean(
                                  actionData?.fieldErrors?.email
                              )}
                              aria-errormessage={
                                  actionData?.fieldErrors?.email
                                      ? "email-error"
                                      : undefined
                              }
                          />
                          {actionData?.fieldErrors?.email ? (
                              <p
                                  className="text-red-500"
                                  role="alert"
                                  id="email-error"
                              >
                                  {actionData.fieldErrors.email}
                              </p>
                          ) : null}
                      </label>
                      <label className="text-lg leading-7 text-white">
                          Password
                          <input
                              name="password"
                              className={inputClassName}
                              required
                              defaultValue={actionData?.fields?.password}
                              type="password"
                              aria-invalid={
                                  Boolean(
                                      actionData?.fieldErrors?.password
                                  ) || undefined
                              }
                              aria-errormessage={
                                  actionData?.fieldErrors?.password
                                      ? "password-error"
                                      : undefined
                              }
                          />
                          {actionData?.fieldErrors?.password ? (
                              <p
                                  className="text-red-500"
                                  role="alert"
                                  id="password-error"
                              >
                                  {actionData.fieldErrors.password}
                              </p>
                          ) : null}
                      </label>
                      <div id="form-error-message">
                          {actionData?.formError ? (
                              <p
                                  className="text-red-500"
                                  role="alert"
                              >
                                  {actionData.formError}
                              </p>
                          ) : null}
                      </div>
                      <button 
                        className="my-4 py-2 px-7 text-white font-bold hover:scale-105 rounded-lg bg-blue-500 shadow-lg"
                        type="submit">
                            {type}
                        </button>
                  </form>
              </div>
          </div>
      )
  }