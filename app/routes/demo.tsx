import { commitSession, getSession } from "~/sessions";
import crypto from "crypto";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Fragment } from "react";
import { redirect } from "react-router";

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const challenge = crypto.randomBytes(32).toString("base64");
  session.set("challenge", challenge);
  const cookieId = await commitSession(session);

  console.log({
    challenge,
    cookieId,
  });

  return json(
    { challenge },
    {
      headers: {
        "Set-Cookie": cookieId,
      },
    }
  );
}

export async function action({ request }: ActionArgs) {
  const header = request.headers.get("Cookie");
  const session = await getSession(header);
  console.log({
    header,
    session,
    data: session.data,
    challenge: session.get("challenge"),
  });

  return redirect("/demo");
}

export default function Register() {
  const data = useLoaderData<typeof loader>();

  return (
    <Fragment>
      <h1>Demo</h1>
      <pre>{data.challenge}</pre>
      <form method="post">
        <input type="submit" name="submit" value="Submit" />
      </form>
    </Fragment>
  );
}
