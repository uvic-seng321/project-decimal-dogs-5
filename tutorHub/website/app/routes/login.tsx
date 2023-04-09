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

function validateUsername(username: unknown) {
    if (typeof username !== "string" || username.length < 3) {
        return `Usernames must be at least 3 characters long`;
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
    const username = form.get("username");
    const password = form.get("password");
    const redirectTo = validateUrl(form.get("redirectTo"));
    if (
        typeof loginType !== "string" ||
        typeof username !== "string" ||
        typeof password !== "string" ||
        typeof redirectTo !== "string"
    ) {
        return badRequest({
            formError: `Form not submitted correctly.`,
        });
    }
    const fields = { loginType, username, password };
    const fieldErrors = {
        username: validateUsername(username),
        password: validatePassword(password),
    };
    if (Object.values(fieldErrors).some(Boolean))
        return badRequest({ fieldErrors, fields });
    switch (loginType) {
        case "login": {
            const user = await login({ username, password });
            if (!user) {
                return badRequest({
                    fields,
                    formError: `Username/Password combination is incorrect`,
                });
            }
            return createUserSession(user.id, redirectTo);
        }
        case "register": {
            const user = await register({ username, password });
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
      return (
          <div className=" bg-gradient-to-br from-orange-100 via-neutral-100 to-orange-100 w-screen h-screen flex justify-center items-center content-center text-white">
              <div className="bg-orange-500 font-bold px-5 py-6 rounded-md shadow-2xl">
              {/* <div className="bg-orange-500 font-bold px-5 py-6 rounded-md"> */}
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
                                  defaultChecked={
                                      actionData?.fields?.loginType ===
                                      "register"
                                  }
                              />{" "}
                              Register
                          </label>
                      </fieldset>
                      <label className="text-lg leading-7 text-white">
                          Email:
                          <input
                              type="text"
                              className={inputClassName}
                              name="username"
                              required
                              minLength={3}
                              defaultValue={actionData?.fields?.username}
                              aria-invalid={Boolean(
                                  actionData?.fieldErrors?.username
                              )}
                              aria-errormessage={
                                  actionData?.fieldErrors?.username
                                      ? "username-error"
                                      : undefined
                              }
                          />
                          {actionData?.fieldErrors?.username ? (
                              <p
                                  className="text-red-500"
                                  role="alert"
                                  id="username-error"
                              >
                                  {actionData.fieldErrors.username}
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
                            Login
                        </button>
                  </form>
              </div>
          </div>
      )
  }