import { ethers } from "ethers";
import {
  connectFunctionsEmulator,
  getFunctions,
  httpsCallable,
} from "firebase/functions";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import * as Yup from "yup";

import { firebaseApp } from "@/lib/firebase";

import Button from "../buttons/Button";

export default function Contact() {
  const router = useRouter();

  const twitterAccount = "TheIndianNFTs";

  const [heading, setHeading] = useState("Join the Bloody Bastards");

  const [address, setAddress] = useState<string>();
  const [follows, setFollows] = useState(false);
  const [twitterHandle, setTwitterHandle] = useState<string>();

  useEffect(() => {
    const { success, twitterAccount } = router.query;
    if (success === "true") {
      setTwitterHandle(twitterAccount as string);
      connectWallet();
    } else if (success === "false") {
      // toast.error("Unable to add account");
    }
  }, [router]);

  useEffect(() => {
    checkFollow()
  }, [])
  

  const changeHeading = (e: any) => {
    e.preventDefault();
    setHeading(e.target.value);
  };

  const validate = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    discordUsername: Yup.string().required("Discord username required"),
    ETHaddress: Yup.string().required("ETH address required"),
  });

  const connectWallet = async () => {
    const providerOptions = {
      /* See Provider Options Section */
    };

    const web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions, // required
    });

    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();

    const _address = await signer.getAddress();
    setAddress(_address);
  };

  const connectTwitter = async () => {
    const functions = getFunctions(firebaseApp);
    connectFunctionsEmulator(functions, "localhost", 5001);

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

  const checkFollow = async () => {
    const functions = getFunctions(firebaseApp);
    connectFunctionsEmulator(functions, "localhost", 5001);

    const checkFollows = httpsCallable(functions, "checkFollows");
    checkFollows({user_name: twitterAccount, account_name: twitterHandle})
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((result: any) => {
        console.log({ result });
      })
      .catch((error) => {
        console.log(error);
      });
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
          <Formik
            initialValues={{
              email: "",
              discordUsername: "",
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

                  <Button
                    disabled={!address}
                    onClick={() =>
                      window.open(
                        `https://twitter.com//${twitterAccount}`,
                        "_bank"
                      )
                    }
                    type="submit"
                    className="rounded-xl bg-[#006C35] py-5 px-12 text-xl"
                  >
                    Follow Us
                  </Button>

                  {twitterHandle && <p>{twitterHandle}</p>}

                  {!twitterHandle && (
                    <Button
                      disabled={!address || !twitterHandle}
                      onClick={connectTwitter}
                      type="submit"
                      className="rounded-xl bg-[#006C35] py-5 px-12 text-xl"
                    >
                      Connect Twitter
                    </Button>
                  )}

                  <Button
                    disabled={!twitterHandle || !address || follows}
                    type="submit"
                    className="rounded-xl bg-[#006C35] py-5 px-12 text-xl"
                  >
                    Reserve your Chutiya
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
