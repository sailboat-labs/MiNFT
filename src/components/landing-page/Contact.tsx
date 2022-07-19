import { ethers } from "ethers";
import { getFunctions, httpsCallable } from "firebase/functions";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import * as Yup from "yup";

import { firebaseApp } from "@/lib/firebase";

import Button from "../buttons/Button";

const functions = getFunctions(firebaseApp);
// connectFunctionsEmulator(functions, "localhost", 5001);

interface ContactProps {
  projectSlug: string;
}
export default function Contact({ projectSlug }: ContactProps) {
  const router = useRouter();

  const projectAccount = "TheIndianNFTs";

  const [heading, setHeading] = useState("Join the Bloody Bastards");

  const [address, setAddress] = useState<string>();
  const [follows, setFollows] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shouldProceed, setShouldProceed] = useState(false);
  const [twitterHandle, setTwitterHandle] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    const { success, twitterAccount, accessToken } = router.query;
    if (success === "true") {
      verifyAccount(accessToken as string, twitterAccount as string);
      connectWallet();
    } else if (success === "false") {
      // toast.error("Unable to add account");
    }
  }, [router]);

  const changeHeading = (e: any) => {
    e.preventDefault();
    setHeading(e.target.value);
  };

  const validate = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    twitterUsername: Yup.string().required("Twitter username required"),
    ETHaddress: Yup.string().required("ETH address required"),
  });

  const connectWallet = async () => {
    const web3Modal = new Web3Modal();

    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();

    const _address = await signer.getAddress();
    setAddress(_address);
  };

  const connectTwitter = async () => {
    const requestTwitterUrl = httpsCallable(functions, "requestTwitterUrl");
    requestTwitterUrl()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((result: any) => {
        window.open(result.data.authUrl, "_bank");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateAccount = async (account: string) => {
    setLoading(true);

    const updateAccounts = httpsCallable(functions, "updateAccounts");
    updateAccounts({ user_account: account, project_slug: projectSlug })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((result: any) => {
        const { data } = result;
        if (data.success) {
          console.log(result);
        }
      })
      .catch((error) => {
        console.log(error);
        setShouldProceed(false);
      });

    setLoading(false);
  };

  const verifyAccount = async (accessToken: string, twitterAccount: string) => {
    // const userClient = new TwitterApi(accessToken);

    // Get user ID
    // const user = await userClient.v2.me();

    // if (user.data.username == twitterAccount)

    setTwitterHandle(twitterAccount);

    // else setError("Account and token does not match");

    return;
  };

  const proceed = async (account: string) => {
    setLoading(true);

    const checkFollows = httpsCallable(functions, "checkFollows");
    const checkExists = httpsCallable(functions, "checkExists");
    const updateAccounts = httpsCallable(functions, "updateAccounts");

    const { data }: any = await checkExists({
      project_slug: projectSlug,
      user_account: account,
    });

    if (data.success && data.exists) {
      checkFollows({ user_account: account, project_account: projectAccount })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then(async (result: any) => {
          const { data } = result;
          if (data.success && data.isFollowing) {
            setShouldProceed(true);
            await updateAccounts({
              project_slug: projectSlug,
              user_account: account,
            });
          } else if (data.success && !data.isFollowing) {
            setError("This account is not following us");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (!data.success && !data.exists) {
      setError("This account is already in use");
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="mx-auto flex w-4/5 flex-col items-center pt-40 pb-28 text-white lg:flex-row">
        <div className="w-full lg:w-3/5">
          <textarea
            disabled
            rows={3}
            id="contact-heading"
            value={heading}
            onChange={changeHeading}
            onBlur={changeHeading}
            className="w-full resize-none overflow-hidden whitespace-normal border-0 bg-transparent font-serif text-6xl font-bold italic md:text-9xl lg:text-center"
          />
        </div>
        <div className="flex items-center lg:ml-10">
          {shouldProceed && (
            <div className="h-80 w-full items-center justify-center border-2">
              <h1>All Good</h1>
            </div>
          )}
          {!shouldProceed && (
            <Formik
              initialValues={{
                email: "",
                twitterUsername: "",
                ETHaddress: "",
              }}
              validationSchema={validate}
              onSubmit={(values) => console.log(values)}
            >
              {(formik) => (
                <Form>
                  <div className="flex flex-col gap-4 text-gray-200">
                    {address && <p>{address}</p>}
                    {!address && (
                      <Button
                        onClick={connectWallet}
                        type="submit"
                        className="rounded-xl bg-[#006C35] py-5 px-12 text-xl"
                      >
                        Connect your wallet
                      </Button>
                    )}

                    {twitterHandle && <p>{twitterHandle}</p>}

                    {!twitterHandle && (
                      <Button
                        // disabled={!address || !twitterHandle}
                        onClick={connectTwitter}
                        type="submit"
                        className="rounded-xl bg-[#006C35] py-5 px-12 text-xl"
                      >
                        Connect Twitter
                      </Button>
                    )}

                    {!follows && (
                      <Button
                        disabled={!address}
                        onClick={() => {
                          window.open(
                            `https://twitter.com/${projectAccount}`,
                            "_bank"
                          );
                          setFollows(true);
                        }}
                        type="submit"
                        className="rounded-xl bg-[#006C35] py-5 px-12 text-xl"
                      >
                        Follow Us
                      </Button>
                    )}
                    {/* 
                    <Input
                      name="twitterUsername"
                      type="text"
                      placeholder="Twitter username *"
                    /> */}

                    <Button
                      isLoading={loading}
                      onClick={() => proceed(formik.values.twitterUsername)}
                      disabled={!address || !follows || !twitterHandle}
                      type="submit"
                      className="rounded-xl bg-[#006C35] py-5 px-12 text-xl"
                    >
                      Reserve your Chutiya
                    </Button>

                    <p>{error}</p>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
}
