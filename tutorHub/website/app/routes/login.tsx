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
    console.log("in action")
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
            // const userExists = await db.user.findFirst({
            //     where: { username },
            // });
            const userExists = false;
            if (userExists) {
                return badRequest({
                    fields,
                    formError: `User with username ${username} already exists`,
                });
            }
            const user = await register({ username, password });
            // const user = {username: "username", password: "password ", id: 1} 
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
          <div className="flex justify-center items-center content-center text-white">
              <div className="lg:m-10 my-10 md:w-2/3 lg:w-1/2 bg-gradient-to-br from-orange-500 via-orange-300 to-orange-500 font-bold px-5 py-6 rounded-md">
                  <form method="post">
                      <h1 className="text-center text-2xl text-white">Login</h1>
                      <input
                          type="hidden"
                          name="redirectTo"
                          value={
                              searchParams.get("redirectTo") || "/"
                          }
                      />
                      <fieldset className="text-center">
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
                          Username:
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
                      <button className="my-4 py-2 px-7 text-purple-500 font-bold border-2 hover:scale-105 border-purple-500 rounded-lg bg-white" type="submit">Login</button>
                  </form>
              </div>
          </div>
      )
  }